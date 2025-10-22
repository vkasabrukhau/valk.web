"use client";

import { useEffect, useMemo, useState } from "react";
import CustomCursor from "../components/custom-cursor";

type MediaType = "Photo" | "Video";

type GalleryItem = {
  title: string;
  description: string;
  location: string;
  capturedAt: string;
  resolution: string;
  device: string;
  mediaType: MediaType;
  image: string;
  tags: string[];
  rowSpan: number;
  colSpan: number;
  href?: string;
  source?: "Static" | "Flickr";
};

const staticGalleryItems: GalleryItem[] = [
  {
    title: "Blue Ridge Sunrise",
    description: "Trail run above the Parkway with rolling fog over the peaks.",
    location: "Blue Ridge Mountains, NC",
    capturedAt: "2024-04-02",
    resolution: "6048 × 4024",
    device: "Sony A7 IV",
    mediaType: "Photo",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    tags: ["Trail", "Sunrise", "Travel"],
    rowSpan: 4,
    colSpan: 2,
  },
  {
    title: "Night Tempo",
    description: "Neon reflections after a threshold workout downtown.",
    location: "Durham, NC",
    capturedAt: "2023-11-18",
    resolution: "3840 × 2160",
    device: "Sony FX3",
    mediaType: "Video",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    tags: ["City", "Run", "Tempo"],
    rowSpan: 3,
    colSpan: 1,
  },
  {
    title: "Atlantic Stretch",
    description: "Soft film grain over the dunes at blue hour.",
    location: "Nags Head, NC",
    capturedAt: "2022-07-09",
    resolution: "5456 × 3632",
    device: "Fujifilm X-T5",
    mediaType: "Photo",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    tags: ["Coast", "Minimal", "Travel"],
    rowSpan: 3,
    colSpan: 1,
  },
  {
    title: "Summit Breath",
    description: "Switchbacks hit golden hour just before the descent.",
    location: "Morrison, CO",
    capturedAt: "2021-09-23",
    resolution: "4000 × 2250",
    device: "DJI Air 2S",
    mediaType: "Video",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80",
    tags: ["Trail", "Drone", "Travel"],
    rowSpan: 4,
    colSpan: 2,
  },
  {
    title: "Midnight Track",
    description: "Long exposure circles lanes under halogen glow.",
    location: "Chapel Hill, NC",
    capturedAt: "2023-05-12",
    resolution: "6000 × 3376",
    device: "Sony A7 III",
    mediaType: "Photo",
    image:
      "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=1100&q=80",
    tags: ["Track", "Run", "City"],
    rowSpan: 3,
    colSpan: 1,
  },
  {
    title: "Civic Pulse",
    description: "Handheld pan across the river at dusk.",
    location: "Chicago, IL",
    capturedAt: "2022-08-19",
    resolution: "4096 × 2160",
    device: "Canon R6",
    mediaType: "Video",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    tags: ["City", "Video", "Travel"],
    rowSpan: 2,
    colSpan: 1,
  },
  {
    title: "Golden Hour Cruise",
    description: "Steady-cam clip of an easy long run session.",
    location: "Raleigh, NC",
    capturedAt: "2024-01-27",
    resolution: "3840 × 2160",
    device: "Sony FX3",
    mediaType: "Video",
    image:
      "https://images.unsplash.com/photo-1451188502541-13943edb6acb?auto=format&fit=crop&w=1200&q=80",
    tags: ["Run", "Tempo", "City"],
    rowSpan: 2,
    colSpan: 1,
  },
  {
    title: "Cascadia Trail",
    description: "Misty singletrack with soft moss tones.",
    location: "Portland, OR",
    capturedAt: "2021-04-16",
    resolution: "6240 × 4160",
    device: "Sony A7R III",
    mediaType: "Photo",
    image:
      "https://images.unsplash.com/photo-1463107971871-fbac9ddb920f?auto=format&fit=crop&w=1200&q=80",
    tags: ["Trail", "Forest", "Travel"],
    rowSpan: 4,
    colSpan: 2,
  },
];

const filterOptions = ["All", "Photos", "Videos"] as const;

const flickrPattern: Array<{ rowSpan: number; colSpan: number }> = [
  { rowSpan: 3, colSpan: 2 },
  { rowSpan: 2, colSpan: 1 },
  { rowSpan: 4, colSpan: 2 },
  { rowSpan: 2, colSpan: 1 },
  { rowSpan: 3, colSpan: 1 },
];

type FlickrApiItem = {
  id: string;
  title: string;
  description: string;
  takenAt: string | null;
  tags: string[];
  ownerName: string;
  ownerId: string;
  image: string;
  width: number | null;
  height: number | null;
  link: string;
};

type FlickrApiResponse = {
  items: FlickrApiItem[];
};

const sanitizeText = (value: string) =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const deriveSpans = (item: FlickrApiItem, index: number) => {
  if (item.width && item.height) {
    const ratio = item.width / item.height;
    if (ratio >= 1.8) {
      return { rowSpan: 2, colSpan: 2 };
    }
    if (ratio >= 1.35) {
      return { rowSpan: 3, colSpan: 2 };
    }
    if (ratio <= 0.9) {
      return { rowSpan: 3, colSpan: 1 };
    }
  }
  return flickrPattern[index % flickrPattern.length];
};

const formatResolution = (item: FlickrApiItem) =>
  item.width && item.height ? `${item.width} × ${item.height}` : "—";

const formatDate = (date: string) => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Date unknown";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
};

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filterOptions)[number]>("All");
  const [query, setQuery] = useState("");
  const [flickrItems, setFlickrItems] = useState<GalleryItem[]>([]);
  const [flickrStatus, setFlickrStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [flickrError, setFlickrError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchFlickr = async () => {
      try {
        setFlickrStatus("loading");
        const response = await fetch("/api/flickr?per_page=12", {
          cache: "no-store",
        });
        if (!response.ok) {
          const message = await response
            .text()
            .catch(() => `Flickr responded with ${response.status}`);
          throw new Error(message);
        }
        const data = (await response.json()) as FlickrApiResponse;
        if (ignore) return;
        const items: GalleryItem[] = (data.items ?? [])
          .map((item, index) => {
            if (!item.image) return null;
            const { rowSpan, colSpan } = deriveSpans(item, index);
            const description = sanitizeText(item.description || "");
            const captureDate = item.takenAt ?? new Date().toISOString();
            const resolution = formatResolution(item);
            return {
              title: item.title || `Flickr Frame ${index + 1}`,
              description: description || "Captured via Flickr feed.",
              location: item.ownerName ? `Flickr • ${item.ownerName}` : "Flickr",
              capturedAt: captureDate,
              resolution,
              device: "Flickr Upload",
              mediaType: "Photo",
              image: item.image,
              tags: item.tags.slice(0, 6),
              rowSpan,
              colSpan,
              href: item.link,
              source: "Flickr",
            };
          })
          .filter((entry): entry is GalleryItem => entry !== null);
        setFlickrItems(items);
        setFlickrStatus("ready");
        setFlickrError(null);
      } catch (error) {
        if (ignore) return;
        console.error("Failed to load Flickr feed", error);
        setFlickrStatus("error");
        setFlickrError(
          error instanceof Error ? error.message : "Flickr feed unavailable right now."
        );
      }
    };

    fetchFlickr();

    return () => {
      ignore = true;
    };
  }, []);

  const combinedMedia = useMemo(
    () => [...flickrItems, ...staticGalleryItems],
    [flickrItems]
  );

  const filteredMedia = useMemo(() => {
    return combinedMedia.filter((item) => {
      const matchesFilter =
        activeFilter === "All" || item.mediaType.toLowerCase() === activeFilter.toLowerCase();
      const haystack = `${item.title} ${item.description} ${item.location} ${item.tags.join(" ")}`.toLowerCase();
      const matchesQuery = haystack.includes(query.trim().toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query, combinedMedia]);

  return (
    <main className="gallery-page">
      <CustomCursor />
      <header className="gallery-controls">
        <div className="gallery-brand">
          <span className="brand-wordmark">Valk.jpeg</span>
          <span className="brand-subtitle">Photos and videos of my adventures</span>
          {flickrStatus !== "idle" && (
            <span
              className={`gallery-status ${
                flickrStatus === "error" ? "gallery-status--error" : ""
              }`}
            >
              {flickrStatus === "loading" && "Syncing Flickr feed..."}
              {flickrStatus === "ready" && `Flickr sync • ${flickrItems.length} new frames`}
              {flickrStatus === "error" && (flickrError ?? "Flickr feed unavailable")}
            </span>
          )}
        </div>
        <div className="controls-right">
          <div className="filter-group">
            {filterOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`filter-chip ${activeFilter === option ? "active" : ""}`}
                onClick={() => setActiveFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <label className="search-field">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M10.5 3a7.5 7.5 0 015.93 12.08l4 4a1 1 0 01-1.42 1.42l-4-4A7.5 7.5 0 1110.5 3zm0 2a5.5 5.5 0 100 11 5.5 5.5 0 000-11z"
                fill="currentColor"
              />
            </svg>
            <input
              type="search"
              placeholder="Search frames"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>
      </header>

      <section className="gallery-masonry">
        {filteredMedia.map((item, index) => (
          <article
            key={item.href ?? `${item.title}-${item.capturedAt}`}
            className="gallery-tile cinematic-reveal"
            style={{
              gridRowEnd: `span ${item.rowSpan}`,
              gridColumn: `span ${item.colSpan}`,
              animationDelay: `${index * 0.07}s`,
            }}
          >
            <div
              className="gallery-image"
              style={{ backgroundImage: `url(${item.image})` }}
              aria-hidden="true"
            />
            <div className="gallery-overlay">
              <div className="overlay-top">
                <span className="overlay-tag">{item.mediaType}</span>
                <span className="overlay-date">{formatDate(item.capturedAt)}</span>
              </div>
              <div className="overlay-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="overlay-meta">
                  <span>{item.location}</span>
                  <span>{item.resolution}</span>
                  <span>{item.device}</span>
                </div>
                <div className="overlay-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
                {item.href && (
                  <a
                    className="overlay-link"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on Flickr
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
