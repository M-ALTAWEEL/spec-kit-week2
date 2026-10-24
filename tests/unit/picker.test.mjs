import { test } from "node:test";
import assert from "node:assert/strict";
import { pickRandomQuote, pickNextQuote } from "../../src/picker.js";

const LIST = [
  { id: "a", text: "A", author: "x" },
  { id: "b", text: "B", author: "y" },
  { id: "c", text: "C", author: "z" },
];

test("FR-001: picks the quote at floor(random() * length)", () => {
  assert.equal(pickRandomQuote(LIST, () => 0).id, "a");
  assert.equal(pickRandomQuote(LIST, () => 0.5).id, "b");
  assert.equal(pickRandomQuote(LIST, () => 0.999).id, "c");
});

test("FR-001: throws on an empty list", () => {
  assert.throws(() => pickRandomQuote([], () => 0), /no quotes/i);
});

test("FR-002: pickNextQuote never returns the current quote", () => {
  for (const current of LIST) {
    for (const r of [0, 0.3, 0.6, 0.999]) {
      assert.notEqual(pickNextQuote(LIST, current.id, () => r).id, current.id);
    }
  }
});

test("FR-002: pickNextQuote can reach every other quote", () => {
  const seen = new Set([0, 0.5, 0.999].map((r) => pickNextQuote(LIST, "b", () => r).id));
  assert.deepEqual([...seen].sort(), ["a", "c"]);
});

test("FR-002 edge case: a one-quote list returns that quote", () => {
  assert.equal(pickNextQuote([LIST[0]], "a", () => 0.7).id, "a");
});

test("FR-002: pickNextQuote throws on an empty list", () => {
  assert.throws(() => pickNextQuote([], "a", () => 0), /no quotes/i);
});
