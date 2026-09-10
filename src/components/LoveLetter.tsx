"use client";

import { useState } from "react";
import { birthdayContent } from "@/data/birthdayContent";
import { Heart, Sparkles, MailOpen, Mail } from "lucide-react";

export function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const letter = birthdayContent.loveLetter;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section
      id="letter"
      className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#14030B] via-[#210512] to-[#14030B]"
    >
      {/* Emotional Deep Burgundy Atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-radial from-[#9D174D]/15 via-transparent to-transparent blur-3xl -z-10" />

      {/* Header */}
      <div className="mx-auto max-w-2xl text-center space-y-3 mb-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#FF4F8B]/30 bg-[#250713]/80 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#FFE4EF] uppercase backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-[#F9D976]" />
          Chapter Four
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white glow-text-pink">
          {letter.sectionTitle}
        </h2>

        <p className="text-sm sm:text-base text-[#FFE4EF]/80 font-light">
          {isOpen
            ? "From the bottom of my heart..."
            : letter.envelopeInstruction}
        </p>
      </div>

      {/* Envelope & Letter Container */}
      <div className="relative w-full max-w-2xl flex flex-col items-center">
        {/* The Folded Envelope (Interactive) */}
        {!isOpen ? (
          <div
            onClick={handleToggle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleToggle()}
            className="group relative cursor-pointer select-none transition-all duration-500 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FF4F8B]/40"
            title="Click to open the love letter"
          >
            {/* Ambient Envelope Glow */}
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#FF4F8B]/30 to-[#F9D976]/30 opacity-70 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

            {/* Envelope Body */}
            <div className="relative flex flex-col items-center justify-center rounded-2xl border border-[#FF4F8B]/40 bg-gradient-to-b from-[#350A1E] to-[#1C0510] p-8 sm:p-12 text-center shadow-[0_25px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl w-72 sm:w-96">
              {/* Envelope Flap Accent */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#9D174D] to-[#FF4F8B] shadow-lg shadow-[#FF4F8B]/30 group-hover:scale-110 transition-transform duration-300">
                <Mail className="h-8 w-8 text-white animate-pulse" />
              </div>

              {/* Label */}
              <span className="font-serif text-lg sm:text-xl font-medium text-[#FFF8F5] tracking-wide">
                {letter.envelopeLabel}
              </span>

              {/* Wax Seal */}
              <div className="mt-6 flex items-center justify-center">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#E5A93C] via-[#F9D976] to-[#C7821B] shadow-[0_4px_15px_rgba(249,217,118,0.5)] border border-[#FFF5EB]/60 transition-transform duration-300 group-hover:scale-110">
                  <Heart className="h-6 w-6 text-[#7A1C3C] fill-[#7A1C3C]" />
                </div>
              </div>

              <span className="mt-4 text-xs font-medium tracking-wider text-[#F9D976] uppercase">
                {letter.envelopeInstruction}
              </span>
            </div>
          </div>
        ) : (
          /* Unfolded Parchment Letter */
          <div className="relative w-full parchment-paper rounded-2xl p-8 sm:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.9)] transition-all duration-700 animate-fade-in border border-[#E5A93C]/30">
            {/* Elegant Header Accent */}
            <div className="flex items-center justify-between border-b border-[#250713]/15 pb-4 mb-6">
              <span className="flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#9D174D] uppercase">
                <Heart className="h-3.5 w-3.5 fill-[#9D174D]" />
                Personal Letter
              </span>
              <button
                onClick={handleToggle}
                className="flex items-center gap-1 text-xs font-medium text-[#7A1C3C] hover:text-[#FF4F8B] transition-colors"
                title="Fold letter back into envelope"
              >
                <MailOpen className="h-3.5 w-3.5" />
                <span>Fold back</span>
              </button>
            </div>

            {/* Salutation */}
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#250713] mb-6">
              {letter.greeting}
            </h3>

            {/* Letter Body Paragraphs */}
            <div className="space-y-5 text-base sm:text-lg font-normal text-[#380E21] leading-relaxed font-serif">
              {letter.paragraphs.map((p, idx) => (
                <p key={idx} className="first-letter:text-2xl first-letter:font-bold">
                  {p}
                </p>
              ))}
            </div>

            {/* Sign-off */}
            <div className="mt-10 pt-6 border-t border-[#250713]/15 flex flex-col items-end text-right">
              <span className="font-serif italic text-[#7A1C3C] text-sm sm:text-base">
                {letter.signOff}
              </span>
              <span className="font-serif font-bold text-[#250713] text-lg sm:text-xl tracking-wide mt-1">
                {letter.senderName}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
