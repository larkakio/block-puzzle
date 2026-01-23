# Block Puzzle – Mini App for Base & Farcaster

Classic block puzzle (Tetris-style) game as a Mini App for [Base App](https://base.org) and [Farcaster](https://www.farcaster.xyz/).

## Stack

- **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**
- **Framer Motion**, **Zustand**
- **@farcaster/miniapp-sdk**, **OnchainKit** (Base)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Push to GitHub and import the repo in [Vercel](https://vercel.com).
2. Add env var: `NEXT_PUBLIC_APP_URL` = your production URL (e.g. `https://your-app.vercel.app`).
3. Optional: `NEXT_PUBLIC_BASE_APP_ID` from [Base Build](https://base.dev).

## Base & Farcaster setup

### 1. Account association (Base)

1. Deploy to a public URL and turn off Vercel Deployment Protection for the project.
2. Open [Base Build Account association](https://base.org/build) and paste your **App URL**.
3. Click **Verify** and copy the `accountAssociation` object.
4. Paste it into `lib/miniapp-config.ts`:

```ts
accountAssociation: {
  header: "...",
  payload: "...",
  signature: "...",
},
```

### 2. Manifest

- `/.well-known/farcaster.json` is served via rewrite from `/api/well-known-farcaster` and uses `lib/miniapp-config.ts`.
- `minikit.config.ts` re-exports the same config for Base tooling.

### 3. Embed metadata

- `fc:miniapp` and `fc:frame` are set in `app/layout.tsx` from `embedConfig` in `lib/miniapp-config.ts`.
- Icons and hero image: `app/icon.png/route.tsx` and `app/hero-image.png/route.tsx` generate placeholders. For production, replace with:
  - **icon**: 1024×1024 px, PNG, no transparency.
  - **hero/og**: 1200×630 px (1.91:1), PNG or JPG.

### 4. Validation

- **Farcaster embed**: [Embed Validator](https://warpcast.com/~/developers/mini-apps/embed) with your URL.
- **Base**: [base.dev/preview](https://base.dev/preview) with your URL.

## Controls

- **Desktop**: ← → move, ↑ / Space rotate, ↓ soft drop, Shift hard drop, Esc / P pause.
- **Mobile**: on-screen ← → ↩ ↓ ⬇.

## Guidelines

- [Create a Mini App (Base)](https://docs.base.org/mini-apps/quickstart/create-new-miniapp)
- [Featured Checklist (Base)](https://docs.base.org/mini-apps/featured-guidelines/overview)

## License

MIT
