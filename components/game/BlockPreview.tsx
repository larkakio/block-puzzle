"use client";

import { useGameState } from "@/hooks/useGameState";
import { TETROMINOS } from "@/lib/gameLogic";
import { PREVIEW_COUNT } from "@/lib/constants";

const BOX = 10;

function MiniBlock({ shape, color }: { shape: number[][]; color: string }) {
  return (
    <div
      className="inline-grid gap-px"
      style={{
        gridTemplateColumns: `repeat(${shape[0]?.length ?? 4}, ${BOX}px)`,
        gridTemplateRows: `repeat(${shape.length}, ${BOX}px)`,
      }}
    >
      {shape.flatMap((row, r) =>
        row.map((v, c) =>
          v ? (
            <div
              key={`${r}-${c}`}
              className="rounded-[1px]"
              style={{ width: BOX - 1, height: BOX - 1, backgroundColor: color }}
            />
          ) : (
            <div key={`${r}-${c}`} />
          )
        )
      )}
    </div>
  );
}

export function BlockPreview() {
  const { queue } = useGameState();
  const next = queue.slice(0, PREVIEW_COUNT);

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-medium text-text-secondary uppercase tracking-wider">Next</span>
      <div className="flex flex-col gap-1.5 bg-surface/80 rounded-lg p-1.5 border border-surface">
        {next.map((type, i) => {
          const t = TETROMINOS[type];
          if (!t) return null;
          return <MiniBlock key={`${type}-${i}`} shape={t.shape} color={t.color} />;
        })}
      </div>
    </div>
  );
}
