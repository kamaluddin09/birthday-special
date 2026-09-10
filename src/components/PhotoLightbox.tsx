"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { GalleryPhoto } from "@/data/galleryPhotos";
import { X, ChevronLeft, ChevronRight, Heart, Sparkles } from "lucide-react";

interface PhotoLightboxProps {
  photo: GalleryPhoto | null;
  currentIndex: number;
  totalPhotos: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function PhotoLightbox({
  photo,
  currentIndex,
  totalPhotos,
  onClose,
  onNext,
  onPrev,
}: PhotoLightboxProps) {
  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (!photo) return;

    window.addEventListener("keydown", handleKeyDown);
    // Lock background scroll while lightbox is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [photo, handleKeyDown]);

  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo details: ${photo.caption}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0D0207]/90 backdrop-blur-2xl transition-all duration-300 animate-fade-in"
      onClick={onClose}
    >
      {/* Top Controls Bar */}
      <div
        className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50 flex items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="rounded-full bg-[#18030D]/80 border border-[#FF4F8B]/30 px-3.5 py-1 text-xs font-medium text-[#FFE4EF] backdrop-blur-md">
          {currentIndex + 1} of {totalPhotos}
        </span>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#250713]/80 border border-white/20 text-white shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-[#FF4F8B] hover:bg-[#FF4F8B]/30 focus:outline-none"
          aria-label="Close photo preview"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Prev / Next Floating Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#250713]/80 border border-white/20 text-[#FFE4EF] shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-[#FF4F8B] hover:text-white hover:bg-[#FF4F8B]/30 focus:outline-none"
        aria-label="Previous photo"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#250713]/80 border border-white/20 text-[#FFE4EF] shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-[#FF4F8B] hover:text-white hover:bg-[#FF4F8B]/30 focus:outline-none"
        aria-label="Next photo"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Main Polaroid Frame */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-sm sm:max-w-md w-full rounded-2xl bg-gradient-to-b from-[#FFFDFB] to-[#FFF8F2] p-4 sm:p-5 pb-6 sm:pb-7 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(255,79,139,0.3)] transition-transform duration-300 transform -rotate-1 hover:rotate-0"
      >
        {/* Subtle Decorative Tape / Clip Effect at Top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-24 rounded-sm bg-white/45 backdrop-blur-md border border-white/60 shadow-sm rotate-1 pointer-events-none" />

        {/* High-Resolution Photo Container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#14030B] shadow-inner">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 90vw, 420px"
            priority
            className="object-cover"
          />
          {/* Subtle warm photo tint */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Polaroid Bottom Caption Area */}
        <div className="pt-5 px-2 text-center select-none">
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#E5A93C]" />
            <h3 className="font-serif italic text-xl sm:text-2xl font-bold text-[#250713] tracking-wide">
              {photo.caption}
            </h3>
            <Heart className="h-3.5 w-3.5 text-[#E63946] fill-[#E63946]" />
          </div>

          <p className="font-serif text-xs sm:text-sm text-[#7A1C3C]/80 italic">
            {photo.alt}
          </p>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none text-center hidden sm:block">
        <span className="text-[11px] tracking-widest text-[#FFE4EF]/50 uppercase">
          Use arrow keys to browse • Click outside or press ESC to close
        </span>
      </div>
    </div>
  );
}
