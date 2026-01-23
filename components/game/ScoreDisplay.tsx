"use client";

import { useGameState } from "@/hooks/useGameState";

export function ScoreDisplay() {
  const { stats } = useGameState();

  return (
    <div className="grid grid-cols-3 gap-1.5 mb-1">
      <div className="bg-surface/80 rounded-lg px-2.5 py-1.5 border border-surface text-center">
        <div className="text-[10px] uppercase tracking-wider text-text-secondary">Score</div>
        <div className="font-mono font-bold text-accent-primary tabular-nums text-sm">{stats.score}</div>
      </div>
      <div className="bg-surface/80 rounded-lg px-2.5 py-1.5 border border-surface text-center">
        <div className="text-[10px] uppercase tracking-wider text-text-secondary">Level</div>
        <div className="font-mono font-bold text-accent-secondary tabular-nums text-sm">{stats.level}</div>
      </div>
      <div className="bg-surface/80 rounded-lg px-2.5 py-1.5 border border-surface text-center">
        <div className="text-[10px] uppercase tracking-wider text-text-secondary">Lines</div>
        <div className="font-mono font-bold text-block-green tabular-nums text-sm">{stats.lines}</div>
      </div>
    </div>
  );
}
