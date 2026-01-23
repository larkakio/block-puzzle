"use client";

import { useEffect } from "react";
import { useGameLogic } from "@/hooks/useGameLogic";

export function KeyboardHandler() {
  const { state, moveLeft, moveRight, rotate, softDrop, hardDrop, pause, resume } = useGameLogic();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (state === "idle" || state === "game-over") return;
      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        if (state === "playing") rotate();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (state === "playing") softDrop();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (state === "playing") moveLeft();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (state === "playing") moveRight();
        return;
      }
      if (e.key === "Shift") {
        e.preventDefault();
        if (state === "playing") hardDrop();
        return;
      }
      if (e.key === "Escape" || e.key === "p" || e.key === "P") {
        e.preventDefault();
        if (state === "playing") pause();
        else if (state === "paused") resume();
        return;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [state, moveLeft, moveRight, rotate, softDrop, hardDrop, pause, resume]);

  return null;
}
