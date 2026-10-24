# Contracts: Quote of the Day

## `src/quotes.js`

```js
export const QUOTES // readonly Array<{ id: string, text: string, author: string }>, length >= 10
```

## `src/picker.js`

```js
export function pickRandomQuote(quotes, random = Math.random)
// returns quotes[Math.floor(random() * quotes.length)]
// throws Error if quotes is empty

export function pickNextQuote(quotes, currentId, random = Math.random)
// returns a quote whose id !== currentId, uniform over the others   (spec v1.1, FR-002)
// if no other quote exists, returns the only quote
// throws Error if quotes is empty
```

## `src/favorites.js`

```js
export const STORAGE_KEY = "qotd:favorites";
export function createFavoritesStore(storage)
// storage: a Storage-like object ({ getItem, setItem }) or null/undefined
// returns { has(id): boolean, toggle(id): boolean /* new state */ }
// never throws because of storage problems
```

## DOM contract (`index.html` ↔ `src/app.js`)

| Element | Selector | Behaviour |
|---|---|---|
| Quote text | `#quote-text` | Text of the current quote |
| Author | `#quote-author` | Author of the current quote |
| Quote region | `#quote` | `aria-live="polite"` |
| New quote button | `#new-quote` | `<button>`; shows a different quote (never the current one) |
| Favorite toggle | `#favorite` | `<button aria-pressed>`; label "☆ Favorite" or "★ Favorited" |
