"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseMicrophoneBlowOptions {
  onBlowOut: () => void;
  enabled?: boolean;
}

function checkMicSupported(): boolean {
  if (typeof window === "undefined") return true;
  return Boolean(navigator.mediaDevices?.getUserMedia);
}

export function useMicrophoneBlow({ onBlowOut, enabled = true }: UseMicrophoneBlowOptions) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported] = useState(checkMicSupported);
  const [permissionState, setPermissionState] = useState<"prompt" | "granted" | "denied">("prompt");
  const [blowProgress, setBlowProgress] = useState(0); // 0 to 100
  const [micVolume, setMicVolume] = useState(0); // 0 to 1 for visualizer

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const consecutiveBlowFrames = useRef(0);
  const onBlowOutRef = useRef(onBlowOut);

  useEffect(() => {
    onBlowOutRef.current = onBlowOut;
  }, [onBlowOut]);

  const cleanupAudio = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    consecutiveBlowFrames.current = 0;
  }, []);

  const stopListening = useCallback(() => {
    cleanupAudio();
    setIsListening(false);
    setBlowProgress(0);
    setMicVolume(0);
  }, [cleanupAudio]);

  const startListening = useCallback(async () => {
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      streamRef.current = stream;
      setPermissionState("granted");

      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      if (audioCtx.state === "suspended") {
        await audioCtx.resume();
      }

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.2;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsListening(true);
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkBlow = () => {
        if (!analyserRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArray);

        // Breath / blow creates heavy low-frequency wind turbulence (bins ~2 to ~16, ~40Hz - ~350Hz)
        let lowFreqSum = 0;
        const lowBins = Math.min(16, bufferLength);
        for (let i = 2; i < lowBins; i++) {
          lowFreqSum += dataArray[i];
        }
        const lowFreqAvg = lowFreqSum / (lowBins - 2); // 0 - 255

        // Calculate overall average
        let totalSum = 0;
        for (let i = 0; i < bufferLength; i++) {
          totalSum += dataArray[i];
        }
        const overallAvg = totalSum / bufferLength;

        // Normalized current volume for visualizer
        const normalizedVol = Math.min(1, lowFreqAvg / 140);
        setMicVolume(normalizedVol);

        // Blow detection criteria:
        // Strong low-frequency energy (> 52 out of 255) with significant low-frequency prominence
        const isBlowingNow = lowFreqAvg > 52 && (lowFreqAvg > overallAvg * 1.1 || lowFreqAvg > 70);

        if (isBlowingNow) {
          consecutiveBlowFrames.current += 1;
        } else {
          consecutiveBlowFrames.current = Math.max(0, consecutiveBlowFrames.current - 1.5);
        }

        // Required frames: ~10 frames at 60fps is ~170ms of sustained blowing
        const targetFrames = 10;
        const progress = Math.min(100, (consecutiveBlowFrames.current / targetFrames) * 100);
        setBlowProgress(progress);

        if (consecutiveBlowFrames.current >= targetFrames) {
          // Trigger successful blow-out!
          stopListening();
          onBlowOutRef.current();
          return;
        }

        animFrameRef.current = requestAnimationFrame(checkBlow);
      };

      animFrameRef.current = requestAnimationFrame(checkBlow);
    } catch {
      setPermissionState("denied");
      setIsListening(false);
    }
  }, [stopListening]);

  // Clean up on unmount or when disabled
  useEffect(() => {
    return () => {
      cleanupAudio();
    };
  }, [cleanupAudio, enabled]);

  return {
    isListening,
    isSupported,
    permissionState,
    blowProgress,
    micVolume,
    startListening,
    stopListening,
  };
}
