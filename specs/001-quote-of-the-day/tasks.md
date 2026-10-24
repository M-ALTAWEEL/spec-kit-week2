---
description: "Task list for Quote of the Day"
---

# Tasks: Quote of the Day

**Input**: Design documents from `/specs/001-quote-of-the-day/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/modules.md

**Tests**: Required by Constitution II (test-first). Each test names the FR it covers.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story the task belongs to (US1, US2, US3)

## Phase 1: Setup

- [x] T001 Create `package.json` with scripts `test` (`node --test tests/unit/`) and `test:e2e` (`node --test tests/e2e/`), `"type": "module"`, no dependencies
- [x] T002 [P] Create `index.html` skeleton with the DOM contract elements from `contracts/modules.md` and `<script type="module" src="src/app.js">`
- [x] T003 [P] Create `styles.css` with a centred card layout and AA-contrast colours

---

## Phase 2: Foundational

- [x] T004 Write `tests/unit/quotes.test.mjs`: list has ≥ 10 quotes, unique non-empty ids, non-empty text and author (FR-001)
- [x] T005 Create `src/quotes.js` with 12 quotes `{ id, text, author }` (frozen) so T004 passes

**Checkpoint**: data is ready; stories can start.

---

## Phase 3: User Story 1 - See a random quote (Priority: P1) 🎯 MVP

**Goal**: One random quote and its author on load.

**Independent Test**: Open the page; exactly one quote and author are visible.

- [x] T006 [US1] Write `tests/unit/picker.test.mjs`: returns the quote at `floor(random() * n)`; covers first/last index; throws on empty list (FR-001)
- [x] T007 [US1] Implement `pickRandomQuote(quotes, random)` in `src/picker.js`
- [x] T008 [US1] Implement `render(quote)` and initial load in `src/app.js` (fills `#quote-text`, `#quote-author`)
- [x] T009 [US1] Write e2e test in `tests/e2e/page.test.mjs`: page shows one quote from the list and author on load (US1/AC1)

**Checkpoint**: MVP works.

---

## Phase 4: User Story 2 - Get a new quote (Priority: P2)

**Goal**: "New quote" button shows another random quote.

- [x] T010 [US2] Add e2e tests: clicking `#new-quote` shows a quote from the list without navigation; Enter/Space on the focused button does the same (US2/AC1, US2/AC2, FR-006)
- [x] T011 [US2] Wire `#new-quote` click in `src/app.js` to pick and render a quote

---

## Phase 5: User Story 3 - Favorite a quote and keep it (Priority: P3)

**Goal**: Toggle favorite; remembered across reloads; safe when storage fails.

- [x] T012 [P] [US3] Write `tests/unit/favorites.test.mjs`: toggle on/off; persists through a new store on the same storage; corrupt JSON → empty; non-array → empty; `getItem`/`setItem` throwing → still toggles in memory; `null` storage works (FR-003, FR-004, FR-005)
- [x] T013 [US3] Implement `createFavoritesStore(storage)` in `src/favorites.js`
- [x] T014 [US3] Wire `#favorite` in `src/app.js`: label and `aria-pressed` reflect `has(current.id)`; click toggles; updates on every render
- [x] T015 [US3] Add e2e tests: favorite → reload → same quote still favorited; blocked storage → page works with no page errors (US3/AC1-3, FR-005)

---

## Phase 6: Polish

- [x] T016 [P] Write `README.md` (what it is, how to run, how to test)
- [x] T017 Run `npm test` and `npm run test:e2e`; walk through `quickstart.md`

## Dependencies

- Setup → Foundational → US1 → US2 → US3 → Polish
- US2 and US3 depend only on US1's `render` function; T012/T013 can be done in parallel with US2.


## Phase 7: Convergence

- [x] T018 Add unit tests for `pickNextQuote` in `tests/unit/picker.test.mjs`: never returns `currentId`, covers every other quote, single-quote list returns that quote, empty list throws per FR-002 (missing)
- [x] T019 Implement `pickNextQuote(quotes, currentId, random)` in `src/picker.js` per contracts/modules.md (missing)
- [x] T020 Make `#new-quote` in `src/app.js` use `pickNextQuote` with the current quote's id per FR-002, US2/AC3 (partial)
- [x] T021 Add e2e test in `tests/e2e/page.test.mjs`: 300 presses of New quote, every press changes the quote per SC-004, US2/AC3 (missing)
