# Data Model: Quote of the Day

## Quote

| Field | Type | Rules |
|---|---|---|
| `id` | string | Unique, non-empty, kebab-case; never changes once shipped |
| `text` | string | Non-empty |
| `author` | string | Non-empty |

- The built-in list is a frozen array of at least 10 quotes (FR-001).
- Ids must be unique across the list (checked by a unit test).

## Favorites

- A set of quote ids, persisted as a JSON array under `localStorage["qotd:favorites"]`.
- **Load**: parse the stored value; keep only string entries; if parsing fails or storage
  throws, start empty.
- **Toggle(id)**: add if absent, remove if present, then try to save. Saving failures are
  swallowed (in-memory state still updates).
- Unknown ids (quotes later removed from the list) can stay in storage; they are simply
  never shown.

## Page state (in memory only)

| Field | Meaning |
|---|---|
| `current` | The Quote currently shown |

State transitions: `load → current = random quote`; `New quote → current = random quote`;
`Toggle favorite → favorites.toggle(current.id)`.
