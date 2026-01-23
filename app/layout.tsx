import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { embedConfig, ROOT_URL } from "@/lib/miniapp-config";
import { FarcasterReady } from "@/components/FarcasterReady";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Block Puzzle - Mini App",
  description: "Classic block puzzle game on Base. Stack, clear lines, and compete.",
  metadataBase: new URL(ROOT_URL),
  other: {
    "theme-color": "#1a1625",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "fc:miniapp": JSON.stringify(embedConfig),
    "fc:frame": JSON.stringify(embedConfig),
    ...(process.env.NEXT_PUBLIC_BASE_APP_ID
      ? { "base:app_id": process.env.NEXT_PUBLIC_BASE_APP_ID }
      : {}),
  },
  openGraph: {
    title: "Block Puzzle",
    description: "Classic block puzzle game on Base",
    images: [`${ROOT_URL}/hero-image.png`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}>
        <FarcasterReady />
        {children}
      </body>
    </html>
  );
}
