# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This repo serves two purposes:
1. A reference/notes repo for Claude Code usage (README.md, images/)
2. A Next.js web app (`ibuiltthis-app`) — a community platform for creators to showcase apps, AI tools, and SaaS products

## Commands

```bash
npm run dev          # Start Next.js dev server
npm run build        # Production build
npm run lint         # ESLint
npm test             # Jest tests
npm run test:watch   # Jest in watch mode
npm run test:coverage
```

## Architecture

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Drizzle ORM, Neon (serverless Postgres), Clerk (auth)

**App Router structure (`app/`):**
- `layout.tsx` — root layout with ClerkProvider, Header, Footer, Outfit font
- `page.tsx` — landing page
- `products/` — product listing and `[id]/` detail pages
- `about/` — about page
- `preview/` — component preview pages (card, icon, modal)

**Components (`components/`):**
- `ui/` — base UI primitives (Button, Card, Badge, Icon, Modal, Avatar) with co-located `.test.tsx` files
- `common/` — shared layout components (Header, Footer, SectionHeader, EmptyState)
- `landing-page/` — page-specific sections (HeroSection, FeaturedProducts, RecentlyLaunchedProducts, StatsCard)
- `products/` — ProductCard

**Database (`db/`):**
- `schema.ts` — Drizzle schema: `products` table with status workflow (pending → approved/rejected), Clerk user/org IDs
- `index.ts` — Neon HTTP client via `DATABASE_URL` env var
- `seed.ts` — seed script; `data.ts` — seed data

**Key env var:** `DATABASE_URL` (Neon connection string)

## Linting

Markdown is linted with `markdownlint`. Active rules (via `.markdownlint.json`): MD013, MD033, MD041 disabled; all other defaults enabled.
