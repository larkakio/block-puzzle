"use client";

import { useEffect } from "react";

export function FarcasterReady() {
  useEffect(() => {
    import("@farcaster/miniapp-sdk")
      .then((m) => {
        m.sdk?.actions?.ready?.().catch(() => {});
      })
      .catch(() => {});
  }, []);
  return null;
}
