# Feature Specification: Quote of the Day

**Feature Branch**: `001-quote-of-the-day`

**Created**: 2026-10-24

**Status**: Draft (revised 2026-10-24: FR-002 no immediate repeats, see Revision History)

**Input**: User description: "A quote-of-the-day page: one random quote from a built-in list, a "New quote" button, and favoriting that persists across reloads."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See a random quote (Priority: P1)

A visitor opens the page and immediately sees one quote, with its author, chosen at
random from a built-in list.

**Why this priority**: Showing a quote is the whole point of the page; without it nothing
else matters.

**Independent Test**: Open the page; exactly one quote and its author are visible.

**Acceptance Scenarios**:

1. **Given** the page is closed, **When** the visitor opens it, **Then** exactly one quote
   from the built-in list is shown together with its author.
2. **Given** the page is opened many times, **When** the shown quotes are compared,
   **Then** more than one different quote has appeared (the choice is random).

---

### User Story 2 - Get a new quote (Priority: P2)

The visitor presses a "New quote" button to see another random quote without reloading.

**Why this priority**: Lets the visitor keep exploring; useful but the page already works
without it.

**Independent Test**: Press "New quote" several times; each press shows a quote from the
list without a page reload.

**Acceptance Scenarios**:

1. **Given** a quote is shown, **When** the visitor presses "New quote", **Then** a quote
   chosen at random from the built-in list is shown.
2. **Given** a keyboard-only visitor, **When** they Tab to "New quote" and press Enter or
   Space, **Then** the same thing happens as with a click.
3. **Given** a quote is shown, **When** the visitor presses "New quote" any number of
   times, **Then** every press shows a quote different from the one that was on screen
   just before the press (the button never appears to do nothing).

---

### User Story 3 - Favorite a quote and keep it (Priority: P3)

The visitor marks the quote they are looking at as a favorite. When they reload the page
later, the quote is still marked as a favorite.

**Why this priority**: Adds personal value and is the only part that needs persistence.

**Independent Test**: Favorite a quote, reload, navigate back to that quote; it still shows
as a favorite.

**Acceptance Scenarios**:

1. **Given** a quote that is not a favorite, **When** the visitor presses the favorite
   control, **Then** the quote is shown as a favorite.
2. **Given** a quote that is a favorite, **When** the visitor presses the favorite control
   again, **Then** it is no longer a favorite.
3. **Given** the visitor favorited a quote, **When** they reload the page and that quote is
   shown again, **Then** it is still shown as a favorite.

---

### Edge Cases

- Browser storage is unavailable (e.g. blocked or private mode): quotes still work; the
  favorite control still toggles for the current visit but nothing is remembered.
- Stored favorites data is corrupt or unreadable: it is ignored and the page works as if
  there were no favorites.
- Stored favorites refer to a quote that no longer exists in the list: ignored.
- The list has only one quote: "New quote" keeps showing that quote (there is no other).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST show exactly one quote and its author on load, chosen at random
  from a built-in list of at least 10 quotes.
- **FR-002**: The page MUST provide a "New quote" button that shows a randomly chosen quote
  from the list without reloading the page. The new quote MUST differ from the quote shown
  immediately before the press; it is chosen at random from all the other quotes.
- **FR-003**: Users MUST be able to toggle the shown quote as a favorite with a single
  control, whose current state is visible and exposed to assistive technology.
- **FR-004**: The system MUST remember favorites across page reloads on the same browser.
- **FR-005**: The page MUST keep working (FR-001 to FR-003) when storage is unavailable or
  its data is invalid, without showing errors to the user.
- **FR-006**: All controls MUST be operable by keyboard alone.

### Key Entities

- **Quote**: one entry in the built-in list: the quote text and its author.
- **Favorites**: the set of quotes the visitor has marked, remembered per browser.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor sees a quote within 1 second of opening the page.
- **SC-002**: A visitor can favorite a quote in one action and still sees it as a favorite
  after 100% of reloads in the same browser.
- **SC-003**: Every action on the page can be completed using only the keyboard.
- **SC-004**: 100% of "New quote" presses visibly change the quote (measured over 300
  presses).

## Assumptions

- The quote list is fixed and ships with the page; there is no editing of quotes.
- One visitor per browser; favorites are not synced between devices.
- A separate "favorites list" view is out of scope; favoriting only marks the quote.

## Revision History

- **v1.1 (2026-10-24)**: Review after the first implement/converge pass. v1 said "New quote"
  shows "a quote chosen at random from the built-in list", which allows the same quote to be
  picked again. With 12 quotes, 29 of 300 presses (9.7%) left the quote unchanged, so the
  button looked broken. `/speckit-converge` reported **Converged** anyway, because the code
  did exactly what v1 said. Changed FR-002, added US2/AC3, an edge case, and SC-004.
