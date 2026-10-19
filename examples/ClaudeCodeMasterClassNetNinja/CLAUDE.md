# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pocket Heist is a heist/mission management application built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4. This is a starter project for the Claude Code Masterclass.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Run all tests
npm run test

# Run tests in watch mode
vitest

# Run a specific test file
vitest tests/components/Navbar.test.tsx
```

## Architecture

### Route Groups Pattern

The app uses Next.js App Router with **route groups** to separate public and protected pages:

- **`app/(public)/`** - Unauthenticated pages (splash, login, signup, preview)
  - No navbar rendered
  - Uses `center-content` layout wrapper
  - Pages: `/`, `/login`, `/signup`, `/preview`

- **`app/(dashboard)/`** - Protected pages with navigation
  - Includes `Navbar` component in layout
  - Pages: `/heists`, `/heists/create`, `/heists/[id]`

Route groups use parentheses `(groupname)` which are excluded from the URL path but allow for different layouts.

### Component Organization

Components live in `/components` with this structure:

```bash
components/
  ComponentName/
    ComponentName.tsx          # Component implementation
    ComponentName.module.css   # CSS Module (if needed)
    index.ts                   # Barrel export
```

Import components using barrel exports: `import { Navbar } from '@/components/Navbar'`

### Styling Approach

- **Tailwind CSS 4** for utility classes (configured in `postcss.config.mjs`)
- **CSS Modules** for component-scoped styles (e.g., `Navbar.module.css`)
- Global styles and custom Tailwind utilities in `app/globals.css`
- Custom color palette defined with CSS variables (primary: purple, secondary: pink)
- Utility classes: `.page-content`, `.center-content`, `.form-title`, `.public`

### Testing

- **Framework**: Vitest with jsdom environment
- **Libraries**: React Testing Library, jest-dom matchers
- **Config**: `vitest.config.mts` with React plugin and TypeScript path support
- Tests located in `/tests` directory, mirroring component structure

## Current State

This is a starter/skeleton project:

- No state management library configured yet
- No backend or API routes (`app/api/`) implemented
- Pages render placeholder UI
- Ready for adding data fetching, authentication, and business logic

## Additional Coding Preferences

### GENERAL RULES

- Do use semicolons for JavaScript/TypeScript files
- Use double quotes for strings
- Do NOT apply tailwind classes directly in component templates unless essential or just 1 at most. If an element needs more than a single tailwind class, combine them into a custom class using the `@apply` directive.
- Use minimal project dependencies to keep the codebase clean and focused on core concepts.
- Use the `git switch -c` command to switch to new branches, not `git checkout -b`.
- Follow the existing file and folder naming conventions (PascalCase for components, kebab-case for files)
- Use the existing color palette and design system for any new UI elements.
- Write tests for any new components or features added to the project, following the existing testing patterns.
- Always prefer clarity over cleverness.
- Do not introduce new libraries unless explicitly requested.
- Do not refactor unrelated code.
- Do not change public APIs unless instructed.
- If requirements are ambiguous, ask a clarifying question before coding.
- Reference the globals.css file when creating new CSS Modules to maintain design consistency.
- When in doubt, follow the existing code style and patterns used in the project.

### NEXT.JS CONVENTIONS

- Use the App Router (`/app` directory), never the Pages Router.
- Assume React Server Components by default.
- Only use `"use client"` when:
  - The component uses browser-only APIs
  - The component uses state, effects, or event handlers
- Keep client components as small and shallow as possible.

### FILE & FOLDER STRUCTURE

- Page routes live in `/app/**/page.tsx`
- Layouts live in `/app/**/layout.tsx`
- Route handlers live in `/app/api/**/route.ts`
- Reusable UI components live in `/components`
- Domain logic lives in `/lib` (no React imports allowed there)
- Types live in `/types`

Never place business logic directly inside:

- page.tsx
- layout.tsx
- route.ts

### TYPESCRIPT RULES

- Use strict TypeScript.
- Never use `any`.
- Prefer explicit return types for exported functions.
- Prefer `type` over `interface` unless extension is required.
- Use discriminated unions for state modeling.

### DATA FETCHING

- Server Components:
  - Use async/await directly.
  - Prefer `fetch` with Next.js caching options.
- Client Components:
  - Do NOT fetch directly unless explicitly requested.
  - Receive data via props from Server Components.
- Never fetch data inside `useEffect` unless unavoidable.

### ERROR HANDLING

- Handle expected errors explicitly.
- Use `notFound()` for missing resources.
- Use `redirect()` for auth/navigation flow.
- Do not swallow errors.
- Avoid generic try/catch without meaningful handling.

### STYLING

- Use Tailwind CSS.
- Do not use inline styles.
- Do not introduce new class naming conventions.
- Prefer composition over duplication.

### ACCESSIBILITY

- All interactive elements must be keyboard accessible.
- Buttons must use `<button>`, not clickable `<div>`.
- Images must include meaningful `alt` text.
- Forms must have associated labels.

### PERFORMANCE

- Avoid unnecessary client-side JavaScript.
- Prefer Server Components over Client Components.
- Avoid large dependencies.
- Memoization is allowed only when justified.

### OUTPUT FORMAT

When responding:

- Provide complete files, not fragments.
- Clearly indicate file paths.
- Explain non-obvious decisions briefly.
- Do not include explanations unless helpful.
