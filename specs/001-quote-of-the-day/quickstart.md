# Quickstart: Quote of the Day

## Run the page

```bash
python -m http.server 8000     # from the repo root
# open http://localhost:8000
```

(ES modules do not load from `file://`, so open it through a local server.)

## Run the tests

```bash
npm test                       # unit tests, Node 20+, no install needed
npm install --no-save playwright && npm run test:e2e   # browser acceptance tests (optional)
```

## Manual validation (maps to the spec)

1. Open the page → one quote and author are shown (US1, FR-001).
2. Press **New quote** a few times → the quote changes without a reload (US2, FR-002).
3. Press **☆ Favorite** → it becomes **★ Favorited** (FR-003). Reload until that quote
   appears again → still **★ Favorited** (FR-004).
4. Use only Tab / Enter / Space to do steps 2–3 (FR-006).
5. In DevTools, run `localStorage.setItem("qotd:favorites", "not json")` and reload →
   page works, no console errors (FR-005).
