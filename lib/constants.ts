import type { Tetromino, ScoringRules, TetrominoType } from "@/types/game";

export const COLS = 10;
export const ROWS = 20;
export const PREVIEW_COUNT = 3;

export const SCORING: ScoringRules = {
  singleLine: 100,
  doubleLine: 300,
  tripleLine: 500,
  tetris: 800,
  softDrop: 1,
  hardDrop: 2,
};

export const INITIAL_DROP_MS = 800;
export const MIN_DROP_MS = 100;
export const DROP_DECREMENT_MS = 50;
export const LINES_PER_LEVEL = 10;
export const MAX_LEVEL = 15;

export const LEVEL_MULTIPLIER = 1.5;

export const TETROMINOS: Record<string, Tetromino> = {
  I: {
    shape: [[1, 1, 1, 1]],
    type: "I",
    color: "#4ecdc4",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    type: "O",
    color: "#ffd93d",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    type: "T",
    color: "#bb6bd9",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    type: "S",
    color: "#6bcf7f",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    type: "Z",
    color: "#ff6b6b",
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    type: "J",
    color: "#4d9de0",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    type: "L",
    color: "#ffa500",
  },
};

export const TETROMINO_KEYS: TetrominoType[] = Object.keys(TETROMINOS) as TetrominoType[];
