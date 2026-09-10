"use client";

import { useState, useCallback } from "react";
import { triggerCandleBlowConfetti } from "@/lib/confetti";
import { useMicrophoneBlow } from "@/hooks/useMicrophoneBlow";
import { Sparkles, RefreshCw, Mic, MicOff, Wind } from "lucide-react";

interface BirthdayCakeProps {
  promptText: string;
  wishMadeText: string;
}

export function BirthdayCake({ promptText, wishMadeText }: BirthdayCakeProps) {
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);

  const handleBlowOut = useCallback(() => {
    if (isBlownOut) return;
    setShowSmoke(true);
    setIsBlownOut(true);
    triggerCandleBlowConfetti();

    // Mobile haptic vibration if supported
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([100, 50, 200]);
      } catch {
        // Ignore vibration errors
      }
    }

    setTimeout(() => {
      setShowSmoke(false);
    }, 2200);
  }, [isBlownOut]);

  const {
    isListening,
    isSupported,
    permissionState,
    blowProgress,
    micVolume,
    startListening,
    stopListening,
  } = useMicrophoneBlow({
    onBlowOut: handleBlowOut,
    enabled: !isBlownOut,
  });

  const handleRelight = () => {
    setIsBlownOut(false);
    setShowSmoke(false);
  };

  // Flame dynamic distortion when blowing
  const flameFlutterScale = isListening ? 1 - (blowProgress / 100) * 0.45 : 1;
  const flameTilt = isListening ? (micVolume > 0.2 ? -6 : 0) : 0;

  return (
    <div className="relative mx-auto flex flex-col items-center justify-center pt-6 pb-2">
      {/* Interactive Birthday Cake Container */}
      <div
        onClick={!isBlownOut ? handleBlowOut : undefined}
        className={`group relative cursor-pointer select-none transition-transform duration-300 ${
          !isBlownOut ? "hover:scale-105 active:scale-95" : ""
        }`}
        title={
          !isBlownOut
            ? isListening
              ? "Blow into your mic or click the cake to blow out candles!"
              : "Click or use microphone to blow out the candles!"
            : "Candles blown out"
        }
      >
        {/* Ambient Candle Glow behind cake */}
        {!isBlownOut && (
          <div
            className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 h-36 w-36 rounded-full bg-[#F9D976]/30 blur-2xl transition-all duration-300"
            style={{
              opacity: isListening ? Math.max(0.3, 1 - blowProgress / 100) : 0.8,
              transform: `translate(-50%, 0) scale(${isListening ? Math.max(0.6, 1 - blowProgress / 140) : 1})`,
            }}
          />
        )}

        {/* SVG Cake Vector */}
        <svg
          width="260"
          height="220"
          viewBox="0 0 260 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_15px_30px_rgba(37,7,19,0.8)]"
        >
          <defs>
            <linearGradient id="cakePlateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF5EB" />
              <stop offset="100%" stopColor="#E5A93C" />
            </linearGradient>

            <linearGradient id="cakeBottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF7597" />
              <stop offset="100%" stopColor="#C2185B" />
            </linearGradient>

            <linearGradient id="cakeTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFE4EF" />
              <stop offset="100%" stopColor="#FF8EAA" />
            </linearGradient>

            <linearGradient id="frostingCreamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FFF0F5" />
            </linearGradient>

            <linearGradient id="candleGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFE4EF" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FF4F8B" />
            </linearGradient>

            <radialGradient id="flameGrad" cx="50%" cy="80%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#FFF275" />
              <stop offset="70%" stopColor="#FF6B35" />
              <stop offset="100%" stopColor="#E63946" stopOpacity="0.8" />
            </radialGradient>
          </defs>

          {/* Cake Stand / Plate */}
          <ellipse cx="130" cy="205" rx="100" ry="12" fill="url(#cakePlateGrad)" opacity="0.95" />
          <ellipse cx="130" cy="205" rx="90" ry="8" fill="#FFF8F5" opacity="0.4" />

          {/* Bottom Cake Tier */}
          <rect x="50" y="140" width="160" height="60" rx="8" fill="url(#cakeBottomGrad)" />
          {/* Frosting drips on bottom tier */}
          <path
            d="M50,140 Q60,158 70,140 Q80,165 90,140 Q100,160 110,140 Q120,166 130,140 Q140,162 150,140 Q160,166 170,140 Q180,160 190,140 Q200,158 210,140 L210,145 L50,145 Z"
            fill="url(#frostingCreamGrad)"
          />
          {/* Decorative pearls on bottom tier */}
          <circle cx="75" cy="180" r="3.5" fill="#FFF8F5" opacity="0.8" />
          <circle cx="105" cy="180" r="3.5" fill="#FFF8F5" opacity="0.8" />
          <circle cx="130" cy="180" r="4" fill="#F9D976" />
          <circle cx="155" cy="180" r="3.5" fill="#FFF8F5" opacity="0.8" />
          <circle cx="185" cy="180" r="3.5" fill="#FFF8F5" opacity="0.8" />

          {/* Top Cake Tier */}
          <rect x="75" y="95" width="110" height="45" rx="6" fill="url(#cakeTopGrad)" />
          {/* Frosting drips on top tier */}
          <path
            d="M75,95 Q86,112 97,95 Q108,118 119,95 Q130,114 141,95 Q152,118 163,95 Q174,112 185,95 L185,100 L75,100 Z"
            fill="url(#frostingCreamGrad)"
          />

          {/* 3 Birthday Candles */}
          {/* Left Candle */}
          <rect x="95" y="65" width="6" height="30" rx="2" fill="url(#candleGrad1)" />
          <line x1="98" y1="65" x2="98" y2="58" stroke="#333333" strokeWidth="1.5" />

          {/* Center Candle (Taller) */}
          <rect x="127" y="55" width="6" height="40" rx="2" fill="url(#candleGrad1)" />
          <line x1="130" y1="55" x2="130" y2="47" stroke="#333333" strokeWidth="1.5" />

          {/* Right Candle */}
          <rect x="159" y="65" width="6" height="30" rx="2" fill="url(#candleGrad1)" />
          <line x1="162" y1="65" x2="162" y2="58" stroke="#333333" strokeWidth="1.5" />

          {/* Candle Flames (Shown when not blown out) */}
          {!isBlownOut && (
            <g
              className={isListening ? "" : "animate-flame"}
              style={{
                transformOrigin: "130px 65px",
                transform: `scale(${flameFlutterScale}) rotate(${flameTilt}deg)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              {/* Left Flame */}
              <ellipse cx="98" cy="50" rx="5" ry="9" fill="url(#flameGrad)" />
              <circle cx="98" cy="51" r="2.5" fill="#FFFFFF" opacity="0.9" />

              {/* Center Flame */}
              <ellipse cx="130" cy="38" rx="6.5" ry="11" fill="url(#flameGrad)" />
              <circle cx="130" cy="40" r="3" fill="#FFFFFF" opacity="0.9" />

              {/* Right Flame */}
              <ellipse cx="162" cy="50" rx="5" ry="9" fill="url(#flameGrad)" />
              <circle cx="162" cy="51" r="2.5" fill="#FFFFFF" opacity="0.9" />
            </g>
          )}

          {/* Smoke Puffs (Shown briefly after blowing out) */}
          {showSmoke && (
            <g className="animate-fade-out transition-all duration-1000">
              <circle cx="98" cy="45" r="4" fill="#FFFFFF" opacity="0.6" className="animate-ping" />
              <circle cx="130" cy="32" r="5" fill="#FFFFFF" opacity="0.7" className="animate-ping" />
              <circle cx="162" cy="45" r="4" fill="#FFFFFF" opacity="0.6" className="animate-ping" />
            </g>
          )}
        </svg>
      </div>

      {/* Interaction Controls & Status */}
      <div className="mt-4 flex flex-col items-center gap-3 text-center">
        {!isBlownOut ? (
          <>
            {/* Primary Action Button */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {/* Microphone Toggle Button (if supported and not denied) */}
              {isSupported && permissionState !== "denied" && (
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 backdrop-blur-md shadow-md ${
                    isListening
                      ? "border border-[#FF4F8B] bg-[#FF4F8B]/25 text-white ring-2 ring-[#FF4F8B]/40 animate-pulse"
                      : "border border-[#F9D976]/40 bg-[#250713]/80 text-[#FFE4EF] hover:border-[#F9D976] hover:bg-[#F9D976]/15 hover:scale-105"
                  }`}
                  title={isListening ? "Stop microphone" : "Blow directly into your mic"}
                >
                  {isListening ? (
                    <>
                      <Wind className="h-4 w-4 text-[#F9D976] animate-bounce" />
                      <span>Listening... Blow now! 💨</span>
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 text-[#F9D976]" />
                      <span>Blow with Mic 🎙️</span>
                    </>
                  )}
                </button>
              )}

              {/* Click to Blow Out Button */}
              <button
                onClick={handleBlowOut}
                className="group inline-flex items-center gap-2 rounded-full border border-[#FF4F8B]/40 bg-[#250713]/70 px-4 py-2 text-xs sm:text-sm font-medium text-[#FFE4EF] backdrop-blur-md transition-all duration-300 hover:border-[#FF4F8B] hover:bg-[#FF4F8B]/20 hover:scale-105"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#F9D976] group-hover:rotate-45 transition-transform" />
                <span>{promptText}</span>
              </button>
            </div>

            {/* Real-time Breath Progress Meter (when listening) */}
            {isListening && (
              <div className="w-64 max-w-full space-y-1.5 animate-fade-in pt-1">
                <div className="flex items-center justify-between text-[11px] text-[#FFE4EF]/80 font-light">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    Mic Active
                  </span>
                  <span>{Math.round(blowProgress)}% blow power</span>
                </div>
                {/* Meter Bar */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#18030D] border border-[#FF4F8B]/30 p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#F9D976] via-[#FF4F8B] to-[#E63946] transition-all duration-100 ease-out"
                    style={{ width: `${blowProgress}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#FFE4EF]/60 italic">
                  Blow gently into your microphone to extinguish the candles
                </p>
              </div>
            )}

            {permissionState === "denied" && (
              <p className="text-[11px] text-[#FFE4EF]/60 flex items-center gap-1">
                <MicOff className="h-3 w-3 text-[#FF4F8B]" />
                Mic access was blocked — you can click the cake or button above to blow!
              </p>
            )}
          </>
        ) : (
          <div className="space-y-2 animate-fade-in">
            <p className="font-serif text-lg sm:text-xl font-medium text-[#F9D976] glow-text-gold">
              {wishMadeText}
            </p>
            <button
              onClick={handleRelight}
              className="inline-flex items-center gap-1.5 text-xs text-[#FFE4EF]/60 hover:text-[#FFE4EF] transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Relight the candles</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
