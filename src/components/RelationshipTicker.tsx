"use client";

import { useEffect, useState } from "react";
import { triggerRomanticConfetti } from "@/lib/confetti";
import { Heart, Sparkles, CalendarHeart } from "lucide-react";

interface TimeUnits {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
}

const PROPOSAL_DATE = new Date("2021-09-11T00:00:00");

function calculateTimeSince(startDate: Date): TimeUnits {
  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - startDate.getTime());

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  // Exact calendar year calculation
  let years = now.getFullYear() - startDate.getFullYear();
  const anniversaryThisYear = new Date(
    now.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
    startDate.getHours(),
    startDate.getMinutes(),
    startDate.getSeconds()
  );

  let days = 0;
  if (now >= anniversaryThisYear) {
    const msSinceAnniversary = now.getTime() - anniversaryThisYear.getTime();
    days = Math.floor(msSinceAnniversary / (1000 * 60 * 60 * 24));
  } else {
    years -= 1;
    const lastAnniversary = new Date(
      now.getFullYear() - 1,
      startDate.getMonth(),
      startDate.getDate(),
      startDate.getHours(),
      startDate.getMinutes(),
      startDate.getSeconds()
    );
    const msSinceLastAnniversary = now.getTime() - lastAnniversary.getTime();
    days = Math.floor(msSinceLastAnniversary / (1000 * 60 * 60 * 24));
  }

  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  return {
    years,
    days,
    hours,
    minutes,
    seconds,
    totalDays,
  };
}

export function RelationshipTicker() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<TimeUnits>(() => calculateTimeSince(PROPOSAL_DATE));
  const [hasHeartBeated, setHasHeartBeated] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(calculateTimeSince(PROPOSAL_DATE));
      setHasHeartBeated((prev) => !prev);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSendLove = () => {
    triggerRomanticConfetti();
  };

  const timeCards = [
    { label: "Years", value: time.years, highlight: "Milestone" },
    { label: "Days", value: time.days, highlight: "Sunrises" },
    { label: "Hours", value: time.hours, highlight: "Moments" },
    { label: "Minutes", value: time.minutes, highlight: "Memories" },
    { label: "Seconds", value: time.seconds, highlight: "Heartbeats" },
  ];

  return (
    <section
      id="ticker"
      className="relative py-20 px-4 sm:px-6 overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* Ambient Romantic Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] max-w-full rounded-full bg-radial from-[#FF4F8B]/18 via-[#9D174D]/10 to-transparent blur-3xl -z-10" />

      <div className="mx-auto max-w-4xl w-full space-y-8">
        {/* Top Header Badge */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF4F8B]/40 bg-[#250713]/85 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#FFE4EF] backdrop-blur-md shadow-lg">
            <CalendarHeart className="h-3.5 w-3.5 text-[#F9D976]" />
            <span>PROPOSED ON YOUR BIRTHDAY • 11 SEPTEMBER 2021</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white glow-text-pink">
            DAYS WE&apos;VE LOVED EACH OTHER
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#FFE4EF]/80 font-light max-w-xl mx-auto leading-relaxed">
            Ever since the day I asked you to be mine on your birthday, every single second has been the best chapter of my life.
          </p>
        </div>

        {/* Live Running Counter Grid */}
        <div suppressHydrationWarning className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 max-w-3xl mx-auto">
          {timeCards.map((card, idx) => (
            <div
              key={card.label}
              className={`glass-card relative overflow-hidden rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center border transition-all duration-300 ${
                idx === 4
                  ? "border-[#FF4F8B]/50 bg-gradient-to-b from-[#350A1E]/80 to-[#18030D]/90 shadow-[0_0_25px_rgba(255,79,139,0.3)] col-span-2 sm:col-span-1"
                  : "border-white/15 hover:border-[#FF4F8B]/40"
              }`}
            >
              {/* Top micro label */}
              <span className="text-[10px] sm:text-[11px] font-medium tracking-widest text-[#F9D976] uppercase mb-1">
                {card.highlight}
              </span>

              {/* Number */}
              <div className="flex items-center gap-1 my-1">
                <span
                  suppressHydrationWarning
                  className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
                >
                  {card.label === "Seconds" || card.label === "Minutes" || card.label === "Hours"
                    ? String(card.value).padStart(2, "0")
                    : card.value}
                </span>

                {card.label === "Seconds" && (
                  <Heart
                    className={`h-4 w-4 text-[#FF4F8B] fill-[#FF4F8B] transition-transform duration-300 ${
                      hasHeartBeated ? "scale-125" : "scale-90"
                    }`}
                  />
                )}
              </div>

              {/* Unit label */}
              <span className="text-xs sm:text-sm font-medium tracking-wider text-[#FFE4EF]/75">
                {card.label}
              </span>
            </div>
          ))}
        </div>

        {/* Milestone Callout Box */}
        <div className="glass-panel mx-auto max-w-xl rounded-2xl p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-[#F9D976] uppercase">
            <Sparkles className="h-4 w-4" />
            <span suppressHydrationWarning>
              Over {time.totalDays.toLocaleString()} Total Days of Unconditional Love
            </span>
            <Sparkles className="h-4 w-4" />
          </div>

          <p className="text-xs sm:text-sm text-[#FFE4EF]/85 font-serif italic">
            &ldquo;From that unforgettable proposal on September 11, 2021 to today, my heart beats for you more with every passing second.&rdquo;
          </p>

          <div className="pt-2">
            <button
              onClick={handleSendLove}
              className="group inline-flex items-center gap-2 rounded-full border border-[#FF4F8B]/40 bg-[#FF4F8B]/15 px-5 py-2 text-xs font-semibold tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:bg-[#FF4F8B] hover:shadow-[0_0_25px_rgba(255,79,139,0.6)] hover:scale-105 active:scale-95"
            >
              <Heart className="h-3.5 w-3.5 text-[#FF4F8B] group-hover:text-white group-hover:fill-white transition-colors" />
              <span>Send Heartbeats ❤️</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
