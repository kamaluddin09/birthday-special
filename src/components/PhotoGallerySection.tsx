"use client";

import { PhotoGallery3D } from "./PhotoGallery3D";
import { Sparkles, ChevronDown } from "lucide-react";

export function PhotoGallerySection() {
  const scrollToTimeline = () => {
    const el = document.getElementById("ticker") || document.getElementById("timeline");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="gallery"
      className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#14030B] via-[#210512] to-[#14030B] text-center"
    >
      {/* Ambient Lighting Behind Gallery */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[750px] max-w-full rounded-full bg-radial from-[#FF4F8B]/18 via-[#9D174D]/10 to-transparent blur-3xl -z-10" />

      {/* Gallery Header */}
      <div className="space-y-3 pt-4 mb-10 sm:mb-16 max-w-2xl mx-auto relative z-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#FF4F8B]/30 bg-[#250713]/80 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#FFE4EF] uppercase backdrop-blur-md shadow-lg">
          <Sparkles className="h-3 w-3 text-[#F9D976]" />
          3D Photo Installation
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white glow-text-pink">
          SOME OF MY FAVORITE VIEWS
        </h2>

        <p className="text-sm sm:text-base text-[#FFE4EF]/90 font-light max-w-lg mx-auto leading-relaxed">
          Every angle of you is pure magic. Drag or swipe horizontally to rotate through the memories.
        </p>
      </div>

      {/* The 3D Photo Gallery */}
      <div className="w-full relative z-10 flex items-center justify-center pt-2 sm:pt-6 pb-10">
        <PhotoGallery3D />
      </div>

      {/* Scroll Down to Timeline Cue */}
      <div className="pt-6 animate-bounce z-10">
        <button
          onClick={scrollToTimeline}
          className="group flex flex-col items-center gap-2 text-xs font-medium tracking-widest text-[#FFE4EF]/75 transition-colors hover:text-[#FF4F8B] focus:outline-none"
          aria-label="Scroll down to explore our story timeline"
        >
          <span className="flex items-center gap-1.5 uppercase">
            Our Story Continues Below
            <ChevronDown className="h-3.5 w-3.5 text-[#FF4F8B] group-hover:translate-y-1 transition-transform" />
          </span>
        </button>
      </div>
    </section>
  );
}
