---
name: Recurring Anti-Patterns — Pocket Heist
description: Anti-patterns and convention violations observed during code reviews of this codebase
type: project
---

## Inline Styles on Dynamic Values

Components have been written that use `style={{ color: dynamicValue }}` and `style={{ width: \`${n}%\` }}` to handle runtime-computed CSS values. The project bans inline styles. The approved pattern is to expose dynamic values as CSS custom properties (`--var-name`) on a container element via a single `style` prop cast as `React.CSSProperties`, then reference those variables in the CSS Module. Colour states should use `data-*` attributes with CSS attribute selectors.

## Barrel Exports Must Use Named Re-Exports

The project convention (documented in CLAUDE.md) is `import { ComponentName } from "@/components/ComponentName"`. Barrel `index.ts` files must therefore use `export { default as ComponentName }`, not `export { default }`. Default-only barrels break the established import style across the codebase.

## Sample/Seed Data Must Not Live in page.tsx

CLAUDE.md explicitly prohibits business logic (and by extension fixture data) inside `page.tsx`. Static seed/preview arrays belong in `/lib/data/` or a dedicated `/data` directory and should be imported into the page.

## Component-Scoped Styles Must Not Go in globals.css

Any CSS class that is only used by one component (especially classes derived from a component's name, e.g. `.heistcard-*`) must live in that component's CSS Module, not `globals.css`. Adding component-scoped styles to globals creates collision risk and violates the CSS Module boundary.

## React Namespace Must Be Imported When Used in Return Types

When a function's explicit return type is written as `React.JSX.Element` or `React.ReactElement`, `React` must be imported as a namespace (`import * as React from "react"`). The automatic JSX transform does not inject this namespace — omitting the import causes a TypeScript strict-mode error even though there is no runtime failure.

## Missing Semicolons in Test Files

Test files have appeared without semicolons on import statements and `it()`/`describe()` calls. All TypeScript files — including test files — require semicolons per project convention.

## Stringly-Typed Date/Duration Fields

Fields that carry implicit format contracts (ISO date strings, duration strings) have been typed as plain `string`. At minimum these should have a JSDoc comment documenting the expected format. The consuming helper functions should guard against invalid values (e.g., `isNaN(date.getTime())`) rather than propagating "Invalid Date" to the UI.
