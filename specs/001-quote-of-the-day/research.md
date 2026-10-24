# Research: Quote of the Day

## R1. How to identify a favorite quote

- **Decision**: Give every quote a stable string `id` (e.g. `"jobs-work"`) and store the
  set of favorite ids.
- **Rationale**: Array indexes change if the list is reordered or a quote is removed,
  which would silently move favorites onto the wrong quote. Ids also make the
  "favorite refers to a removed quote" edge case trivial: unknown ids are ignored.
- **Alternatives considered**: Store the index (fragile, see above); store the full quote
  text (works, but long keys and breaks on a typo fix).

## R2. Storage format and failure handling

- **Decision**: One `localStorage` key `qotd:favorites` containing a JSON array of ids.
  Every read/write is wrapped in `try/catch`. If reading fails or the value is not an
  array of strings, start with an empty set. If writing fails, keep the set in memory for
  the current visit.
- **Rationale**: Satisfies FR-004 and FR-005 and Constitution IV. `localStorage` can throw
  on access (blocked cookies, some private modes) and can hold anything a user or another
  script wrote.
- **Alternatives considered**: IndexedDB (async, far more code for one small list);
  cookies (sent to servers, size limits, no benefit).

## R3. Randomness and testability

- **Decision**: `pickRandomQuote` takes the random function as a parameter, defaulting to
  `Math.random`.
- **Rationale**: Tests can pass a fixed sequence and assert exact results instead of
  relying on chance.
- **Alternatives considered**: Seeded PRNG library (unneeded dependency).

## R6. No immediate repeats (added for spec v1.1, FR-002)

- **Decision**: `pickNextQuote(quotes, currentId, random)` filters out the current quote and
  picks uniformly from the rest with a single `random()` call. If the list has one quote, it
  returns that quote.
- **Rationale**: Every press visibly changes the quote (SC-004), each other quote stays
  equally likely, and the function is deterministic under an injected `random`, so it is
  easy to test.
- **Alternatives considered**: "Re-roll until different" loop (unbounded in theory and
  awkward to test with a fixed random sequence); shuffle-bag that cycles through all quotes
  before repeating (stronger guarantee than the spec asks for, more state to persist).

## R4. Loading without a build step

- **Decision**: Native ES modules (`<script type="module">`), served by any static server.
- **Rationale**: No bundler (Constitution III). Note: browsers block module scripts from
  `file://`, so the quickstart uses `python -m http.server`.
- **Alternatives considered**: One classic script file (harder to unit test in Node).

## R5. Accessibility of the favorite toggle

- **Decision**: A `<button>` with `aria-pressed="true|false"`, a visible text label
  ("☆ Favorite" / "★ Favorited"), and the quote region marked `aria-live="polite"`.
- **Rationale**: Native button gives keyboard support (FR-006) for free; `aria-pressed`
  exposes toggle state (FR-003).
- **Alternatives considered**: Clickable star icon `<span>` (not keyboard accessible).
