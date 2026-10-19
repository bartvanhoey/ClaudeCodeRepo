# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is the "Solid" Next.js SaaS template (`solid-nextjs` in `package.json`) — Next.js 16, React 19, TypeScript, Tailwind CSS 4. It is UI-only: there is no backend wired up yet. An Appwrite project is configured via `.env` (`NEXT_PUBLIC_APPWRITE_*`) but the SDK is not yet used anywhere in the code — auth forms (`components/Auth/Signin.tsx`, `Signup.tsx`) are static UI with local form state and no submit handler. See `z-things-to-do.md` for planned work (unit tests, i18n, wiring up Appwrite auth).

## Commands

```bash
npm install --legacy-peer-deps   # required: React 19 causes peer-dep conflicts with some packages
npm run dev                      # start dev server (localhost:3000)
npm run build                    # production build
npm run start                    # run production build
npm run lint                     # next lint
```

There is no test setup in this repo yet.

Formatting uses Prettier with `prettier-plugin-tailwindcss` (`.prettierrc.json`) for automatic Tailwind class sorting.

## Architecture

- **App Router structure**: all routes live under `app/(site)/` (a route group), e.g. `app/(site)/auth/signin`, `app/(site)/blog`, `app/(site)/docs`, `app/(site)/support`. `app/(site)/layout.tsx` sets up fonts/metadata and wraps children in `Provider.tsx`.
- **`app/(site)/Provider.tsx`** is a client component (`"use client"`) that wires up global chrome for every page: `ThemeProvider` (next-themes, light/dark mode via the `class` strategy), `Lines`, `Header`, `ToasterContext` (react-hot-toast), `Footer`, and `ScrollToTop`.
- **`components/`** is organized by feature/section (About, Auth, Blog, Brands, CTA, Common, Contact, Docs, FAQ, Features, FeaturesTab, Footer, FunFact, Header, Hero, Integration, Lines, Pricing, ScrollToTop, Testimonial). Most section components follow the pattern: `index.tsx` (the section itself), a `*Data.tsx` file with a static content array, and a `Single*.tsx` presentational component for repeated items — e.g. `components/Features/index.tsx` + `featuresData.tsx` + `SingleFeature.tsx`.
- **`types/`** holds shared TypeScript interfaces (Blog, Brand, Doc, FAQ, Feature, FeatureTab, Menu, Testimonial) that the `*Data.tsx` files are typed against.
- **Styling**: Tailwind CSS 4, CSS-first config — there is no `tailwind.config.js`; theme tokens (colors, fonts) are defined via `@theme` in `app/globals.css`. Dark mode uses a custom variant (`@custom-variant dark (&:is(.dark *))`) tied to next-themes' `class` attribute strategy, so use `dark:` classes rather than checking theme state in JS.
- **Path alias**: `@/*` maps to the project root (`tsconfig.json`), e.g. `@/components/Header`.
- **Image config**: `next.config.js` allows remote images from `cdn.sanity.io` and `localhost` — Sanity CMS is referenced by the original template but is not wired up in this app.
- **`markdown/docs/`**: MDX content files from the original template; the current `app/(site)/docs/page.tsx` does not read them and renders static placeholder content instead.
