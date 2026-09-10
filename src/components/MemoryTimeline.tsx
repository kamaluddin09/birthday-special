"use client";

import { useEffect, useRef } from "react";
import { memories } from "@/data/memories";
import { birthdayContent } from "@/data/birthdayContent";
import { MemoryCard } from "./MemoryCard";
import { Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MemoryTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll("[data-memory-card]");

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 30%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 overflow-hidden"
    >
      {/* Background Parallax Lighting */}
      <div className="pointer-events-none absolute top-1/3 -left-48 h-[600px] w-[600px] rounded-full bg-[#E91E63]/10 blur-3xl -z-10" />
      <div className="pointer-events-none absolute bottom-1/4 -right-48 h-[600px] w-[600px] rounded-full bg-[#FF4F8B]/10 blur-3xl -z-10" />

      {/* Section Header */}
      <div className="mx-auto max-w-2xl text-center space-y-3 mb-16 sm:mb-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#FF4F8B]/30 bg-[#250713]/80 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#FFE4EF] uppercase backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-[#F9D976]" />
          Chapter Three
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white glow-text-pink">
          {birthdayContent.timeline.title}
        </h2>

        <p className="text-base sm:text-lg text-[#FFE4EF]/80 font-light max-w-lg mx-auto">
          {birthdayContent.timeline.subtitle}
        </p>
      </div>

      {/* Timeline Content Stream */}
      <div className="relative mx-auto max-w-5xl">
        {/* Glowing Center Line (Visible on md+ screens) */}
        <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-[#FF4F8B]/40 to-transparent hidden md:block -z-10" />

        {/* List of Memories */}
        <div className="space-y-4">
          {memories.map((item, idx) => (
            <MemoryCard key={item.id} memory={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
