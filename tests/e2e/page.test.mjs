import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium, startServer, fixedRandom, trackErrors } from "./helpers.mjs";
import { QUOTES } from "../../src/quotes.js";

let browser, server, url;
before(async () => {
  ({ server, url } = await startServer());
  browser = await chromium.launch();
});
after(async () => {
  await browser?.close();
  server?.close();
});

const quoteText = (page) => page.locator("#quote-text").textContent();

test("US1/AC1, FR-001: one quote and its author are shown on load", async () => {
  const page = await browser.newPage();
  const errors = trackErrors(page);
  await page.goto(url);
  const text = await quoteText(page);
  const author = await page.locator("#quote-author").textContent();
  assert.ok(QUOTES.some((q) => q.text === text && q.author === author));
  assert.equal(await page.locator("blockquote").count(), 1);
  assert.deepEqual(errors, []);
  await page.close();
});

test("US1/AC2: different visits can show different quotes", async () => {
  const seen = new Set();
  for (const r of [0, 0.5, 0.95]) {
    const page = await browser.newPage();
    await page.addInitScript(fixedRandom([r]));
    await page.goto(url);
    seen.add(await quoteText(page));
    await page.close();
  }
  assert.equal(seen.size, 3);
});

test("US2/AC1, FR-002: New quote shows a quote from the list without reloading", async () => {
  const page = await browser.newPage();
  await page.addInitScript(fixedRandom([0, 0.5]));
  await page.goto(url);
  await page.evaluate(() => (window.__sameDocument = true));
  await page.click("#new-quote");
  assert.equal(await quoteText(page), QUOTES[6].text);
  assert.equal(await page.evaluate(() => window.__sameDocument), true);
  await page.close();
});

test("US2/AC3, FR-002, SC-004: every New quote press changes the quote (300 presses)", async () => {
  const page = await browser.newPage();
  await page.goto(url);
  let previous = await quoteText(page);
  let unchanged = 0;
  for (let i = 0; i < 300; i++) {
    await page.click("#new-quote");
    const text = await quoteText(page);
    if (text === previous) unchanged++;
    previous = text;
  }
  assert.equal(unchanged, 0);
  await page.close();
});

test("US2/AC2, FR-006: New quote works from the keyboard", async () => {
  const page = await browser.newPage();
  await page.addInitScript(fixedRandom([0, 0.5, 0.95]));
  await page.goto(url);
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => document.activeElement.id), "new-quote");
  await page.keyboard.press("Enter");
  assert.equal(await quoteText(page), QUOTES[6].text);
  await page.keyboard.press("Space");
  assert.equal(await quoteText(page), QUOTES[11].text);
  await page.close();
});

test("US3/AC1-3, FR-003, FR-004: favorite toggles and survives a reload", async () => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.addInitScript(fixedRandom([0]));
  await page.goto(url);
  const fav = page.locator("#favorite");
  assert.equal(await fav.getAttribute("aria-pressed"), "false");
  await fav.click();
  assert.equal(await fav.getAttribute("aria-pressed"), "true");
  assert.match(await fav.textContent(), /Favorited/);
  await page.reload();
  assert.equal(await quoteText(page), QUOTES[0].text);
  assert.equal(await fav.getAttribute("aria-pressed"), "true");
  await fav.click();
  await page.reload();
  assert.equal(await fav.getAttribute("aria-pressed"), "false");
  await context.close();
});

test("FR-006: favorite toggle works from the keyboard", async () => {
  const page = await browser.newPage();
  await page.goto(url);
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => document.activeElement.id), "favorite");
  await page.keyboard.press("Space");
  assert.equal(await page.locator("#favorite").getAttribute("aria-pressed"), "true");
  await page.close();
});

test("FR-005: page works when storage is blocked", async () => {
  const page = await browser.newPage();
  const errors = trackErrors(page);
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() { throw new DOMException("blocked", "SecurityError"); },
    });
  });
  await page.goto(url);
  assert.ok((await quoteText(page)).length > 0);
  await page.click("#favorite");
  assert.equal(await page.locator("#favorite").getAttribute("aria-pressed"), "true");
  await page.click("#new-quote");
  assert.deepEqual(errors, []);
  await page.close();
});

test("FR-005: corrupt stored data is ignored", async () => {
  const page = await browser.newPage();
  const errors = trackErrors(page);
  await page.addInitScript(() => localStorage.setItem("qotd:favorites", "not json{"));
  await page.goto(url);
  assert.ok((await quoteText(page)).length > 0);
  assert.equal(await page.locator("#favorite").getAttribute("aria-pressed"), "false");
  assert.deepEqual(errors, []);
  await page.close();
});
