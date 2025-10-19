"use client";

import Link from "next/link";
import Image from "next/image";
import CustomCursor from "../components/custom-cursor";

type ShoeStatus = "Active" | "In Storage" | "Retired";

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
};

const runningShoeHistory: ShoeEntry[] = [
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
  },
  {
    name: "Adizero Adios Pro 3",
    brand: "adidas",
    category: "Marathon Racer",
    miles: 192,
    goalMiles: 350,
    status: "Active",
    purchasePrice: 220,
    msrp: 250,
    primaryState: "Illinois",
    year: 2023,
    image: "/adiospro3.webp",
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
            .sort((a, b) => b.year - a.year);

          if (filtered.length === 0) return null;

          return (
            <section key={status} className="status-group">
              <header className="status-header">
                <h2>{label}</h2>
              </header>
              <ul className="timeline-grid shoe-grid">
                {filtered.map((entry, index) => {
                  const percent = Math.round((entry.miles / entry.goalMiles) * 100);
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
                          <div className="metric-block">
                            <div className="progress-shell">
                              <span className="progress-label">Mileage</span>
                              <div className="progress">
                                <div
                                  className="progress-fill"
                                  style={{ width: `${Math.min(percent, 100)}%` }}
                                />
                              </div>
                              <span className="progress-percent">{percent}%</span>
                            </div>
                            <small>
                              {entry.miles} mi logged &bull; target {entry.goalMiles} mi
                            </small>
                          </div>
                          <div className="metric-row">
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
