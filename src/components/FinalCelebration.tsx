"use client";

import { useEffect, useRef } from "react";
import { birthdayContent } from "@/data/birthdayContent";
import { triggerGrandFinaleConfetti } from "@/lib/confetti";
import { FireworksCanvas } from "./FireworksCanvas";
import { Heart, Sparkles, Calendar, RotateCcw } from "lucide-react";

export function FinalCelebration() {
  const hasTriggeredRef = useRef(false);
  const final = birthdayContent.final;

  useEffect(() => {
    // When section enters view, trigger fireworks/confetti
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          triggerGrandFinaleConfetti();
        }
      },
      { threshold: 0.25 }
    );

    const el = document.getElementById("final");
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const handleCelebrateClick = () => {
    triggerGrandFinaleConfetti();
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="final"
      className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#18030D] via-[#35071C] to-[#120209]"
    >
      {/* Interactive Fireworks Canvas Layer */}
      <FireworksCanvas isActive={true} autoLaunch={true} />

      {/* Romantic Ambient Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-[#14030B]/40 to-[#14030B]/90 -z-10" />

      {/* Climax Content Box */}
      <div className="relative z-20 mx-auto max-w-3xl space-y-8 animate-fade-in pointer-events-auto">
        {/* Date & Subtitle Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FF4F8B]/40 bg-[#250713]/85 px-5 py-2 text-xs font-semibold tracking-widest text-[#FFE4EF] backdrop-blur-md shadow-xl">
          <Calendar className="h-3.5 w-3.5 text-[#F9D976]" />
          <span>{final.date}</span>
        </div>

        {/* Grand Headline */}
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white glow-text-pink leading-tight">
          {final.headline}
        </h2>

        {/* Dedication */}
        <p className="font-serif text-xl sm:text-2xl md:text-3xl font-medium text-[#F9D976] glow-text-gold max-w-2xl mx-auto">
          {final.subheading}
        </p>

        {/* Main Closing Message */}
        <div className="glass-panel mx-auto max-w-2xl rounded-2xl p-6 sm:p-10 space-y-6">
          <p className="text-base sm:text-lg md:text-xl text-[#FFE4EF] font-light leading-relaxed">
            {final.closingMessage}
          </p>

          {/* User's Personal Closing Note Placeholder */}
          <div className="rounded-xl border border-[#FF4F8B]/25 bg-[#14030B]/60 p-4 text-sm sm:text-base text-[#F9D976] font-serif italic">
            {final.personalClosingNote}
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={handleCelebrateClick}
            className="glow-button group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FF4F8B]/40"
          >
            <Sparkles className="h-4 w-4 text-[#F9D976] group-hover:rotate-180 transition-transform duration-500" />
            <span>{final.replayCelebrationButton}</span>
          </button>

          <button
            onClick={handleBackToTop}
            className="inline-flex items-center gap-2 rounded-full border border-[#FFE4EF]/25 bg-[#250713]/70 px-6 py-3.5 text-sm sm:text-base font-medium text-[#FFE4EF] backdrop-blur-md transition-all duration-300 hover:border-[#FF4F8B] hover:text-white hover:bg-[#FF4F8B]/20"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Back to Beginning</span>
          </button>
        </div>

        {/* Final Beating Heart Symbol */}
        <div className="pt-8 flex flex-col items-center justify-center">
          <div className="relative group cursor-pointer" onClick={handleCelebrateClick}>
            <div className="pointer-events-none absolute -inset-4 rounded-full bg-radial from-[#FF4F8B]/40 to-transparent blur-xl animate-pulse-glow" />
            <Heart className="relative h-16 w-16 text-[#FF4F8B] fill-[#E91E63] filter drop-shadow-[0_0_20px_#FF4F8B] transition-transform duration-300 hover:scale-125 active:scale-95" />
          </div>
          <span className="mt-3 text-xs tracking-widest text-[#FFE4EF]/60 uppercase font-light">
            Made with all my love • 2026
          </span>
        </div>
      </div>
    </section>
  );
}
