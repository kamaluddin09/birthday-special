"use client";

import { useEffect, useRef } from "react";
import { birthdayContent } from "@/data/birthdayContent";
import { Heart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SuspenseSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const text1Ref = useRef<HTMLParagraphElement | null>(null);
  const text2Ref = useRef<HTMLHeadingElement | null>(null);
  const text3Ref = useRef<HTMLParagraphElement | null>(null);
  const heartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        text1Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
        .fromTo(
          text2Ref.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
          "+=0.3"
        )
        .fromTo(
          text3Ref.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" },
          "+=0.4"
        )
        .fromTo(
          heartRef.current,
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 1.6, ease: "elastic.out(1, 0.6)" },
          "-=0.5"
        );
    }, container);

    return () => ctx.revert();
  }, []);

  const suspense = birthdayContent.suspense;

  return (
    <section
      id="suspense"
      ref={containerRef}
      className="relative min-h-[90vh] py-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#14030B] via-[#090105] to-[#18030D]"
    >
      {/* Deep Emotional Atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-radial from-[#7A1C3C]/10 via-transparent to-transparent blur-3xl -z-10" />

      <div className="mx-auto max-w-3xl space-y-10">
        {/* Line 1: "But..." */}
        <p
          ref={text1Ref}
          className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#FF4F8B]/90 tracking-wide"
        >
          {suspense.line1}
        </p>

        {/* Line 2: "There's one more thing I want you to know." */}
        <h2
          ref={text2Ref}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-snug drop-shadow-lg"
        >
          {suspense.line2}
        </h2>

        {/* Line 3: "You make my world a little brighter just by being in it." */}
        <p
          ref={text3Ref}
          className="text-lg sm:text-2xl md:text-3xl text-[#FFE4EF]/90 font-light max-w-2xl mx-auto leading-relaxed"
        >
          {suspense.line3}
        </p>

        {/* Grand Glowing Heart */}
        <div
          ref={heartRef}
          className="pt-6 flex flex-col items-center justify-center space-y-4"
        >
          <div className="relative group cursor-default">
            {/* Heart Glow Halo */}
            <div className="pointer-events-none absolute -inset-6 rounded-full bg-radial from-[#FF4F8B]/40 to-transparent blur-2xl animate-pulse-glow" />

            <Heart className="relative h-20 w-20 sm:h-28 sm:w-28 text-[#FF4F8B] fill-[#E63946] filter drop-shadow-[0_0_30px_rgba(255,79,139,0.8)] transition-transform duration-500 hover:scale-110" />
          </div>

          <span className="font-serif italic text-sm sm:text-base text-[#F9D976]/80 tracking-widest uppercase">
            {suspense.heartCaption}
          </span>
        </div>
      </div>
    </section>
  );
}
