"use client";

import { useGameState } from "@/hooks/useGameState";
import { useGameLogic } from "@/hooks/useGameLogic";

export function PausedOverlay() {
  const { state } = useGameState();
  const { resume } = useGameLogic();

  if (state !== "paused") return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={resume}
    >
      <div
        className="bg-surface border border-surface rounded-2xl px-8 py-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-text-secondary text-sm mb-3">Paused</p>
        <button
          onClick={resume}
          className="min-h-[44px] px-6 rounded-xl bg-accent-primary text-white font-semibold"
        >
          Resume
        </button>
      </div>
    </div>
  );
}
