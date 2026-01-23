"use client";

import { useGameLogic } from "@/hooks/useGameLogic";

const BTN = "min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl font-semibold text-sm transition active:scale-95";

export function GameControls() {
  const { state, start, pause, resume } = useGameLogic();

  return (
    <div className="flex gap-2 flex-wrap justify-center my-1">
      {state === "idle" && (
        <button
          onClick={start}
          className={`${BTN} bg-accent-primary text-white px-6`}
        >
          Play
        </button>
      )}
      {state === "playing" && (
        <button
          onClick={pause}
          className={`${BTN} bg-surface text-text-primary border border-surface`}
        >
          Pause
        </button>
      )}
      {state === "paused" && (
        <button
          onClick={resume}
          className={`${BTN} bg-accent-primary text-white px-6`}
        >
          Resume
        </button>
      )}
    </div>
  );
}
