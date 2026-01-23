import {
  COLS,
  ROWS,
  TETROMINOS,
  TETROMINO_KEYS,
  SCORING,
  LINES_PER_LEVEL,
  LEVEL_MULTIPLIER,
} from "./constants";
import type { TetrominoType, Position } from "@/types/game";

export type Board = (string | null)[][];

export function createEmptyBoard(): Board {
  return Array(ROWS)
    .fill(null)
    .map(() => Array(COLS).fill(null));
}

export function getRandomTetromino(): TetrominoType {
  return TETROMINO_KEYS[Math.floor(Math.random() * TETROMINO_KEYS.length)];
}

export function rotateMatrix(matrix: number[][]): number[][] {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotated: number[][] = [];
  for (let c = 0; c < cols; c++) {
    rotated[c] = [];
    for (let r = rows - 1; r >= 0; r--) {
      rotated[c].push(matrix[r][c]);
    }
  }
  return rotated;
}

export function getSpawnPosition(shape: number[][]): Position {
  const cols = shape[0].length;
  return { x: Math.floor((COLS - cols) / 2), y: 0 };
}

export function checkCollision(
  board: Board,
  shape: number[][],
  pos: Position
): boolean {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const ny = pos.y + r;
      const nx = pos.x + c;
      if (nx < 0 || nx >= COLS) return true;
      if (ny >= ROWS) return true;
      if (ny >= 0 && board[ny][nx]) return true;
    }
  }
  return false;
}

export function mergePiece(
  board: Board,
  shape: number[][],
  pos: Position,
  color: string
): Board {
  const next = board.map((row) => [...row]);
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const ny = pos.y + r;
      const nx = pos.x + c;
      if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) continue;
      next[ny][nx] = color;
    }
  }
  return next;
}

export function clearLines(board: Board): { board: Board; lines: number } {
  let lines = 0;
  const next: Board = [];
  for (let r = ROWS - 1; r >= 0; r--) {
    const full = board[r].every((c) => c !== null);
    if (full) {
      lines++;
    } else {
      next.unshift([...board[r]]);
    }
  }
  while (next.length < ROWS) {
    next.unshift(Array(COLS).fill(null));
  }
  return { board: next, lines };
}

export function calculateScore(
  lines: number,
  softDrop: number,
  hardDrop: number,
  level: number
): number {
  let base = 0;
  if (lines === 1) base = SCORING.singleLine;
  else if (lines === 2) base = SCORING.doubleLine;
  else if (lines === 3) base = SCORING.tripleLine;
  else if (lines >= 4) base = SCORING.tetris;
  const drop = softDrop * SCORING.softDrop + hardDrop * SCORING.hardDrop;
  const mult = 1 + (level - 1) * (LEVEL_MULTIPLIER - 1);
  return Math.floor((base + drop) * mult);
}

export function getDropInterval(level: number): number {
  const ms = 800 - (level - 1) * 50;
  return Math.max(100, ms);
}

export function createQueue(count: number): TetrominoType[] {
  const q: TetrominoType[] = [];
  while (q.length < count) {
    q.push(getRandomTetromino());
  }
  return q;
}

export { TETROMINOS };
