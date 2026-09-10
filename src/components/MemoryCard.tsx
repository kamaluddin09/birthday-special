"use client";

import Image from "next/image";
import { MemoryItem } from "@/data/memories";
import { Calendar, MapPin, Quote } from "lucide-react";

interface MemoryCardProps {
  memory: MemoryItem;
  index: number;
}

export function MemoryCard({ memory, index }: MemoryCardProps) {
  const isEven = index % 2 === 0;

  return (
    <div
      data-memory-card
      className={`relative mb-16 sm:mb-24 flex flex-col items-center gap-8 md:flex-row ${isEven ? "md:flex-row" : "md:flex-row-reverse"
        }`}
    >
      {/* Photo Frame Container */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="group relative w-full max-w-md overflow-hidden rounded-2xl border border-[#FF4F8B]/25 bg-[#250713]/50 p-2 shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-[#FF4F8B]/60 hover:shadow-[0_25px_50px_rgba(255,79,139,0.2)]">
          {/* Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#18030D]">
            <Image
              src={memory.image}
              alt={memory.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle Gradient Vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14030B]/80 via-transparent to-transparent" />
          </div>

          {/* Chapter Badge Overlay */}
          <div className="absolute top-4 left-4 rounded-full bg-[#18030D]/80 px-3 py-1 text-[11px] font-semibold tracking-wider text-[#F9D976] backdrop-blur-md border border-[#F9D976]/30">
            CHAPTER {memory.chapter}
          </div>
        </div>
      </div>

      {/* Memory Text & Details Card */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="glass-card relative w-full max-w-md rounded-2xl p-6 sm:p-8 space-y-4">
          {/* Date & Location Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#FFE4EF]/70 font-medium">
            {/* <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[#FF4F8B]" />
              {memory.date}
            </span> */}
            {memory.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#F9D976]" />
                {memory.location}
              </span>
            )}
          </div>

          {/* Memory Title */}
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white tracking-wide">
            {memory.title}
          </h3>

          {/* Memory Description (Placeholder for user) */}
          <p className="text-sm sm:text-base text-[#FFE4EF]/85 font-light leading-relaxed">
            {memory.description}
          </p>

          {/* Romantic Quote Accent */}
          {memory.quote && (
            <div className="pt-2 border-t border-[#FF4F8B]/15 flex items-center gap-2 text-xs italic text-[#F9D976]/90">
              <Quote className="h-3 w-3 text-[#FF4F8B]" />
              <span>{memory.quote}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
