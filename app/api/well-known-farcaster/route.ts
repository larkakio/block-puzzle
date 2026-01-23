import { NextResponse } from "next/server";
import { miniappConfig } from "@/lib/miniapp-config";

export function GET() {
  const manifest = {
    accountAssociation: miniappConfig.accountAssociation,
    miniapp: miniappConfig.miniapp,
  };
  return NextResponse.json(manifest, {
    headers: { "Content-Type": "application/json" },
  });
}
