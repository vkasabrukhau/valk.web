import { NextResponse } from "next/server";

const FLICKR_ENDPOINT = "https://www.flickr.com/services/rest/";
const DEFAULT_PER_PAGE = 12;
const MAX_PER_PAGE = 50;

type FlickrPhoto = {
  id: string;
  owner: string;
  title: string;
  description?: { _content?: string };
  datetaken?: string;
  tags?: string;
  url_o?: string;
  url_l?: string;
  url_c?: string;
  url_z?: string;
  url_m?: string;
  ownername?: string;
  width_o?: number | string;
  height_o?: number | string;
  width_l?: number | string;
  height_l?: number | string;
  width_c?: number | string;
  height_c?: number | string;
  width_z?: number | string;
  height_z?: number | string;
  width_m?: number | string;
  height_m?: number | string;
};

type FlickrApiResponse = {
  stat: "ok" | "fail";
  code?: number;
  message?: string;
  photos?: {
    photo: FlickrPhoto[];
  };
};

const parseDimension = (value?: number | string | null) => {
  if (value === undefined || value === null) return null;
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) ? parsed : null;
};

const selectBestImage = (photo: FlickrPhoto) => {
  const makeEntry = (url?: string, width?: number | string, height?: number | string) => ({
    url,
    width: parseDimension(width),
    height: parseDimension(height),
  });

  const options = [
    makeEntry(photo.url_l, photo.width_l, photo.height_l),
    makeEntry(photo.url_o, photo.width_o, photo.height_o),
    makeEntry(photo.url_c, photo.width_c, photo.height_c),
    makeEntry(photo.url_z, photo.width_z, photo.height_z),
    makeEntry(photo.url_m, photo.width_m, photo.height_m),
  ];

  return options.find((option) => option.url) ?? { url: "", width: null, height: null };
};

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const apiKey = process.env.FLICKR_API_KEY;
  const defaultUser = process.env.FLICKR_USER_ID;
  const userId = searchParams.get("user_id") ?? defaultUser;
  const perPageParam = Number.parseInt(searchParams.get("per_page") ?? "", 10);
  const perPage = Number.isFinite(perPageParam)
    ? Math.min(Math.max(perPageParam, 1), MAX_PER_PAGE)
    : DEFAULT_PER_PAGE;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing Flickr API key. Set FLICKR_API_KEY in your environment." },
      { status: 500 }
    );
  }

  if (!userId) {
    return NextResponse.json(
      { error: "Missing Flickr user id. Provide ?user_id=... or set FLICKR_USER_ID." },
      { status: 400 }
    );
  }

  const params = new URLSearchParams({
    method: "flickr.people.getPublicPhotos",
    api_key: apiKey,
    user_id: userId,
    extras: [
      "description",
      "date_taken",
      "tags",
      "owner_name",
      "url_o",
      "url_l",
      "url_c",
      "url_z",
      "url_m",
    ].join(","),
    per_page: String(perPage),
    format: "json",
    nojsoncallback: "1",
  });

  const response = await fetch(`${FLICKR_ENDPOINT}?${params.toString()}`, {
    headers: {
      Accept: "application/json",
    },
    next: { revalidate: 60 * 30 },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: `Flickr responded with ${response.status} ${response.statusText}` },
      { status: response.status }
    );
  }

  const payload = (await response.json()) as FlickrApiResponse;
  if (payload.stat !== "ok" || !payload.photos?.photo) {
    const message = payload.message ?? "Unexpected Flickr API response.";
    return NextResponse.json(
      { error: message, code: payload.code },
      { status: 502 }
    );
  }

  const items = payload.photos.photo.map((photo) => {
    const bestImage = selectBestImage(photo);
    const tags = photo.tags
      ?.split(" ")
      .map((tag) => tag.trim())
      .filter(Boolean);

    return {
      id: photo.id,
      title: photo.title,
      description: photo.description?._content ?? "",
      takenAt: photo.datetaken ?? null,
      tags: tags ?? [],
      ownerName: photo.ownername ?? "",
      ownerId: photo.owner,
      image: bestImage.url ?? "",
      width: bestImage.width ?? null,
      height: bestImage.height ?? null,
      link: `https://www.flickr.com/photos/${photo.owner}/${photo.id}`,
    };
  });

  return NextResponse.json({ items });
}
