"use client";

import { useState, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAudio } from "@/hooks/useAudio";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { BirthdayHero } from "@/components/BirthdayHero";
import { PhotoGallerySection } from "@/components/PhotoGallerySection";
import { RelationshipTicker } from "@/components/RelationshipTicker";
import { MemoryTimeline } from "@/components/MemoryTimeline";
import { LoveLetter } from "@/components/LoveLetter";
import { LoveCards } from "@/components/LoveCards";
import { SuspenseSection } from "@/components/SuspenseSection";
import { FinalCelebration } from "@/components/FinalCelebration";
import { FloatingHeartsCanvas } from "@/components/FloatingHeartsCanvas";
import { MusicPlayer } from "@/components/MusicPlayer";
import { StoryProgress } from "@/components/StoryProgress";
import { CustomCursor } from "@/components/CustomCursor";

export default function BirthdayPage() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const {
    isPlaying,
    isMuted,
    isSynthActive,
    startAudio,
    togglePlay,
    toggleMute,
  } = useAudio();

  // Initialize Lenis Smooth Momentum Scrolling integrated with GSAP ScrollTrigger
  useEffect(() => {
    if (!isRevealed) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger positions once the DOM layout settles
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 400);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, [isRevealed]);

  const handleOpenSurprise = () => {
    setIsOpening(true);
    // Start audio on user gesture
    startAudio();

    // Cinematic transition timeout
    setTimeout(() => {
      setIsRevealed(true);
    }, 800);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#14030B] text-[#FFF8F5] overflow-x-hidden">
      {/* Desktop Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Persistent Floating Hearts Background Atmosphere */}
      <FloatingHeartsCanvas intensity="normal" />

      {/* Scene 01: Secret Welcome Screen */}
      {!isRevealed && (
        <WelcomeScreen onOpen={handleOpenSurprise} isOpening={isOpening} />
      )}

      {/* Main Website Experience (Revealed after opening) */}
      <div
        className={`transition-opacity duration-1000 ${
          isRevealed ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Story Chapter Navigation */}
        <StoryProgress isRevealed={isRevealed} />

        {/* Ambient Music Player Toggle */}
        <MusicPlayer
          isPlaying={isPlaying}
          isMuted={isMuted}
          isSynthActive={isSynthActive}
          onTogglePlay={togglePlay}
          onToggleMute={toggleMute}
        />

        {/* Scene 02: Birthday Celebration Hero & Interactive Cake */}
        <BirthdayHero />

        {/* 3D Cylindrical Photo Gallery */}
        <PhotoGallerySection />

        {/* Live Relationship Counter Ticker */}
        <RelationshipTicker />

        {/* Scene 03: Our Story / Memories Parallax Timeline */}
        <MemoryTimeline />

        {/* Scene 04: The Interactive Love Letter */}
        <LoveLetter />

        {/* Scene 05: Things I Love About You Cards */}
        <LoveCards />

        {/* Scene 06: Emotional Suspense Section */}
        <SuspenseSection />

        {/* Scene 07: Final Celebration & Fireworks Climax */}
        <FinalCelebration />
      </div>
    </main>
  );
}
