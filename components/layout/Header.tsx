"use client";

import { useFarcasterSDK } from "@/hooks/useFarcasterSDK";
import Image from "next/image";

export function Header() {
  const { user } = useFarcasterSDK();

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-surface bg-background/95 backdrop-blur">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg flex-shrink-0 bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-lg">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <rect x="2" y="2" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.9" />
            <rect x="7" y="2" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.9" />
            <rect x="12" y="2" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.9" />
            <rect x="2" y="7" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.9" />
            <rect x="7" y="7" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.9" />
            <rect x="12" y="7" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.9" />
            <rect x="2" y="12" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.9" />
            <rect x="7" y="12" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.9" />
            <rect x="12" y="12" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.9" />
          </svg>
        </div>
        <span className="font-semibold text-text-primary truncate">Block Puzzle</span>
      </div>
      {user?.pfpUrl && (
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-surface">
          <Image src={user.pfpUrl} alt="" width={32} height={32} unoptimized />
        </div>
      )}
      {user?.displayName && !user.pfpUrl && (
        <span className="text-sm text-text-secondary truncate max-w-[100px]">{user.displayName}</span>
      )}
    </header>
  );
}
