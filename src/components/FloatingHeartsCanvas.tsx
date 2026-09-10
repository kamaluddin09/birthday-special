"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface HeartParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  swaySpeed: number;
  swayOffset: number;
  swayAmplitude: number;
  opacity: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

export function FloatingHeartsCanvas({ intensity = "normal" }: { intensity?: "subtle" | "normal" | "dense" }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const colors = [
      "rgba(255, 79, 139, 0.4)",
      "rgba(233, 30, 99, 0.35)",
      "rgba(230, 57, 70, 0.3)",
      "rgba(255, 228, 239, 0.45)",
      "rgba(249, 217, 118, 0.3)",
    ];

    const particleCount =
      window.innerWidth < 768
        ? intensity === "subtle" ? 8 : intensity === "dense" ? 20 : 12
        : intensity === "subtle" ? 15 : intensity === "dense" ? 45 : 24;

    const particles: HeartParticle[] = [];

    function drawHeart(c: CanvasRenderingContext2D, x: number, y: number, size: number, rot: number, color: string, alpha: number) {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      // Top left curve
      c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      // Bottom left curve
      c.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, (size + topCurveHeight) / 1.5, 0, size);
      // Bottom right curve
      c.bezierCurveTo(0, (size + topCurveHeight) / 1.5, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      // Top right curve
      c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      c.closePath();
      c.fill();
      c.restore();
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 12 + 8,
        speedY: Math.random() * 0.6 + 0.3,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        swayAmplitude: Math.random() * 25 + 10,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: (Math.random() - 0.5) * 0.4,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
      });
    }

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.rotation += p.rotationSpeed;
        const currentX = p.x + Math.sin(frame * p.swaySpeed + p.swayOffset) * p.swayAmplitude;

        drawHeart(ctx, currentX, p.y, p.size, p.rotation, p.color, p.opacity);

        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 h-full w-full opacity-65"
    />
  );
}
