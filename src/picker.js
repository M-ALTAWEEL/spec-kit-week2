/**
 * Pick a random quote from the list.
 * @param {ReadonlyArray<{id: string}>} quotes
 * @param {() => number} random returns a number in [0, 1); injectable for tests
 */
export function pickRandomQuote(quotes, random = Math.random) {
  if (quotes.length === 0) throw new Error("No quotes to pick from");
  return quotes[Math.floor(random() * quotes.length)];
}

/**
 * Pick a random quote that is not the current one (spec FR-002: no immediate repeats).
 * Uniform over the other quotes; returns the only quote if there is no other.
 */
export function pickNextQuote(quotes, currentId, random = Math.random) {
  const others = quotes.filter((q) => q.id !== currentId);
  return pickRandomQuote(others.length > 0 ? others : quotes, random);
}
