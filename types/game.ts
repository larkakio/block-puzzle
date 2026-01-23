export type GameState = "idle" | "playing" | "paused" | "game-over" | "victory";

export type TetrominoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

export interface Position {
  x: number;
  y: number;
}

export interface Tetromino {
  shape: number[][];
  type: TetrominoType;
  color: string;
}

export interface GameStats {
  score: number;
  level: number;
  lines: number;
  softDrop: number;
  hardDrop: number;
}

export interface ScoringRules {
  singleLine: number;
  doubleLine: number;
  tripleLine: number;
  tetris: number;
  softDrop: number;
  hardDrop: number;
}
