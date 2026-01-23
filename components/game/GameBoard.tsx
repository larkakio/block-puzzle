"use client";

import { useState, useEffect } from "react";
import { useGameState } from "@/hooks/useGameState";
import { COLS, ROWS } from "@/lib/constants";

const BORDER = 3;

function getColor(
  board: (string | null)[][],
  current: { shape: number[][]; x: number; y: number; color: string } | null,
  r: number,
  c: number
): string | null {
  if (current) {
    for (let sr = 0; sr < current.shape.length; sr++) {
      for (let sc = 0; sc < current.shape[sr].length; sc++) {
        if (!current.shape[sr][sc]) continue;
        const ny = current.y + sr;
        const nx = current.x + sc;
        if (ny < 0 || ny >= ROWS || nx < 0 || nx >= COLS) continue;
        if (ny === r && nx === c) return current.color;
      }
    }
  }
  return board[r][c];
}

export function GameBoard() {
  const { board, current } = useGameState();

  const [cellSize, setCellSize] = useState(16);
  useEffect(() => {
    const calc = () => {
      const w = Math.min(window.innerWidth, 500) - 24;
      const h = window.innerHeight - 480;
      const byWidth = Math.floor(w / COLS);
      const byHeight = Math.floor(h / ROWS);
      const size = Math.max(12, Math.min(22, Math.min(byWidth, byHeight)));
      setCellSize(size);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const GAP = 1;
  const gridW = COLS * cellSize + (COLS - 1) * GAP;
  const gridH = ROWS * cellSize + (ROWS - 1) * GAP;

  return (
    <div
      className="flex-shrink-0 rounded-lg overflow-hidden"
      style={{
        width: gridW + 2 * BORDER,
        height: gridH + 2 * BORDER,
        boxSizing: "border-box",
        border: `${BORDER}px solid rgba(124,58,237,0.6)`,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
        backgroundColor: "#1f1a2e",
        padding: `${BORDER}px`,
      }}
    >
      <div
        className="grid"
        style={{
          width: gridW,
          height: gridH,
          gap: `${GAP}px`,
          gridTemplateColumns: `repeat(${COLS}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${cellSize}px)`,
        }}
      >
        {Array.from({ length: ROWS * COLS }, (_, i) => {
          const r = Math.floor(i / COLS);
          const col = i % COLS;
          const color = getColor(board, current, r, col);
          return (
            <div
              key={`cell-${r}-${col}`}
              className="rounded-[1px]"
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: color || "rgba(42,36,53,0.6)",
                border: color 
                  ? "1px solid rgba(0,0,0,0.2)" 
                  : "1px solid rgba(255,255,255,0.12)",
                boxSizing: "border-box",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
