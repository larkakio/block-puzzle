"use client";

import { create } from "zustand";
import type { Board } from "@/lib/gameLogic";
import type { GameState, GameStats, TetrominoType } from "@/types/game";
import { TETROMINOS, PREVIEW_COUNT } from "@/lib/constants";
import * as logic from "@/lib/gameLogic";

interface GameStateStore {
  board: Board;
  current: { type: TetrominoType; shape: number[][]; x: number; y: number; color: string } | null;
  queue: TetrominoType[];
  state: GameState;
  stats: GameStats;
  dropInterval: number;
  lastDrop: number;

  setBoard: (b: Board) => void;
  setCurrent: (c: GameStateStore["current"]) => void;
  setQueue: (q: TetrominoType[]) => void;
  setState: (s: GameState) => void;
  setStats: (s: Partial<GameStats> | ((p: GameStats) => Partial<GameStats>)) => void;
  setLastDrop: (t: number) => void;

  spawn: () => boolean;
  reset: () => void;
  mergeAndClear: () => { lines: number };
  move: (dx: number, dy: number) => boolean;
  rotate: () => boolean;
  hardDrop: () => { rows: number };
  tick: () => boolean;
}

const emptyStats: GameStats = {
  score: 0,
  level: 1,
  lines: 0,
  softDrop: 0,
  hardDrop: 0,
};

export const useGameState = create<GameStateStore>((set, get) => ({
  board: logic.createEmptyBoard(),
  current: null,
  queue: logic.createQueue(PREVIEW_COUNT + 1),
  state: "idle",
  stats: { ...emptyStats },
  dropInterval: 800,
  lastDrop: 0,

  setBoard: (b) => set({ board: b }),
  setCurrent: (c) => set({ current: c }),
  setQueue: (q) => set({ queue: q }),
  setState: (s) => set({ state: s }),
  setStats: (up) =>
    set((state) => ({
      stats: typeof up === "function" ? { ...state.stats, ...up(state.stats) } : { ...state.stats, ...up },
    })),
  setLastDrop: (t) => set({ lastDrop: t }),

  spawn: () => {
    const { queue } = get();
    if (queue.length === 0) return false;
    const type = queue[0];
    const t = TETROMINOS[type];
    const shape = t.shape.map((r) => [...r]);
    const pos = logic.getSpawnPosition(shape);
    if (logic.checkCollision(get().board, shape, pos)) {
      set({ state: "game-over" });
      return false;
    }
    const newQueue = [...queue.slice(1), logic.getRandomTetromino()];
    set({
      current: { type, shape, x: pos.x, y: pos.y, color: t.color },
      queue: newQueue,
      lastDrop: Date.now(),
    });
    return true;
  },

  reset: () => {
    set({
      board: logic.createEmptyBoard(),
      current: null,
      queue: logic.createQueue(PREVIEW_COUNT + 1),
      state: "idle",
      stats: { ...emptyStats },
      dropInterval: logic.getDropInterval(1),
      lastDrop: 0,
    });
  },

  mergeAndClear: () => {
    const { current, board } = get();
    if (!current) return { lines: 0 };
    const merged = logic.mergePiece(board, current.shape, { x: current.x, y: current.y }, current.color);
    const { board: cleared, lines } = logic.clearLines(merged);
    set({ board: cleared, current: null });
    return { lines };
  },

  move: (dx, dy) => {
    const { current, board } = get();
    if (!current) return false;
    const pos = { x: current.x + dx, y: current.y + dy };
    if (logic.checkCollision(board, current.shape, pos)) return false;
    set({ current: { ...current, x: pos.x, y: pos.y } });
    return true;
  },

  rotate: () => {
    const { current, board } = get();
    if (!current) return false;
    const rotated = logic.rotateMatrix(current.shape);
    if (logic.checkCollision(board, rotated, { x: current.x, y: current.y })) return false;
    set({ current: { ...current, shape: rotated } });
    return true;
  },

  hardDrop: () => {
    const { current, board } = get();
    if (!current) return { rows: 0 };
    let y = current.y;
    while (!logic.checkCollision(board, current.shape, { x: current.x, y: y + 1 })) y++;
    const rows = y - current.y;
    set({ current: { ...current, y } });
    return { rows };
  },

  tick: () => {
    return get().move(0, 1);
  },
}));
