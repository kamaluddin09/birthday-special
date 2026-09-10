"use client";

import { birthdayContent } from "@/data/birthdayContent";
import { BirthdayCake } from "./BirthdayCake";
import { ChevronDown, Calendar } from "lucide-react";

export function BirthdayHero() {
  const scrollToGallery = () => {
    const el = document.getElementById("gallery");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-between px-4 sm:px-6 pt-16 pb-14 text-center overflow-hidden"
    >
      {/* Cinematic Background Lighting Layers */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] max-w-full rounded-full bg-radial from-[#FF4F8B]/20 via-[#9D174D]/12 to-transparent blur-3xl -z-10" />

      {/* Top Header & Birthday Typography */}
      <div className="space-y-4 pt-4 max-w-3xl mx-auto z-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FF4F8B]/30 bg-[#250713]/80 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#FFE4EF] backdrop-blur-md shadow-lg">
          <Calendar className="h-3.5 w-3.5 text-[#F9D976]" />
          <span>{birthdayContent.hero.date}</span>
        </div>

        <div className="space-y-1">
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-wide text-white drop-shadow-md">
            HAPPY BIRTHDAY
          </h1>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#FF4F8B] glow-text-pink">
            SEEMA <span className="inline-block text-[#E63946] animate-pulse">❤️</span>
          </h2>
        </div>

        <p className="mx-auto max-w-lg text-sm sm:text-base md:text-lg font-light text-[#FFE4EF]/85 leading-relaxed">
          {birthdayContent.hero.subtitle}
        </p>
      </div>

      {/* Visual Centerpiece: Interactive Cake right in focus */}
      <div className="w-full max-w-md mx-auto my-auto py-6 z-10">
        <BirthdayCake
          promptText={birthdayContent.hero.cakePrompt}
          wishMadeText={birthdayContent.hero.wishMadeText}
        />
      </div>

      {/* Scroll Down to 3D Gallery Invitation */}
      <div className="pt-6 animate-bounce z-10">
        <button
          onClick={scrollToGallery}
          className="group flex flex-col items-center gap-2 text-xs font-medium tracking-widest text-[#FFE4EF]/75 transition-colors hover:text-[#FF4F8B] focus:outline-none"
          aria-label="Scroll down to view your 3D photo gallery"
        >
          <span className="flex items-center gap-1.5 uppercase">
            Scroll down to see your 3D Gallery
            <ChevronDown className="h-3.5 w-3.5 text-[#FF4F8B] group-hover:translate-y-1 transition-transform" />
          </span>
        </button>
      </div>
    </section>
  );
}
