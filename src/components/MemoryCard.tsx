"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { MemoryItem } from "@/data/memories";
import { Calendar, MapPin, Quote, ZoomIn, X } from "lucide-react";

interface MemoryCardProps {
  memory: MemoryItem;
  index: number;
}

export function MemoryCard({ memory, index }: MemoryCardProps) {
  const isEven = index % 2 === 0;
  const [isZoomed, setIsZoomed] = useState(false);

  // Close lightbox on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsZoomed(false);
    },
    []
  );

  useEffect(() => {
    if (!isZoomed) return;
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isZoomed, handleKeyDown]);

  return (
    <>
      <div
        data-memory-card
        className={`relative mb-16 sm:mb-24 flex flex-col md:flex-row md:items-stretch items-center gap-8 ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* Photo Frame Container */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div
            onClick={() => setIsZoomed(true)}
            className="group relative w-full max-w-md h-full min-h-[420px] sm:min-h-[460px] flex flex-col overflow-hidden rounded-2xl border border-[#FF4F8B]/25 bg-[#250713]/60 p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-[#FF4F8B]/60 hover:shadow-[0_25px_50px_rgba(255,79,139,0.25)] cursor-pointer"
            title="Click to view full photo"
          >
            {/* Inner Image Stage */}
            <div className="relative w-full h-full flex-1 overflow-hidden rounded-xl bg-[#14030B] flex items-center justify-center">
              {/* Ambient Blurred Backdrop - fills whole frame with photo's soft ambient glow */}
              <Image
                src={memory.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover blur-2xl opacity-40 scale-110 pointer-events-none transition-opacity duration-500 group-hover:opacity-55"
                priority={index < 2}
              />

              {/* Complete Full Photo - uncropped with object-contain */}
              <Image
                src={memory.image}
                alt={memory.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-2 sm:p-3 drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)] transition-transform duration-700 group-hover:scale-[1.02]"
                priority={index < 2}
              />

              {/* Chapter Badge Overlay */}
              <div className="absolute top-3 left-3 rounded-full bg-[#18030D]/85 px-3 py-1 text-[11px] font-semibold tracking-wider text-[#F9D976] backdrop-blur-md border border-[#F9D976]/30 shadow-md z-10">
                CHAPTER {memory.chapter}
              </div>

              {/* Zoom In Hint Badge */}
              <div className="absolute bottom-3 right-3 rounded-full bg-[#18030D]/80 p-2 text-[#FFE4EF]/80 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md z-10">
                <ZoomIn className="h-4 w-4 text-[#FF4F8B]" />
              </div>
            </div>
          </div>
        </div>

        {/* Memory Text & Details Card */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="glass-card relative w-full max-w-md h-full min-h-[420px] sm:min-h-[460px] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            {/* Top content: Badges, Title, Description */}
            <div className="space-y-4">
              {/* Date & Location Badges */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#FFE4EF]/80 font-medium">
                {memory.date && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF4F8B]/15 px-3 py-1 text-xs text-[#FFE4EF] border border-[#FF4F8B]/30 backdrop-blur-sm">
                    <Calendar className="h-3.5 w-3.5 text-[#FF4F8B]" />
                    {memory.date}
                  </span>
                )}
                {memory.location && memory.location !== memory.date && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F9D976]/15 px-3 py-1 text-xs text-[#F9D976] border border-[#F9D976]/30 backdrop-blur-sm">
                    <MapPin className="h-3.5 w-3.5 text-[#F9D976]" />
                    {memory.location}
                  </span>
                )}
              </div>

              {/* Memory Title */}
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white tracking-wide leading-snug">
                {memory.title}
              </h3>

              {/* Memory Description */}
              <p className="text-sm sm:text-base text-[#FFE4EF]/90 font-light leading-relaxed whitespace-pre-line">
                {memory.description}
              </p>
            </div>

            {/* Romantic Quote Accent (docked at the bottom for balanced alignment) */}
            {memory.quote && (
              <div className="mt-6 pt-4 border-t border-[#FF4F8B]/20 flex items-center gap-2.5 text-xs sm:text-sm italic text-[#F9D976]/95">
                <Quote className="h-3.5 w-3.5 text-[#FF4F8B] shrink-0" />
                <span>{memory.quote}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Photo Modal / Lightbox */}
      {isZoomed && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#0D0207]/90 backdrop-blur-2xl transition-all duration-300 animate-fade-in"
          onClick={() => setIsZoomed(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#250713]/85 border border-white/20 text-white shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-[#FF4F8B] hover:bg-[#FF4F8B]/30"
            aria-label="Close photo"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Centered Image Container */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={memory.image}
                alt={memory.title}
                fill
                className="object-contain drop-shadow-2xl rounded-lg"
                sizes="90vw"
                priority
              />
            </div>
            <div className="mt-3 text-center">
              <p className="text-white font-serif text-lg sm:text-xl font-medium">
                {memory.title}
              </p>
              {memory.quote && (
                <p className="text-[#F9D976]/90 text-xs sm:text-sm italic mt-1">
                  &ldquo;{memory.quote}&rdquo;
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
