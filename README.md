# Quote of the Day (Spec Kit, Week 2)

A small static page that shows a random quote, has a **New quote** button, and lets you
mark quotes as favorites that are remembered after a reload. It was built spec-first with
[GitHub Spec Kit](https://github.com/github/spec-kit):
constitution → specify → plan → tasks → implement → converge.

## Run it

```bash
python -m http.server 8000   # then open http://localhost:8000
```

## Test it

```bash
npm test                                         # unit tests (Node 20+, nothing to install)
npm install --no-save playwright && npm run test:e2e   # browser acceptance tests
```

## Where things are

| Path | What |
|---|---|
| `.specify/memory/constitution.md` | Project principles |
| `specs/001-quote-of-the-day/` | spec, plan, research, data model, contracts, quickstart, tasks |
| `index.html`, `styles.css`, `src/` | The page |
| `tests/unit/`, `tests/e2e/` | Tests (each names the requirement it checks) |
| `writeup.md` | Assignment write-up |
