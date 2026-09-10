"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { galleryPhotos, GalleryPhoto } from "@/data/galleryPhotos";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { PhotoLightbox } from "./PhotoLightbox";
import { Heart, Sparkles, ZoomIn } from "lucide-react";

export function PhotoGallery3D() {
  const [rotation, setRotation] = useState(0);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [radius, setRadius] = useState(440);
  const [cardSize, setCardSize] = useState({ width: 165, height: 225 });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const hasMovedRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const autoRotateTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const mouseInfluenceRef = useRef(0);

  const prefersReducedMotion = usePrefersReducedMotion();

  // Responsive radius & card size calculation with generous spacing
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      const count = galleryPhotos.length;
      if (w < 480) {
        // Mobile screens: compact card with airy spacing
        const cardW = 105;
        const cardH = 145;
        const dynamicR = Math.round((count * cardW * 1.32) / (2 * Math.PI));
        setRadius(Math.max(220, dynamicR));
        setCardSize({ width: cardW, height: cardH });
      } else if (w < 768) {
        // Small tablets / large phones
        const cardW = 125;
        const cardH = 170;
        const dynamicR = Math.round((count * cardW * 1.35) / (2 * Math.PI));
        setRadius(Math.max(280, dynamicR));
        setCardSize({ width: cardW, height: cardH });
      } else if (w < 1024) {
        // Tablets / small laptops
        const cardW = 145;
        const cardH = 200;
        const dynamicR = Math.round((count * cardW * 1.38) / (2 * Math.PI));
        setRadius(Math.max(350, dynamicR));
        setCardSize({ width: cardW, height: cardH });
      } else {
        // Desktop: elegant, shorter, perfectly proportioned cards with clean gaps
        const cardW = 165;
        const cardH = 225;
        const dynamicR = Math.round((count * cardW * 1.42) / (2 * Math.PI));
        setRadius(Math.max(430, dynamicR));
        setCardSize({ width: cardW, height: cardH });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Sync ref with state
  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  // Organic Breathing Rotation & Physics loop
  useEffect(() => {
    if (prefersReducedMotion) return;

    let lastTimestamp = performance.now();

    const loop = (currentTimestamp: number) => {
      const delta = (currentTimestamp - lastTimestamp) / 1000;
      lastTimestamp = currentTimestamp;

      // Pause rotation while viewing a photo in lightbox
      if (selectedPhotoIndex !== null) {
        animationFrameRef.current = requestAnimationFrame(loop);
        return;
      }

      if (!isDraggingRef.current) {
        // Apply inertia decay if user recently dragged
        if (Math.abs(velocityRef.current) > 0.05) {
          rotationRef.current += velocityRef.current;
          velocityRef.current *= 0.94; // friction
        } else {
          // Organic Breathing Auto-Rotation
          autoRotateTimeRef.current += delta;
          const t = autoRotateTimeRef.current;

          // Breathing cycle of ~10 seconds per wave
          const cycleSpeed = 0.65;
          const wave = Math.sin(t * cycleSpeed);
          const breathingFactor = Math.pow((wave + 1) / 2, 2.2);

          // Base turning speed
          const currentSpeed = 0.12 + breathingFactor * 0.45;
          const mouseOffset = mouseInfluenceRef.current * 0.08;

          rotationRef.current += currentSpeed + mouseOffset;
        }

        // Keep rotation normalized within 0..360
        const normalized = ((rotationRef.current % 360) + 360) % 360;
        setRotation(normalized);
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [prefersReducedMotion, selectedPhotoIndex]);

  // Pointer / Touch / Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;

    // Capture pointer
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const relativeX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        mouseInfluenceRef.current = Math.max(-1, Math.min(1, relativeX));
      }
      return;
    }

    const currentX = e.clientX;
    const currentY = e.clientY;
    const diffX = Math.abs(currentX - startXRef.current);
    const diffY = Math.abs(currentY - startYRef.current);

    // If moved more than 7px, mark as drag instead of click
    if (diffX > 7 || diffY > 7) {
      hasMovedRef.current = true;
    }

    const currentTime = performance.now();
    const deltaX = currentX - lastXRef.current;
    const deltaTime = Math.max(1, currentTime - lastTimeRef.current);

    // Calculate rotation sensitivity
    const sensitivity = window.innerWidth < 640 ? 0.45 : 0.35;
    const angleDelta = deltaX * sensitivity;

    rotationRef.current += angleDelta;
    setRotation(((rotationRef.current % 360) + 360) % 360);

    // Track velocity for smooth inertia throw
    velocityRef.current = (angleDelta / deltaTime) * 16;

    lastXRef.current = currentX;
    lastTimeRef.current = currentTime;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const handleMouseLeave = () => {
    mouseInfluenceRef.current = 0;
  };

  const handleCardClick = (idx: number) => {
    // Only open lightbox if user didn't drag the cylinder
    if (!hasMovedRef.current) {
      setSelectedPhotoIndex(idx);
    }
  };

  const angleStep = 360 / galleryPhotos.length;

  return (
    <>
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseLeave={handleMouseLeave}
        className="relative mx-auto flex flex-col items-center justify-center select-none cursor-grab active:cursor-grabbing touch-pan-y"
        style={{
          perspective: "1200px",
          height: `${cardSize.height + 170}px`,
          width: "100%",
          maxWidth: "1100px",
        }}
      >
        {/* Dark Reflective Stage Floor with Radial Ambient Light */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 h-44 w-[90%] max-w-[950px] rounded-full bg-radial from-[#FF4F8B]/20 via-[#35071C]/15 to-transparent blur-2xl" />

        {/* 3D Cylinder Container */}
        <div
          className="relative flex items-center justify-center transition-transform mt-6 sm:mt-8"
          style={{
            transformStyle: "preserve-3d",
            width: `${cardSize.width}px`,
            height: `${cardSize.height}px`,
          }}
        >
          {galleryPhotos.map((photo: GalleryPhoto, idx: number) => {
            const cardAngle = (idx * angleStep + rotation) % 360;
            const rad = (cardAngle * Math.PI) / 180;
            const cosVal = Math.cos(rad);
            const frontness = Math.max(0, (cosVal + 1) / 2);

            const scale = 0.78 + frontness * 0.38;
            const opacity = 0.32 + frontness * 0.68;
            const brightness = 0.45 + frontness * 0.65;
            const blurAmount = Math.max(0, (1 - frontness) * 3.5);
            const isFront = frontness > 0.88;

            return (
              <div
                key={photo.id}
                onClick={() => handleCardClick(idx)}
                className="absolute left-0 top-0 transition-shadow duration-300 cursor-pointer"
                style={{
                  width: `${cardSize.width}px`,
                  height: `${cardSize.height}px`,
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px) scale(${scale})`,
                  zIndex: Math.round(frontness * 100),
                  opacity,
                  filter: `blur(${blurAmount}px) brightness(${brightness})`,
                }}
              >
                {/* Photo Frame Card */}
                <div
                  className={`group/card relative h-full w-full overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isFront
                      ? "border-[#FF4F8B] shadow-[0_0_35px_rgba(255,79,139,0.7),0_20px_40px_rgba(0,0,0,0.9)] ring-2 ring-[#F9D976]/50"
                      : "border-white/15 shadow-[0_15px_30px_rgba(0,0,0,0.8)] hover:border-white/40"
                  }`}
                  style={{
                    backgroundColor: "#18030D",
                    WebkitBoxReflect:
                      "below 6px linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.45) 85%)",
                  }}
                >
                  {/* Image */}
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 130px, (max-width: 1024px) 185px, 215px"
                    priority={idx < 3}
                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />

                  {/* Subtle vignette overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14030B]/70 via-transparent to-transparent" />

                  {/* Hover Zoom Icon Overlay */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 bg-black/30 backdrop-blur-[2px]">
                    <div className="flex items-center gap-1.5 rounded-full bg-[#18030D]/85 border border-[#FF4F8B]/50 px-3 py-1 text-xs font-medium text-white shadow-lg">
                      <ZoomIn className="h-3.5 w-3.5 text-[#F9D976]" />
                      <span>View Polaroid</span>
                    </div>
                  </div>

                  {/* Front card bottom caption */}
                  {isFront && (
                    <div className="absolute bottom-2.5 left-0 right-0 px-2 text-center pointer-events-none">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#18030D]/85 border border-[#FF4F8B]/40 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-[#FFE4EF] backdrop-blur-md">
                        <Heart className="h-2.5 w-2.5 text-[#FF4F8B] fill-[#FF4F8B]" />
                        {photo.caption}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Drag & Click Hint */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-light tracking-widest text-[#FFE4EF]/60 uppercase">
          <Sparkles className="h-3 w-3 text-[#F9D976]" />
          <span>Drag to rotate • Click any photo to view Polaroid</span>
          <Sparkles className="h-3 w-3 text-[#F9D976]" />
        </div>
      </div>

      {/* Interactive Polaroid Modal */}
      {selectedPhotoIndex !== null && (
        <PhotoLightbox
          photo={galleryPhotos[selectedPhotoIndex]}
          currentIndex={selectedPhotoIndex}
          totalPhotos={galleryPhotos.length}
          onClose={() => setSelectedPhotoIndex(null)}
          onNext={() =>
            setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % galleryPhotos.length : 0))
          }
          onPrev={() =>
            setSelectedPhotoIndex((prev) =>
              prev !== null ? (prev - 1 + galleryPhotos.length) % galleryPhotos.length : 0
            )
          }
        />
      )}
    </>
  );
}
