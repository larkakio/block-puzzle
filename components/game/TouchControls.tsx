"use client";

import { useGameLogic } from "@/hooks/useGameLogic";

const BTN = "min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl bg-surface border border-surface text-text-primary text-xl font-bold active:scale-95 transition select-none";

export function TouchControls() {
  const { state, moveLeft, moveRight, rotate, softDrop, hardDrop } = useGameLogic();
  const active = state === "playing";

  return (
    <div className="flex flex-col gap-1.5 mt-2 pb-2">
      <div className="flex justify-center gap-3">
        <button
          type="button"
          aria-label="Move left"
          disabled={!active}
          onClick={moveLeft}
          className={`${BTN} ${!active ? "opacity-50" : ""}`}
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Rotate"
          disabled={!active}
          onClick={rotate}
          className={`${BTN} ${!active ? "opacity-50" : ""}`}
        >
          ↩
        </button>
        <button
          type="button"
          aria-label="Move right"
          disabled={!active}
          onClick={moveRight}
          className={`${BTN} ${!active ? "opacity-50" : ""}`}
        >
          →
        </button>
      </div>
      <div className="flex justify-center gap-3">
        <button
          type="button"
          aria-label="Soft drop"
          disabled={!active}
          onClick={softDrop}
          className={`${BTN} flex-1 max-w-[110px] ${!active ? "opacity-50" : ""}`}
        >
          ↓
        </button>
        <button
          type="button"
          aria-label="Hard drop"
          disabled={!active}
          onClick={hardDrop}
          className={`${BTN} flex-1 max-w-[110px] ${!active ? "opacity-50" : ""}`}
        >
          ⬇
        </button>
      </div>
    </div>
  );
}
