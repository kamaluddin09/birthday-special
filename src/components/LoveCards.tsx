"use client";

import { useState } from "react";
import { loveReasons, LoveReason } from "@/data/loveReasons";
import { birthdayContent } from "@/data/birthdayContent";
import {
  Sparkles,
  Smile,
  HeartHandshake,
  Heart,
  Gift,
  Sun,
  ChevronDown,
} from "lucide-react";

const iconMap = {
  Sparkles,
  Smile,
  HeartHandshake,
  Heart,
  Gift,
  Sun,
};

export function LoveCards() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="reasons"
      className="relative min-h-screen py-24 px-6 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-[#E91E63]/10 blur-3xl -z-10" />

      {/* Header */}
      <div className="mx-auto max-w-2xl text-center space-y-3 mb-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#FF4F8B]/30 bg-[#250713]/80 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#FFE4EF] uppercase backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-[#F9D976]" />
          Chapter Five
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white glow-text-pink">
          {birthdayContent.loveReasons.title}
        </h2>

        <p className="text-base sm:text-lg text-[#FFE4EF]/80 font-light max-w-lg mx-auto">
          {birthdayContent.loveReasons.subtitle}
        </p>
      </div>

      {/* Grid of Interactive Cards */}
      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {loveReasons.map((reason: LoveReason) => {
          const IconComponent = iconMap[reason.iconName] || Heart;
          const isExpanded = expandedId === reason.id;

          return (
            <div
              key={reason.id}
              onClick={() => toggleExpand(reason.id)}
              className="glass-card group relative cursor-pointer rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 select-none"
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && toggleExpand(reason.id)
              }
              aria-expanded={isExpanded}
            >
              <div>
                {/* Card Top: Icon & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF4F8B]/20 to-[#E63946]/20 border border-[#FF4F8B]/30 text-[#FF4F8B] shadow-inner group-hover:scale-110 group-hover:text-white group-hover:bg-[#FF4F8B] transition-all duration-300">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-[#18030D] border border-[#FF4F8B]/20 px-3 py-1 text-[11px] font-medium tracking-wide text-[#F9D976]">
                    {reason.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white group-hover:text-[#FFE4EF] transition-colors mb-3">
                  {reason.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-[#FFE4EF]/75 font-light leading-relaxed mb-4">
                  {reason.summary}
                </p>
              </div>

              {/* Revealable Personal Note */}
              <div className="pt-4 border-t border-[#FF4F8B]/15">
                <div className="flex items-center justify-between text-xs text-[#FF4F8B] font-medium">
                  <span>{isExpanded ? "Hide thought" : "Read secret note"}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isExpanded ? "rotate-180 text-[#F9D976]" : ""
                    }`}
                  />
                </div>

                {isExpanded && (
                  <div className="mt-3 rounded-xl bg-[#14030B]/80 p-3.5 border border-[#F9D976]/30 text-xs sm:text-sm text-[#F9D976] leading-relaxed animate-fade-in font-serif italic">
                    {reason.personalNote}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
