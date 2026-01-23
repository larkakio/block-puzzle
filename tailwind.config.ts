import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#1a1625",
        surface: "#2a2435",
        "grid-bg": "#1f1a2e",
        "block-red": "#ff6b6b",
        "block-orange": "#ffa500",
        "block-yellow": "#ffd93d",
        "block-green": "#6bcf7f",
        "block-cyan": "#4ecdc4",
        "block-blue": "#4d9de0",
        "block-purple": "#bb6bd9",
        "block-pink": "#e84393",
        "accent-primary": "#7c3aed",
        "accent-secondary": "#ec4899",
        "text-primary": "#ffffff",
        "text-secondary": "#a0a0a0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
