import { test } from "node:test";
import assert from "node:assert/strict";
import { createFavoritesStore, STORAGE_KEY } from "../../src/favorites.js";

function memoryStorage(initial = {}) {
  const data = { ...initial };
  return {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => { data[k] = String(v); },
    data,
  };
}

const throwingStorage = {
  getItem() { throw new Error("SecurityError"); },
  setItem() { throw new Error("QuotaExceededError"); },
};

test("FR-003: toggle marks and unmarks a quote", () => {
  const favs = createFavoritesStore(memoryStorage());
  assert.equal(favs.has("a"), false);
  assert.equal(favs.toggle("a"), true);
  assert.equal(favs.has("a"), true);
  assert.equal(favs.toggle("a"), false);
  assert.equal(favs.has("a"), false);
});

test("FR-004: favorites survive a reload (new store, same storage)", () => {
  const storage = memoryStorage();
  createFavoritesStore(storage).toggle("a");
  assert.deepEqual(JSON.parse(storage.data[STORAGE_KEY]), ["a"]);
  assert.equal(createFavoritesStore(storage).has("a"), true);
});

test("FR-005: corrupt JSON is ignored", () => {
  const favs = createFavoritesStore(memoryStorage({ [STORAGE_KEY]: "not json{" }));
  assert.equal(favs.has("a"), false);
  assert.equal(favs.toggle("a"), true);
});

test("FR-005: non-array or non-string entries are ignored", () => {
  assert.equal(createFavoritesStore(memoryStorage({ [STORAGE_KEY]: '{"a":true}' })).has("a"), false);
  const mixed = createFavoritesStore(memoryStorage({ [STORAGE_KEY]: '["a", 3, null]' }));
  assert.equal(mixed.has("a"), true);
  assert.equal(mixed.has("3"), false);
});

test("FR-005: storage that throws still toggles in memory", () => {
  const favs = createFavoritesStore(throwingStorage);
  assert.equal(favs.toggle("a"), true);
  assert.equal(favs.has("a"), true);
});

test("FR-005: works with no storage at all", () => {
  const favs = createFavoritesStore(null);
  assert.equal(favs.toggle("a"), true);
  assert.equal(favs.has("a"), true);
});
