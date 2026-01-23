"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameState } from "@/hooks/useGameState";
import { useFarcasterSDK } from "@/hooks/useFarcasterSDK";

export function GameOverModal() {
  const { state, stats, setState } = useGameState();
  const { openUrl } = useFarcasterSDK();

  const shareScore = () => {
    const text = `I scored ${stats.score} points in Block Puzzle! Can you beat it?`;
    const url = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`;
    openUrl(url);
  };

  const playAgain = () => {
    setState("idle");
    useGameState.getState().reset();
  };

  if (state !== "game-over") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        onClick={(e) => e.target === e.currentTarget && playAgain()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-surface border border-surface rounded-2xl p-6 max-w-sm w-full shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold text-text-primary mb-1">Game Over</h2>
          <p className="text-text-secondary text-sm mb-4">Final score</p>
          <div className="font-mono text-3xl font-bold text-accent-primary mb-6">{stats.score}</div>
          <div className="grid grid-cols-2 gap-2 mb-6 text-sm">
            <div>
              <span className="text-text-secondary">Level </span>
              <span className="font-mono font-semibold">{stats.level}</span>
            </div>
            <div>
              <span className="text-text-secondary">Lines </span>
              <span className="font-mono font-semibold">{stats.lines}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={shareScore}
              className="min-h-[44px] w-full rounded-xl bg-accent-primary text-white font-semibold"
            >
              Share
            </button>
            <button
              onClick={playAgain}
              className="min-h-[44px] w-full rounded-xl bg-surface border border-surface text-text-primary font-semibold"
            >
              Play Again
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
