"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Doto } from "next/font/google";
import CustomCursor from "./custom-cursor";

const doto = Doto({ subsets: ["latin"], weight: ["400", "500", "700"] });

type SectionProps = {
  id?: string;
  title?: string;
  children: React.ReactNode;
  fade?: string;
};

export const Section = ({ id, title, children, fade }: SectionProps) => (
  <section id={id} className="stack" data-fade={fade}>
    {title && <h2 className="text-balance">{title}</h2>}
    {children}
  </section>
);

type Project = {
  title: string;
  description: string;
  link?: string;
  tag?: string;
};

const projects: Project[] = [
  {
    title: "Portfolio Shell",
    description:
      "The minimal foundation of this site. Accessible, fast, zero fluff.",
    tag: "WIP",
  },
  {
    title: "Design Tokens",
    description:
      "A tiny adaptive design token system using modern CSS primitives.",
  },
];

const ProjectCard = ({ p, index }: { p: Project; index: number }) => (
  <a
    className="panel block no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[--accent]"
    href={p.link || "#"}
    data-fade={String(index + 1)}
    aria-label={p.link ? `${p.title} project` : undefined}
  >
    <div className="cluster items-start justify-between mb-1">
      <h3 className="m-0 text-[clamp(1.05rem,1rem+0.4vw,1.25rem)] font-medium">
        {p.title}
      </h3>
      {p.tag && (
        <span className="text-[10px] tracking-wide uppercase px-2 py-[2px] rounded-full bg-foreground/10 dark:bg-white/10 backdrop-blur-sm">
          {p.tag}
        </span>
      )}
    </div>
    <p className="m-0 text-[var(--step--1)] leading-snug opacity-80">
      {p.description}
    </p>
  </a>
);

type Destination = {
  title: string;
  description: string;
  href: string;
  accent: string;
  meta: string;
};

const featureDestinations: Destination[] = [
  {
    title: "My Running Shoes",
    description:
      "A timeline of every trainer and racer with mileage, lifespan, and state-side stories.",
    href: "/running-shoes",
    accent: "linear-gradient(135deg, #ff915b, #ff4d6d)",
    meta: "Mileage archive",
  },
  {
    title: "ValK.JPEG",
    description:
      "A modular gallery for film stills, drone sweeps, and race-day captures.",
    href: "/gallery",
    accent: "linear-gradient(135deg, #6c63ff, #37d5d6)",
    meta: "Media vault",
  },
];

const DestinationNode = ({
  destination,
  index,
}: {
  destination: Destination;
  index: number;
}) => (
  <Link
    href={destination.href}
    className="destination-node cinematic-reveal"
    style={{
      backgroundImage: destination.accent,
      animationDelay: `${index * 0.08}s`,
    }}
  >
    <div className="node-meta-row">
      <span className="node-pill">{destination.meta}</span>
      <span className="node-arrow" aria-hidden="true">
        →
      </span>
    </div>
    <h3>{destination.title}</h3>
    <p>{destination.description}</p>
  </Link>
);

// Simple typing hook
function useTypewriter(text: string, speed = 40) {
  const [output, setOutput] = useState("");
  useEffect(() => {
    let i = 0;
    let frame: number;
    const step = () => {
      i++;
      setOutput(text.slice(0, i));
      if (i < text.length) {
        frame = window.setTimeout(step, speed + Math.random() * 60);
      }
    };
    step();
    return () => window.clearTimeout(frame);
  }, [text, speed]);
  return output;
}

// Add SocialLinks component (placed before the default export)
const SocialLinks = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  const links: {
    href: string;
    label: string;
    color: string;
    icon: React.ReactNode;
  }[] = [
    {
      href: "https://github.com/",
      label: "GitHub",
      color: "#181717",
      icon: <Image src="/githubicon.png" alt="GitHub" width={18} height={18} />,
    },
    {
      href: "https://www.youtube.com/",
      label: "YouTube",
      color: "#FF0000",
      icon: <Image src="/youtube.png" alt="YouTube" width={18} height={18} />,
    },
    {
      href: "https://linkedin.com/",
      label: "LinkedIn",
      color: "#0A66C2",
      icon: (
        <Image src="/linkedicon.png" alt="LinkedIn" width={18} height={18} />
      ),
    },
    {
      href: "https://instagram.com/",
      label: "Instagram",
      color: "#E1306C",
      icon: (
        <Image src="/instagram.png" alt="Instagram" width={18} height={18} />
      ),
    },
  ];

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 flex gap-3"
      style={{ zIndex: 10, bottom: -20 }}
    >
      {links.map((l, i) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          aria-label={l.label}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          className="flex items-center justify-center"
          style={{
            width: 44,
            height: 44,
            borderRadius: 9999,
            background: "rgba(255,255,255,0.04)",
            border: "2px solid transparent",
            transition: "box-shadow .18s, border-color .18s, transform .12s",
            boxShadow: hovered === i ? `0 0 0 6px ${l.color}22` : undefined,
            borderColor: hovered === i ? l.color : "transparent",
            color: "var(--text, currentColor)",
          }}
        >
          {l.icon}
        </a>
      ))}
    </div>
  );
};

export default function HomePage() {
  const typed = useTypewriter("Hello world, I'm Val");
  return (
    <>
      <CustomCursor />
      <div className="wrapper">
        {/* Hero */}
        <header
          className="flex flex-col items-center justify-center text-center gap-8 md:gap-12 min-h-screen"
          data-fade="1"
        >
          <div className="flex flex-col gap-6" data-fade="1">
            <h1 className="text-balance m-0 leading-tight">
              <span
                className={`${doto.className} font-extrabold text-gray-900`}
              >
                {typed}
              </span>
              <span className="typing-caret" aria-hidden="true" />
            </h1>
            <div
              className="relative aspect-square mx-auto"
              style={{ width: "clamp(220px,35vw,350px)", marginTop: "50px" }}
              data-fade="2"
            >
              <div className="absolute inset-0">
                <Image
                  src="/guy.png"
                  alt="Profile image"
                  fill
                  priority
                  sizes="(max-width:768px) 55vw, 320px"
                  className="object-cover grayscale"
                />
              </div>

              {/* Replace empty div with social icons overlay */}
              <SocialLinks />
            </div>
          </div>
        </header>

        {/* Rest of content */}
        <div className="stack py-14 md:py-24">
          <div className="divider" />

          {/* About */}
          <Section id="about" title="About">
            {/* reduced height (~half) and justify image to the far right on md+ */}
            <div className="muted flex flex-col md:flex-row items-stretch md:justify-between gap-6 md:min-h-[260px] lg:min-h-[320px]">
              {/* column for tags above paragraph */}
              <div className="flex-1 flex flex-col">
                <div className="flex gap-3 mb-3">
                  <span className="inline-block text-[16px] font-medium px-3 py-1 rounded-[5px] bg-red-600 text-white">
                    Belarusian
                  </span>
                  <span className="inline-block text-[16px] font-medium px-3 py-1 rounded-[5px] bg-blue-600 text-white">
                    Duke 2028
                  </span>
                </div>

                <p className="flex-1">
                  Im originally from Belarus ⬜️🟥⬜️, now based in the United
                  States 🇺🇸 Im currently an undergrad at Duke University 💙
                  studying Computer Science 💻, Mathematics 🧮, and Psychology
                  👨‍⚕️ Ive been developing web and mobile application since middle
                  school and am particularly passionate about building tools
                  that genuinely help and empower people! In my free time I
                  enjoy cinematography 📸, hiking 🥾, trying out new tech 👾,
                  driving 🏎️ and running 🏃. Im proficient in Russian and
                  English but can also do French, Polish, and Belarusian. The
                  purpose of this website is to be the primary hub for
                  everything I do, here you can find my articles, courses,
                  videos, photos, projects, publishings, etc. You can also find
                  links and sources to get in contact if you ever want to chat!
                  I&apos;m always up for a good convo over some coffee.
                </p>
              </div>

              {/* Right-side image — pushed to the far right and fills the about height */}
              <div className="relative w-full md:w-[520px] lg:w-[720px] flex-shrink-0 self-stretch ml-auto">
                <Image
                  src="/IMG_2880.JPG"
                  alt="IMG_2880"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 520px, 720px"
                  className="object-cover rounded-lg border border-foreground/10 shadow-sm"
                />
              </div>
            </div>
          </Section>

          <div className="divider" />

          {/* Projects */}
          <Section id="projects" title="Current Projects" fade="1">
            <div
              className="grid gap-4 md:gap-6"
              style={{
                gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
              }}
            >
              {projects.map((p, i) => (
                <ProjectCard key={p.title} p={p} index={i} />
              ))}
              <div
                className="panel flex items-center justify-center text-center text-[12px] tracking-wide uppercase opacity-60"
                data-fade="4"
              >
                More soon
              </div>
            </div>
          </Section>

          <div className="divider" />

          <Section id="vault" title="Deep Dives" fade="2">
            <div className="destination-grid">
              {featureDestinations.map((destination, index) => (
                <DestinationNode
                  destination={destination}
                  index={index}
                  key={destination.href}
                />
              ))}
            </div>
          </Section>

          <div className="divider" />
        </div>
      </div>
    </>
  );
}
