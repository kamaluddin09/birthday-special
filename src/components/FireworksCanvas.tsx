"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
}

const FIREWORK_PALETTE = [
  "#FF4F8B", // Primary Pink
  "#E91E63", // Deep Pink
  "#E63946", // Romantic Red
  "#F9D976", // Soft Gold
  "#FFE4EF", // Soft Pink
  "#FFFFFF", // Sparkle White
];

export function FireworksCanvas({
  isActive = true,
  autoLaunch = true,
}: {
  isActive?: boolean;
  autoLaunch?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const rocketsRef = useRef<Rocket[]>([]);
  const sparksRef = useRef<Spark[]>([]);

  const explode = useCallback((x: number, y: number, color: string) => {
    const particleCount = 45 + Math.floor(Math.random() * 25);
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4;
      const speed = Math.random() * 4.5 + 1.5;
      sparksRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.01,
        color: Math.random() > 0.3 ? color : FIREWORK_PALETTE[Math.floor(Math.random() * FIREWORK_PALETTE.length)],
        size: Math.random() * 2.5 + 1.5,
      });
    }
  }, []);

  const launchRocket = useCallback((startX?: number, targetY?: number) => {
    if (!canvasRef.current) return;
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;

    const x = startX ?? width * 0.15 + Math.random() * (width * 0.7);
    const y = height;
    const destY = targetY ?? height * 0.18 + Math.random() * (height * 0.35);
    const color = FIREWORK_PALETTE[Math.floor(Math.random() * FIREWORK_PALETTE.length)];

    rocketsRef.current.push({
      x,
      y,
      targetY: destY,
      vx: (Math.random() - 0.5) * 1.5,
      vy: -(Math.random() * 3 + 7),
      color,
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initial burst
    launchRocket(width * 0.5, height * 0.25);

    let lastAutoLaunch = 0;

    const render = (time: number) => {
      // Gentle fade trail
      ctx.fillStyle = "rgba(20, 3, 11, 0.2)";
      ctx.fillRect(0, 0, width, height);

      // Auto launch periodically
      if (autoLaunch && time - lastAutoLaunch > 1400) {
        launchRocket();
        lastAutoLaunch = time;
      }

      // Update and draw rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];
        r.x += r.vx;
        r.y += r.vy;

        // Draw glowing rocket head
        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();

        if (r.y <= r.targetY || r.vy >= 0) {
          explode(r.x, r.y, r.color);
          rocketsRef.current.splice(i, 1);
        }
      }

      // Update and draw sparks
      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const s = sparksRef.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.06; // gravity
        s.vx *= 0.98; // air resistance
        s.vy *= 0.98;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparksRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isActive, autoLaunch, prefersReducedMotion, launchRocket, explode]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    launchRocket(clickX, clickY);
  };

  if (prefersReducedMotion || !isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      title="Click anywhere to launch fireworks! 🎆"
      className="absolute inset-0 h-full w-full cursor-pointer"
      style={{ touchAction: "none" }}
    />
  );
}
