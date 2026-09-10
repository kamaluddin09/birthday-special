"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("button") ||
        target?.closest("a") ||
        target?.closest("[role='button']") ||
        target?.tagName === "BUTTON" ||
        target?.tagName === "A"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, prefersReducedMotion]);

  if (!isVisible || prefersReducedMotion) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed z-50 rounded-full transition-transform duration-75 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 2.2 : 1})`,
          width: "10px",
          height: "10px",
          backgroundColor: "#FF4F8B",
          boxShadow: "0 0 14px #FF4F8B, 0 0 24px #F9D976",
        }}
      />
      <div
        className="pointer-events-none fixed z-50 rounded-full border border-[#FF4F8B]/40 transition-transform duration-200 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.6 : 1})`,
          width: "32px",
          height: "32px",
        }}
      />
    </>
  );
}
