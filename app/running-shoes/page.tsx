"use client";

import Link from "next/link";
import Image from "next/image";
import CustomCursor from "../components/custom-cursor";

type ShoeStatus = "Active" | "In Storage" | "Retired";
type ShoeTier = "Super" | "Performance" | "Daily";

type ShoeEntry = {
  name: string;
  brand: string;
  category: string;
  miles: number;
  goalMiles: number;
  status: ShoeStatus;
  purchasePrice: number;
  msrp: number;
  primaryState: string;
  year: number;
  image: string;
  tier: ShoeTier;
};

const runningShoeHistory: ShoeEntry[] = [
  {
    name: "Adizero Adios Pro 3",
    brand: "adidas",
    category: "Marathon Super Shoe",
    miles: 192,
    goalMiles: 350,
    status: "Active",
    purchasePrice: 220,
    msrp: 250,
    primaryState: "Illinois",
    year: 2023,
    image: "/adiospro3.webp",
    tier: "Super",
  },
  {
    name: "Vaporfly 4",
    brand: "Nike",
    category: "Race Day Reserve",
    miles: 26,
    goalMiles: 250,
    status: "In Storage",
    purchasePrice: 275,
    msrp: 275,
    primaryState: "New York",
    year: 2024,
    image: "/vaporfly4.png",
    tier: "Super",
  },
  {
    name: "Vaporfly 3",
    brand: "Nike",
    category: "Race Day Reserve",
    miles: 71,
    goalMiles: 230,
    status: "In Storage",
    purchasePrice: 250,
    msrp: 260,
    primaryState: "North Carolina",
    year: 2023,
    image: "/vaporfly3.png",
    tier: "Super",
  },
  {
    name: "Vaporfly 2 (Ekiden)",
    brand: "Nike",
    category: "Road Racing",
    miles: 290,
    goalMiles: 300,
    status: "Retired",
    purchasePrice: 250,
    msrp: 250,
    primaryState: "Illinois",
    year: 2021,
    image: "/vaporfly2ekiden.jpg",
    tier: "Super",
  },
  {
    name: "Vaporfly 2 (Spruce)",
    brand: "Nike",
    category: "Road Racing",
    miles: 265,
    goalMiles: 300,
    status: "Retired",
    purchasePrice: 220,
    msrp: 250,
    primaryState: "North Carolina",
    year: 2021,
    image: "/vaporfly2spruce.jpg",
    tier: "Super",
  },
  {
    name: "Dragonfly",
    brand: "Nike",
    category: "Track Spike",
    miles: 38,
    goalMiles: 150,
    status: "Active",
    purchasePrice: 150,
    msrp: 160,
    primaryState: "North Carolina",
    year: 2024,
    image: "/dragonfly.jpg",
    tier: "Performance",
  },
  {
    name: "Pegasus Turbo Next Nature",
    brand: "Nike",
    category: "Tempo Trainer",
    miles: 180,
    goalMiles: 280,
    status: "Retired",
    purchasePrice: 160,
    msrp: 180,
    primaryState: "Illinois",
    year: 2022,
    image: "/pegasusturbo.webp",
    tier: "Performance",
  },
  {
    name: "Zoom Fly 4",
    brand: "Nike",
    category: "Carbon Trainer",
    miles: 260,
    goalMiles: 320,
    status: "Retired",
    purchasePrice: 130,
    msrp: 160,
    primaryState: "North Carolina",
    year: 2022,
    image: "/zoomfly4.avif",
    tier: "Performance",
  },
  {
    name: "Air Zoom Tempo NEXT%",
    brand: "Nike",
    category: "Speed Trainer",
    miles: 312,
    goalMiles: 350,
    status: "Retired",
    purchasePrice: 200,
    msrp: 200,
    primaryState: "Illinois",
    year: 2020,
    image: "/airzoomtemponext%.jpg",
    tier: "Performance",
  },
  {
    name: "Pegasus 37 Shield",
    brand: "Nike",
    category: "All-Weather Trainer",
    miles: 88,
    goalMiles: 400,
    status: "Active",
    purchasePrice: 130,
    msrp: 150,
    primaryState: "North Carolina",
    year: 2022,
    image: "/pegasus37.jpg",
    tier: "Daily",
  },
  {
    name: "Vomero 18",
    brand: "Nike",
    category: "Daily Trainer",
    miles: 142,
    goalMiles: 400,
    status: "Active",
    purchasePrice: 160,
    msrp: 160,
    primaryState: "North Carolina",
    year: 2024,
    image: "/vomero18.png",
    tier: "Daily",
  },
  {
    name: "Vomero Plus",
    brand: "Nike",
    category: "Cushion Cruiser",
    miles: 12,
    goalMiles: 380,
    status: "In Storage",
    purchasePrice: 210,
    msrp: 210,
    primaryState: "North Carolina",
    year: 2024,
    image: "/vomeroplus.avif",
    tier: "Daily",
  },
  {
    name: "Pegasus 36",
    brand: "Nike",
    category: "Daily Trainer",
    miles: 612,
    goalMiles: 500,
    status: "Retired",
    purchasePrice: 120,
    msrp: 120,
    primaryState: "Illinois",
    year: 2019,
    image: "/pegasus37.jpg",
    tier: "Daily",
  },
  {
    name: "Infinity Run 1 (Black)",
    brand: "Nike",
    category: "High Cushion",
    miles: 402,
    goalMiles: 400,
    status: "Retired",
    purchasePrice: 160,
    msrp: 160,
    primaryState: "Florida",
    year: 2020,
    image: "/infinityrun1blue.webp",
    tier: "Daily",
  },
  {
    name: "Infinity Run 1 (Volt)",
    brand: "Nike",
    category: "High Cushion",
    miles: 388,
    goalMiles: 400,
    status: "Retired",
    purchasePrice: 160,
    msrp: 160,
    primaryState: "Florida",
    year: 2020,
    image: "/infinityrun2.avif",
    tier: "Daily",
  },
  {
    name: "Adidas UltraBoost Light",
    brand: "adidas",
    category: "Recovery Cruiser",
    miles: 245,
    goalMiles: 320,
    status: "Retired",
    purchasePrice: 200,
    msrp: 210,
    primaryState: "Illinois",
    year: 2021,
    image: "/ultraboostlight.webp",
    tier: "Daily",
  },
  {
    name: "New Balance Fresh Foam More v4",
    brand: "New Balance",
    category: "Max Cushion",
    miles: 220,
    goalMiles: 350,
    status: "Retired",
    purchasePrice: 150,
    msrp: 150,
    primaryState: "Illinois",
    year: 2021,
    image: "/nbfreshmorev4.webp",
    tier: "Daily",
  },
];

const brandLogoMap: Record<string, { src: string; alt: string }> = {
  Nike: { src: "/nikelogo.svg", alt: "Nike" },
  adidas: { src: "/adidaslogo.svg", alt: "Adidas" },
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const statusSections: { label: string; status: ShoeStatus }[] = [
  { label: "Active Rotation", status: "Active" },
  { label: "In Storage", status: "In Storage" },
  { label: "Retired Legends", status: "Retired" },
];

const statusTagClass: Record<ShoeStatus, string> = {
  Active: "tag-active",
  "In Storage": "tag-storage",
  Retired: "tag-retired",
};

const tierPriority: Record<ShoeTier, number> = {
  Super: 0,
  Performance: 1,
  Daily: 2,
};

export default function RunningShoesHistoryPage() {
  return (
    <main className="immersive-page running-shoes-layout">
      <CustomCursor />
      <div className="floating-orb orb-one" />
      <div className="floating-orb orb-two" />
      <section className="hero-stage">
        <div className="hero-sheen" />
        <div className="hero-content">
          <p className="eyebrow">Tracking Every Mile</p>
          <h1>My Running Shoes</h1>
          <p className="lede">
            Every pair logged with stats that matter—mileage, status, spend, and
            the state where the story unfolded.
          </p>
          <div className="button-row">
            <Link href="/" className="button ghost-button">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <section className="timeline-shell">
        {statusSections.map(({ label, status }) => {
          const filtered = runningShoeHistory
            .filter((entry) => entry.status === status)
            .sort((a, b) => {
              const tierRank =
                tierPriority[a.tier] - tierPriority[b.tier];
              if (tierRank !== 0) return tierRank;
              if (b.year !== a.year) return b.year - a.year;
              return a.name.localeCompare(b.name);
            });

          if (filtered.length === 0) return null;

          return (
            <section key={status} className="status-group">
              <header className="status-header">
                <h2>{label}</h2>
              </header>
              <ul className="timeline-grid shoe-grid">
                {filtered.map((entry, index) => {
                  return (
                    <li
                      key={entry.name}
                      className="timeline-node shoe-card cinematic-reveal"
                      style={{ animationDelay: `${index * 0.12}s` }}
                    >
                      <div className="shoe-card__header">
                        <span className={`status-tag ${statusTagClass[entry.status]}`}>
                          {entry.status}
                        </span>
                        <span className={`tier-chip tier-${entry.tier.toLowerCase()}`}>
                          {entry.tier}
                        </span>
                        <span className="year-marker">{entry.year}</span>
                      </div>
                      <figure className="shoe-card__media" aria-label={entry.name}>
                        <div
                          className="shoe-card__photo"
                          style={{ backgroundImage: `url(${entry.image})` }}
                        />
                      </figure>
                      <div className="shoe-card__body">
                        <div className="shoe-card__identity">
                          <span className="shoe-type-chip">{entry.category}</span>
                          <div className="primary-region" aria-label="Primary miles location">
                            <span className="primary-region__icon" aria-hidden="true">
                              📍
                            </span>
                            <span className="primary-region__state">
                              {entry.primaryState}
                            </span>
                          </div>
                          <div className="brand-row">
                            <span className="brand-sigil">
                              {brandLogoMap[entry.brand] ? (
                                <Image
                                  src={brandLogoMap[entry.brand].src}
                                  alt={brandLogoMap[entry.brand].alt}
                                  width={28}
                                  height={28}
                                />
                              ) : (
                                entry.brand[0]
                              )}
                            </span>
                            <span className="brand-name">{entry.brand}</span>
                          </div>
                          <h3>{entry.name}</h3>
                        </div>
                        <div className="metrics-stack">
                          <div className="target-mileage">
                            <span className="target-mileage__label">Target mileage</span>
                            <span className="target-mileage__value">
                              {entry.goalMiles} mi
                            </span>
                          </div>
                          <div className="metric-row">
                            <div className="metric-col">
                              <span className="metric-label">Logged</span>
                              <span className="metric-value">{entry.miles} mi</span>
                            </div>
                            <div className="metric-col">
                              <span className="metric-label">Purchase</span>
                              <span className="metric-value">
                                {formatCurrency(entry.purchasePrice)}
                              </span>
                            </div>
                            <div className="metric-col">
                              <span className="metric-label">MSRP</span>
                              <span className="metric-value">
                                {formatCurrency(entry.msrp)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </section>
    </main>
  );
}
