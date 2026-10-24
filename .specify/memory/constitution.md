# Quote of the Day Constitution

## Core Principles

### I. Readable, Small Code

Code MUST be written for the next reader. Functions MUST do one thing and stay short
(about 30 lines or fewer); names MUST describe intent (`pickNextQuote`, not `doIt`).
Pure logic (choosing quotes, reading and writing favorites) MUST live apart from DOM code
so it can be read and tested on its own. No dead code, commented-out code, or unused
files are committed.

Rationale: a small project stays maintainable only if every file is easy to understand
without its author.

### II. Test-First for Behavior (NON-NEGOTIABLE)

Every functional requirement in a spec MUST be covered by at least one automated test
that names the requirement it checks (e.g. `FR-003`). Tests for a task MUST be written
and seen to fail before the code that makes them pass. The full test suite MUST pass
before a task is marked done.

Rationale: tests are the evidence that the code matches the spec; without them,
"converged" means nothing.

### III. No Unneeded Dependencies

The project MUST run by opening a static page in a browser, with no build step and no
runtime libraries. Tooling used only for testing MUST be built in to the platform (for
example Node's built-in `node:test`) or already required by the course setup. Any new
dependency MUST be justified in the plan's Complexity Tracking table.

Rationale: every dependency is code we must update, audit, and explain.

### IV. Graceful Failure

The page MUST stay usable when optional capabilities fail. If browser storage is
unavailable or holds corrupt data, the page MUST still show quotes and MUST NOT throw
uncaught errors; it simply cannot remember favorites.

Rationale: a quote page that breaks because of private browsing mode is a bug, not an
edge case.

### V. Accessible by Default

Interactive controls MUST be real `<button>` elements with visible labels, reachable and
usable by keyboard, with state exposed to assistive technology (e.g. `aria-pressed` for
toggles). Text MUST meet WCAG AA contrast.

Rationale: accessibility is cheapest when it is built in from the first commit.

## Technical Constraints

- Plain HTML, CSS, and JavaScript (ES modules); no frameworks, no backend.
- Supported browsers: current versions of Chrome, Firefox, Safari, and Edge.
- Persistence, when needed, uses `localStorage` behind a small wrapper module.

## Development Workflow & Quality Gates

- Work follows the Spec Kit loop: constitution → specify → plan → tasks → implement →
  converge. Code is never changed to "fix" a spec problem; the spec or plan is refined
  first and the change flows down.
- Each artifact is reviewed by a human before the next stage starts.
- A change is done only when: all tests pass, the page works when opened from a local
  static server, and `/speckit-converge` reports no remaining findings.

## Governance

This constitution overrides other practices in this repository. Amendments MUST be made
through `/speckit-constitution`, be recorded with a version bump (MAJOR for removed or
redefined principles, MINOR for new principles or sections, PATCH for wording), and be
committed separately from feature work. Every plan MUST include a Constitution Check, and
any violation MUST be justified in Complexity Tracking or removed.

**Version**: 1.0.0 | **Ratified**: 2026-10-24 | **Last Amended**: 2026-10-24
