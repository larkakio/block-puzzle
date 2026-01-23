"use client";

import { useCallback, useEffect, useRef } from "react";
import { useGameState } from "./useGameState";
import { LINES_PER_LEVEL, MAX_LEVEL } from "@/lib/constants";
import * as logic from "@/lib/gameLogic";

export function useGameLogic() {
  const {
    state,
    stats,
    spawn,
    mergeAndClear,
    move,
    rotate,
    hardDrop,
    tick,
    setState,
    setStats,
  } = useGameState();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const level = Math.min(MAX_LEVEL, Math.floor(stats.lines / LINES_PER_LEVEL) + 1);
  const intervalMs = logic.getDropInterval(level);

  const start = useCallback(() => {
    useGameState.getState().reset();
    useGameState.getState().spawn();
    setState("playing");
  }, [setState]);

  const pause = useCallback(() => {
    setState("paused");
  }, [setState]);

  const resume = useCallback(() => {
    setState("playing");
  }, [setState]);

  const lock = useCallback(() => {
    const state = useGameState.getState();
    const { stats: s } = state;
    const { lines } = mergeAndClear();
    
    let scoreAdd = 0;
    if (lines > 0) {
      scoreAdd = logic.calculateScore(lines, s.softDrop, s.hardDrop, level);
    } else if (s.softDrop > 0 || s.hardDrop > 0) {
      scoreAdd = (s.softDrop * 1 + s.hardDrop * 2) * level;
    }
    
    const newLines = s.lines + lines;
    const newLevel = Math.min(MAX_LEVEL, Math.floor(newLines / LINES_PER_LEVEL) + 1);
    
    setStats({
      score: s.score + scoreAdd,
      lines: newLines,
      level: newLevel,
      softDrop: 0,
      hardDrop: 0,
    });
    
    const ok = spawn();
    if (!ok && useGameState.getState().state === "game-over") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [mergeAndClear, spawn, setStats, level]);

  const moveLeft = useCallback(() => move(-1, 0), [move]);
  const moveRight = useCallback(() => move(1, 0), [move]);
  const softDrop = useCallback(() => {
    const ok = tick();
    if (ok) setStats((p) => ({ ...p, softDrop: p.softDrop + 1 }));
    return ok;
  }, [tick, setStats]);
  const doHardDrop = useCallback(() => {
    const { rows } = hardDrop();
    setStats((p) => ({ ...p, hardDrop: p.hardDrop + rows }));
    lock();
  }, [hardDrop, setStats, lock]);

  useEffect(() => {
    if (state !== "playing") return;
    intervalRef.current = setInterval(() => {
      const ok = tick();
      if (!ok) lock();
    }, intervalMs);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state, intervalMs, tick, lock]);

  useEffect(() => {
    setStats((p) => ({ ...p, level }));
  }, [level, setStats]);

  return {
    state,
    stats,
    start,
    pause,
    resume,
    moveLeft,
    moveRight,
    rotate,
    softDrop,
    hardDrop: doHardDrop,
    lock,
  };
}
