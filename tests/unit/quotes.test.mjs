import { test } from "node:test";
import assert from "node:assert/strict";
import { QUOTES } from "../../src/quotes.js";

test("FR-001: built-in list has at least 10 quotes", () => {
  assert.ok(QUOTES.length >= 10);
});

test("FR-001: every quote has a unique id, text and author", () => {
  const ids = new Set();
  for (const q of QUOTES) {
    assert.match(q.id, /^[a-z0-9]+(-[a-z0-9]+)*$/);
    assert.ok(q.text.trim().length > 0, `empty text for ${q.id}`);
    assert.ok(q.author.trim().length > 0, `empty author for ${q.id}`);
    assert.ok(!ids.has(q.id), `duplicate id ${q.id}`);
    ids.add(q.id);
  }
});

test("quote list cannot be changed at runtime", () => {
  assert.ok(Object.isFrozen(QUOTES));
  assert.ok(Object.isFrozen(QUOTES[0]));
});
