"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Doto } from "next/font/google";
import { Roboto } from "next/font/google";

const doto = Doto({ subsets: ["latin"], weight: ["400", "500", "700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

// Custom Cursor Component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateHoverState = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      if (hoveredElement) {
        const isInteractive =
          hoveredElement.tagName === "A" ||
          hoveredElement.tagName === "BUTTON" ||
          hoveredElement.classList.contains("button") ||
          hoveredElement.getAttribute("role") === "button" ||
          (hoveredElement as HTMLElement).onclick !== null;
        setIsHover(isInteractive);
      }
    };

    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mouseover", updateHoverState);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mouseover", updateHoverState);
    };
  }, [position]);

  return (
    <div
      className={`custom-cursor ${isHover ? "hover" : ""}`}
      style={{
        left: position.x,
        top: position.y,
      }}
    />
  );
};

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
            </div>
          </div>
        </header>

        {/* Rest of content */}
        <div className="stack py-14 md:py-24">
          <div className="divider" />

          {/* About */}
          <Section id="about" title="About" fade="1">
            <p className="muted" data-fade="2">
              I enjoy systems thinking, subtle polish, and reducing complex
              flows into something that feels obvious. Tools I like right now:
              Next.js, TypeScript, PostCSS, CSS variables, and tiny composable
              components.
            </p>
          </Section>

          <div className="divider" />

          {/* Projects */}
          <Section id="projects" title="Selected Work" fade="1">
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

          {/* Contact */}
          <Section id="contact" title="Contact" fade="1">
            <div className="cluster" data-fade="2">
              <a className="inline-link" href="mailto:hello@example.com">
                Email
              </a>
              <a
                className="inline-link"
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="inline-link"
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
            <small className="muted" data-fade="3">
              © {new Date().getFullYear()} Valk. Built with Next.js.
            </small>
          </Section>
        </div>
      </div>
    </>
  );
}
