"use client";

import { useEffect, useState } from "react";

interface User {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
}

interface SDKActions {
  ready: () => Promise<void>;
  openUrl: (url: string) => Promise<void>;
  close?: () => Promise<void>;
}

export function useFarcasterSDK() {
  const [actions, setActions] = useState<SDKActions | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    import("@farcaster/miniapp-sdk")
      .then(async (m) => {
        setActions(m.sdk?.actions ?? null);
        try {
          const ctx = await (m.sdk as { context?: Promise<{ user?: User }> }).context;
          if (ctx?.user) setUser(ctx.user);
        } catch {
          // ignore
        } finally {
          setIsLoading(false);
        }
      })
      .catch(() => setIsLoading(false));
  }, []);

  const openUrl = async (url: string) => {
    try {
      if (actions?.openUrl) {
        await actions.openUrl(url);
      } else {
        window.open(url, "_blank");
      }
    } catch {
      window.open(url, "_blank");
    }
  };

  const close = async () => {
    try {
      if (actions?.close) {
        await actions.close();
      } else {
        window.close();
      }
    } catch {
      window.close();
    }
  };

  return { actions, user, isLoading, openUrl, close };
}
