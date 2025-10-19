"use client";

import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateHoverState = (e: MouseEvent) => {
      const hoveredElement = e.target as HTMLElement | null;
      if (!hoveredElement) return;
      const isInteractive =
        hoveredElement.tagName === "A" ||
        hoveredElement.tagName === "BUTTON" ||
        hoveredElement.classList.contains("button") ||
        hoveredElement.getAttribute("role") === "button" ||
        hoveredElement.onclick !== null;
      setIsHover(isInteractive);
    };

    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mouseover", updateHoverState);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mouseover", updateHoverState);
    };
  }, []);

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

export default CustomCursor;
