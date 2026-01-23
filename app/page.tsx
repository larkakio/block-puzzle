"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GameBoard } from "@/components/game/GameBoard";
import { BlockPreview } from "@/components/game/BlockPreview";
import { ScoreDisplay } from "@/components/game/ScoreDisplay";
import { GameControls } from "@/components/game/GameControls";
import { TouchControls } from "@/components/game/TouchControls";
import { GameOverModal } from "@/components/game/GameOverModal";
import { PausedOverlay } from "@/components/game/PausedOverlay";
import { KeyboardHandler } from "@/components/game/KeyboardHandler";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <KeyboardHandler />
      <div className="flex-1 flex flex-col items-center px-2 sm:px-3 py-1.5 overflow-y-auto">
        <ScoreDisplay />
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 my-1.5">
          <GameBoard />
          <div className="hidden sm:block flex-shrink-0">
            <BlockPreview />
          </div>
        </div>
        <div className="sm:hidden w-full max-w-[260px] mx-auto">
          <BlockPreview />
        </div>
        <GameControls />
        <TouchControls />
      </div>
      <Footer />
      <GameOverModal />
      <PausedOverlay />
    </main>
  );
}
