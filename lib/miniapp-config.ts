const ROOT_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://block-puzzle-alpha.vercel.app";

export const miniappConfig = {
  accountAssociation: {
    header: "",
    payload: "",
    signature: "",
  },
  miniapp: {
    version: "1",
    name: "Block Puzzle",
    subtitle: "Classic block puzzle game",
    description: "Stack, clear lines, and compete. A modern block puzzle with smooth animations and Web3 on Base.",
    screenshotUrls: [
      `${ROOT_URL}/screenshot-1.png`,
      `${ROOT_URL}/screenshot-2.png`,
      `${ROOT_URL}/hero-image.png`,
    ],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/hero-image.png`,
    splashBackgroundColor: "#1a1625",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "games",
    tags: ["puzzle", "arcade", "casual", "blockchain"],
    heroImageUrl: `${ROOT_URL}/hero-image.png`,
    tagline: "Stack, clear, compete",
    ogTitle: "Block Puzzle - Play Now",
    ogDescription: "Classic block puzzle with modern Web3 features on Base",
    ogImageUrl: `${ROOT_URL}/hero-image.png`,
    requiredChains: ["eip155:8453"],
  },
} as const;

export const embedConfig = {
  version: "1",
  imageUrl: `${ROOT_URL}/hero-image.png`,
  button: {
    title: "Play Block Puzzle",
    action: {
      type: "launch_frame" as const,
      name: "Block Puzzle",
      url: `${ROOT_URL}/`,
      splashImageUrl: `${ROOT_URL}/hero-image.png`,
      splashBackgroundColor: "#1a1625",
    },
  },
};

export { ROOT_URL };
