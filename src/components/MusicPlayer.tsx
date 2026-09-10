"use client";

import { Volume2, VolumeX, Music } from "lucide-react";

interface MusicPlayerProps {
  isPlaying: boolean;
  isMuted: boolean;
  isSynthActive?: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

export function MusicPlayer({
  isPlaying,
  isMuted,
  isSynthActive,
  onTogglePlay,
  onToggleMute,
}: MusicPlayerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <div className="glass-pill flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-[#FFE4EF] shadow-lg shadow-black/40 backdrop-blur-md transition-all duration-300 hover:border-[#FF4F8B]/50 hover:bg-[#250713]/80">
        {/* Animated equalizer bars when playing */}
        <button
          onClick={onTogglePlay}
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4F8B]"
          title={isPlaying ? "Pause music" : "Play music"}
          aria-label={isPlaying ? "Pause romantic soundtrack" : "Play romantic soundtrack"}
        >
          <div className="flex h-4 w-4 items-center justify-center">
            {isPlaying && !isMuted ? (
              <span className="flex items-end gap-[2px] h-3">
                <span className="w-[3px] h-full bg-[#FF4F8B] animate-[pulse_0.8s_ease-in-out_infinite] rounded-full" />
                <span className="w-[3px] h-2/3 bg-[#F9D976] animate-[pulse_1.1s_ease-in-out_infinite_0.2s] rounded-full" />
                <span className="w-[3px] h-4/5 bg-[#E63946] animate-[pulse_0.9s_ease-in-out_infinite_0.4s] rounded-full" />
              </span>
            ) : (
              <Music className="h-3.5 w-3.5 text-[#FFE4EF]/70" />
            )}
          </div>
          <span className="hidden sm:inline-block tracking-wide">
            {isPlaying
              ? isSynthActive
                ? "Romantic Chimes"
                : "Melody"
              : "Music Off"}
          </span>
        </button>

        {isPlaying && (
          <button
            onClick={onToggleMute}
            className="ml-1 rounded-full p-1 text-[#FFE4EF]/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF4F8B]"
            title={isMuted ? "Unmute" : "Mute"}
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? (
              <VolumeX className="h-3.5 w-3.5 text-[#FF4F8B]" />
            ) : (
              <Volume2 className="h-3.5 w-3.5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
