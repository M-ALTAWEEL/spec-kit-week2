# Implementation Plan: Quote of the Day

**Branch**: `001-quote-of-the-day` | **Date**: 2026-10-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-quote-of-the-day/spec.md`

## Summary

A single static page shows one random quote from a built-in list, a "New quote" button,
and a favorite toggle whose state is remembered in `localStorage`. Pure logic (quote
picking, favorites store) lives in small ES modules with no DOM access so it can be unit
tested with Node's built-in test runner; a thin `app.js` wires that logic to the page.

**Revision (spec v1.1)**: "New quote" now uses `pickNextQuote`, which picks uniformly from
every quote *except* the current one (one `random()` call, no retry loop). Initial load still
uses `pickRandomQuote`. See research R6.

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript (ES2020 modules)

**Primary Dependencies**: None at runtime

**Storage**: `localStorage`, one key (`qotd:favorites`) holding a JSON array of quote ids

**Testing**: `node --test` (built in, Node 20+) for unit tests; Playwright (dev only) for
browser acceptance tests

**Target Platform**: Current Chrome, Firefox, Safari, Edge; served as static files

**Project Type**: Static single-page web app

**Performance Goals**: Quote visible < 1 s after load (SC-001); no network requests after load

**Constraints**: No build step, no backend, must work when storage is unavailable (FR-005)

**Scale/Scope**: 1 page, 12 quotes, 4 source modules

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|---|---|---|
| I. Readable, Small Code | Logic split into `quotes`, `picker`, `favorites`; DOM only in `app.js` | PASS |
| II. Test-First | Each FR gets a named test; tasks put tests before implementation | PASS |
| III. No Unneeded Dependencies | No runtime deps; `node:test` is built in. Playwright is a dev-only exception | PASS (justified below) |
| IV. Graceful Failure | Favorites store wraps every storage call in try/catch; falls back to memory | PASS |
| V. Accessible by Default | Real `<button>`s, `aria-pressed` on favorite toggle, `aria-live` on quote | PASS |

Post-design re-check (after Phase 1): all PASS, no new violations.

## Project Structure

### Documentation (this feature)

```text
specs/001-quote-of-the-day/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── modules.md       # Public functions of each module + DOM contract
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
index.html               # Markup: quote, author, New quote button, favorite toggle
styles.css               # Layout and theme (AA contrast)
src/
├── quotes.js            # Built-in quote list (id, text, author)
├── picker.js            # pickRandomQuote(quotes, random), pickNextQuote(quotes, currentId, random)
├── favorites.js         # createFavoritesStore(storage) -> has/toggle
└── app.js               # Wires modules to the DOM
tests/
├── unit/                # node --test
│   ├── quotes.test.mjs
│   ├── picker.test.mjs
│   └── favorites.test.mjs
└── e2e/                 # Playwright acceptance tests (dev only)
    └── page.test.mjs
package.json             # Scripts only: "test", "test:e2e"; no runtime dependencies
```

**Structure Decision**: Single static project at the repo root so `index.html` can be
opened directly from any static server (including GitHub Pages) with no build.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Playwright as a dev-only test tool (Principle III) | Acceptance scenarios (reload persistence, keyboard use, blocked storage) need a real browser | Manual testing alone gives no repeatable evidence for `/speckit-converge`; jsdom would itself be a dependency and does not do real reloads |
