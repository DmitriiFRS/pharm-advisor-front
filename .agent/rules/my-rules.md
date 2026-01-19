---
trigger: always_on
---

# Antigravity Rules — Frontend (Next.js 15, App Router)

## Purpose

Provide the agent with clear instructions about behavior when working with this repository:

-  Modify only what is necessary to complete the specific task;
-  Do not put private data and production at risk;
-  Create neat, verifiable changes (branches + PRs + tests);
-  Leave detailed "artifact" documentation about what was done.

## General principles (mandatory)

1. **Project language:** TypeScript.
2. **App Router:** Preserve the semantics of server/client components. Do not automatically convert Server Components to Client without a clear necessity and explanation of reasons.
3. **Architecture:** Follow the **Modular / Feature-Based Architecture** (FSD-lite) pattern as described in the "Architecture & Directory Structure" section. 4. **Libraries:** Follow existing patterns for using `shadcn`, `react-hook-form`, `swiper`, `framer-motion`, `zod`.
4. **API / BFF:** All changes that concern HTTP/endpoints or network behavior are limited to the file `src/features/[feature]/api/` and `src/shared/api/`. 6. **Do not touch:** `.env`, `.env.*`, secrets, `~/.ssh`, key files, `secrets/*`, `node_modules/`, `config/credentials*`.
5. **Do not send data outside:** Without explicit permission do not POST/PUT/GET to external domains (except pre-approved ones).
6. **Data deletion:** Any commands that may delete files (`rm`, `git clean`) require human confirmation and a backup.

## Architecture & Directory Structure 1. **Directory Layers:**

-  `src/app/`: Routing and page assembly only. Keep logic minimal. Use Route Groups `(name)` and private folders `_components` for unique page sections.
-  `src/widgets/`: Large, self-contained UI blocks (e.g., `Header`, `Footer`, `Sidebar`). They compose multiple features.
-  `src/features/`: Domain-specific logic and UI (e.g., `auth`, `products`, `cart`).
-  `src/shared/`: Generic, reusable code (UI Kit, base API client, utils, types).

2. **Public API (index.ts):** Every module in `features`, `widgets`, and `shared/ui` **MUST** have an `index.ts` file. Always import from the folder path (e.g., `@/features/cart`), never from internal files (e.g., `@/features/cart/ui/Button.tsx`).
3. **Co-location:** Keep styles, types, and small sub-components inside the folder of the feature/widget they belong to.
4. **Server vs Client:** Prefer Server Components by default. Use `'use client'` only at the lowest possible level (e.g., for a specific button or form).

## Code style and quality

1. **Typing:** Add/update TypeScript types for all changes. Avoid using `any`; if you must — leave a comment explaining why + a TODO.
2. **Public API Compliance:** When creating a new feature or widget, always export its main component through `index.ts`. 3. **Naming:** Use PascalCase for components and camelCase for hooks/functions.
3. **Security:** Ensure all code changes follow secure coding practices.

## API & Networking 1. **Base Client:** Use the pre-configured client in `src/shared/api/base.ts`.

2. **Feature Endpoints:** Store feature-specific endpoints and fetch functions in `src/features/[feature]/api/`.
3. **Constants:** Define API paths as constants within the feature's API folder or in `shared/api` if global.

## Security and privacy

1. **Secrets:** Never read or log `.env` values and never commit secrets.
2. **External access:** Automatic outbound requests to unknown domains are forbidden.

## Destructive operations

1. **Never** run commands like `rm -rf /`, `rm -rf *`, `npm cache clean --force` without confirmation.

## Figma

Figma URL for MCP: https://www.figma.com/design/uspgQq5faFk49vlu94MNbk/pharm
