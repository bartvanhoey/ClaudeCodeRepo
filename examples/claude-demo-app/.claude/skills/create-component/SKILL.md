---
description: Create a UI component using TDD (test-driven development)
allowed-tools: Read, Write, Edit, Glob, Bash(npm test:*), Bash(npx vitest:*)
argument-hint: "[Brief description]"
---

## User Input

The user has provided information about the component to make: **$ARGUMENTS**

## Do This First

From the component information above, determine:

- A PascalCase component name (e.g., "a card showing user stats" → `UserStatsCard`)
- Which existing folder under `components/` it belongs in (e.g. `Common` for a small reusable/shared piece, or an existing feature folder like `Features`, `Pricing`, `Testimonial` if it extends that section). Default to `components/Common/` if nothing else fits, or ask if it's genuinely unclear.

### 1. Write Tests First

Create `components/<Folder>/[ComponentName].test.tsx`, colocated next to the component — see `components/Common/SectionHeader.test.tsx` for the existing pattern. Write 2-3 simple tests:

- Test that the component renders
- Test key elements are present (roles, text)

Pattern:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ComponentName from "./ComponentName";

describe("ComponentName", () => {
  it("renders successfully", () => {
    render(<ComponentName />);
    // assertions
  });
});
```

### 2. Run Tests (expect failure)

```bash
npx vitest run components/<Folder>/[ComponentName].test.tsx
```

### 3. Create the Component

Create `components/<Folder>/[ComponentName].tsx` as a single flat file — no subfolder, no `index.ts` re-export. Match the existing flat-file pattern (e.g. `components/Common/SectionHeader.tsx`).

Conventions:

- Style with Tailwind utility classes only — this project has no CSS Modules. Use `dark:` variants for dark mode and the existing `@theme` tokens from `app/globals.css` for colors/fonts.
- Add `"use client"` at the top only if the component needs hooks, browser APIs, or a client-only library (e.g. `framer-motion`) — see `SectionHeader.tsx` for an example. Leave it off for static/presentational components.
- Use semicolons, matching the rest of the codebase.
- Define prop types inline (e.g. `type Props = {...}`) unless a matching shared type already exists in `types/`.

### 4. Run Tests (expect pass)

```bash
npx vitest run components/<Folder>/[ComponentName].test.tsx
```

Iterate on component development until all tests pass.

## Rules

- Keep tests minimal
- Only proceed when the current step passes
