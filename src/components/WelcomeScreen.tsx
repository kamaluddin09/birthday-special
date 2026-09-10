"use client";

import { useState } from "react";
import { birthdayContent } from "@/data/birthdayContent";
import { triggerRomanticConfetti } from "@/lib/confetti";
import { Sparkles, Heart } from "lucide-react";

interface WelcomeScreenProps {
  onOpen: () => void;
  isOpening: boolean;
}

export function WelcomeScreen({ onOpen, isOpening }: WelcomeScreenProps) {
  const [hasClicked, setHasClicked] = useState(false);

  const handleClick = () => {
    if (hasClicked) return;
    setHasClicked(true);
    triggerRomanticConfetti();
    onOpen();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#18030D] via-[#250713] to-[#0D0207] px-6 text-center transition-all duration-1000 ease-in-out ${
        isOpening ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Soft Ambient Bokeh Glow */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#FF4F8B]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#E91E63]/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-radial from-[#9D174D]/25 via-transparent to-transparent blur-2xl" />

      {/* Subtle Floating Sparkle Elements */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Sparkles className="absolute top-1/4 left-1/4 h-5 w-5 text-[#F9D976]/40 animate-pulse" />
        <Heart className="absolute top-1/3 right-1/4 h-4 w-4 text-[#FF4F8B]/30 animate-float-gentle" />
        <Sparkles className="absolute bottom-1/3 left-1/3 h-4 w-4 text-[#FFE4EF]/30 animate-pulse" />
        <Heart className="absolute bottom-1/4 right-1/3 h-5 w-5 text-[#E63946]/30 animate-float-gentle" />
      </div>

      {/* Main Content Box */}
      <div className="relative z-10 max-w-lg space-y-8 animate-fade-in">
        {/* Mysterious Prelude */}
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF4F8B]/20 bg-[#FF4F8B]/10 px-4 py-1.5 text-xs font-medium tracking-widest text-[#FFE4EF] uppercase backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-[#F9D976]" />
            A Special Surprise
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#FFF8F5] drop-shadow-md">
            {birthdayContent.welcome.prelude}
          </h1>

          <p className="text-sm md:text-base text-[#FFE4EF]/75 font-light max-w-md mx-auto">
            {birthdayContent.welcome.subHint}
          </p>
        </div>

        {/* Animated Present Button */}
        <div className="pt-2">
          <button
            onClick={handleClick}
            disabled={hasClicked}
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#FF4F8B] via-[#E91E63] to-[#E63946] px-8 py-4 sm:px-10 sm:py-4.5 text-base sm:text-lg font-medium text-white shadow-[0_0_35px_rgba(255,79,139,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(255,79,139,0.8)] active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FF4F8B]/40"
          >
            {/* Shimmer light sweep */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

            <span className="relative flex items-center gap-2 tracking-wider">
              {birthdayContent.welcome.buttonText}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
