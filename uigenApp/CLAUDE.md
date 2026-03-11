# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run setup       # First-time setup: install deps + Prisma generate + migrate
npm run dev         # Start dev server with Turbopack at http://localhost:3000
npm run build       # Production build
npm run lint        # ESLint
npm run test        # Vitest (run all tests)
npm run db:reset    # Reset database (destructive)
```

To run a single test file:
```bash
npx vitest run src/path/to/file.test.tsx
```

## Environment

Copy `.env` and add `ANTHROPIC_API_KEY`. Without a key the app runs with a mock provider that returns static components instead of AI-generated ones.

The `node-compat.cjs` shim is required by all `npm run` scripts (injected via `NODE_OPTIONS`). Do not remove it from scripts.

## Architecture

UIGen is a Next.js 15 App Router app where users describe React components in a chat interface and see them rendered live.

### Core Data Flow

1. User types in `ChatInterface` → POST to `/api/chat`
2. Server calls Claude (or mock) via Vercel AI SDK with tool use enabled
3. AI uses two tools to build a virtual file system:
   - `str_replace_editor` (`src/lib/tools/str-replace.ts`) — create/edit files
   - `file_manager` (`src/lib/tools/file-manager.ts`) — list/read/delete files
4. File changes stream back and update `FileSystemContext` (`src/lib/contexts/file-system-context.tsx`)
5. `PreviewFrame` (`src/components/preview/PreviewFrame.tsx`) renders the virtual FS in a sandboxed iframe:
   - Compiles JSX via Babel standalone (`src/lib/transform/jsx-transformer.ts`)
   - Creates blob URL import maps at runtime — no files are written to disk

### Key Abstractions

- **Virtual File System** (`src/lib/file-system.ts`): In-memory tree of files shared between the chat tool calls and the preview iframe. State lives in `FileSystemContext`.
- **AI Provider** (`src/lib/provider.ts`): Wraps `@ai-sdk/anthropic`. Falls back to `MockLanguageModel` when `ANTHROPIC_API_KEY` is absent.
- **System Prompt** (`src/lib/prompts/generation.tsx`): Instructs the model how to generate React components using the available tools.
- **Auth** (`src/lib/auth.ts`): JWT cookies via `jose`. Middleware at `src/middleware.ts` protects routes. Anonymous users can use the app; registered users get project persistence via Prisma/SQLite.

## Coding Conventions

Use comments sparingly — only for genuinely complex logic that isn't self-explanatory.

### Path Alias

`@/*` maps to `src/*` (configured in `tsconfig.json`).

### Database

Prisma with SQLite. Schema is defined in `prisma/schema.prisma` — reference it to understand stored data structures. Server Actions in `src/actions/` handle all DB reads/writes.

### Testing

Tests use Vitest + React Testing Library with jsdom. Test files live alongside source files (`*.test.tsx`). The config is in `vitest.config.mts`.
