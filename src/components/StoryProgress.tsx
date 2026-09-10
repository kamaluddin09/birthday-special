"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Celebration" },
  { id: "gallery", label: "3D Gallery" },
  { id: "ticker", label: "Time Together" },
  { id: "timeline", label: "Our Story" },
  { id: "letter", label: "Love Letter" },
  { id: "reasons", label: "Things I Love" },
  { id: "suspense", label: "A Thought" },
  { id: "final", label: "Happy Birthday" },
];

export function StoryProgress({ isRevealed }: { isRevealed: boolean }) {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    if (!isRevealed) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isRevealed]);

  if (!isRevealed) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Story chapter progression"
      className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-3.5"
    >
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#FF4F8B]/25 to-transparent -z-10" />
      {sections.map((s) => {
        const isActive = activeSection === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="group relative flex items-center justify-center p-1 focus:outline-none"
            aria-label={`Scroll to ${s.label}`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "h-3.5 w-3.5 bg-[#FF4F8B] shadow-[0_0_12px_#FF4F8B]"
                  : "h-2 w-2 bg-[#FFE4EF]/35 group-hover:bg-[#FF4F8B]/70 group-hover:scale-125"
              }`}
            />
            {/* Tooltip on hover */}
            <span className="pointer-events-none absolute left-6 rounded-md bg-[#250713]/90 px-2 py-1 text-[11px] font-medium tracking-wider text-[#FFE4EF] opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap border border-[#FF4F8B]/20">
              {s.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
