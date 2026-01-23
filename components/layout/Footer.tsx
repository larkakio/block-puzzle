"use client";

import { useFarcasterSDK } from "@/hooks/useFarcasterSDK";

export function Footer() {
  const { openUrl } = useFarcasterSDK();

  return (
    <footer className="px-4 py-2 border-t border-surface flex justify-center gap-4 text-xs text-text-secondary flex-shrink-0">
      <a
        href="https://docs.base.org/mini-apps"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-accent-primary transition"
        onClick={(e) => {
          e.preventDefault();
          openUrl("https://docs.base.org/mini-apps");
        }}
      >
        Base Mini Apps
      </a>
      <a
        href="https://miniapps.farcaster.xyz"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-accent-primary transition"
        onClick={(e) => {
          e.preventDefault();
          openUrl("https://miniapps.farcaster.xyz");
        }}
      >
        Farcaster
      </a>
    </footer>
  );
}
