"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSynthActive, setIsSynthActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  // Generative romantic music box using Web Audio API
  const startRomanticSynth = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Romantic chord notes (F3, A3, C4, E4, G4, A4, C5, E5 frequencies)
      const notes = [
        174.61, 220.0, 261.63, 329.63, 392.0, 440.0, 523.25, 659.25,
        196.0, 246.94, 293.66, 369.99, 440.0, 587.33
      ];

      let noteIndex = 0;
      setIsSynthActive(true);
      setIsPlaying(true);

      const playPluck = () => {
        if (!audioContextRef.current || audioContextRef.current.state === "suspended") return;
        const currentCtx = audioContextRef.current;
        const osc = currentCtx.createOscillator();
        const gainNode = currentCtx.createGain();

        // Warm sine + triangle blend
        osc.type = "sine";
        const freq = notes[noteIndex % notes.length];
        osc.frequency.setValueAtTime(freq, currentCtx.currentTime);

        // Music-box / harp envelope
        const now = currentCtx.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.08, now + 0.04);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

        osc.connect(gainNode);
        gainNode.connect(currentCtx.destination);

        osc.start(now);
        osc.stop(now + 2.6);

        noteIndex = (noteIndex + 1) % notes.length;
      };

      // Play initial note then interval
      playPluck();
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = window.setInterval(playPluck, 650);
    } catch {
      // AudioContext not permitted or supported
    }
  }, []);

  const stopRomanticSynth = useCallback(() => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state === "running") {
      audioContextRef.current.suspend();
    }
    setIsSynthActive(false);
  }, []);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio("/music/leberch-happy-birthday-581704.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    audio.addEventListener("error", () => {
      // If the file doesn't exist or is invalid, fallback smoothly
      audioRef.current = null;
    });

    return () => {
      audio.pause();
      stopRomanticSynth();
    };
  }, [stopRomanticSynth]);

  const startAudio = useCallback(async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        // Fallback to synthesized romantic bells
        startRomanticSynth();
      }
    } else {
      startRomanticSynth();
    }
  }, [startRomanticSynth]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopRomanticSynth();
      setIsPlaying(false);
    } else {
      startAudio();
    }
  }, [isPlaying, startAudio, stopRomanticSynth]);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    if (audioContextRef.current) {
      if (!isMuted) {
        audioContextRef.current.suspend();
      } else {
        audioContextRef.current.resume();
      }
    }
    setIsMuted(!isMuted);
  }, [isMuted]);

  return {
    isPlaying,
    isMuted,
    isSynthActive,
    startAudio,
    togglePlay,
    toggleMute,
  };
}
