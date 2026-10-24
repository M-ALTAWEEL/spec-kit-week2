import { QUOTES } from "./quotes.js";
import { pickRandomQuote, pickNextQuote } from "./picker.js";
import { createFavoritesStore } from "./favorites.js";

/** Accessing window.localStorage can itself throw (blocked storage), so guard it. */
function getStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

const els = {
  text: document.getElementById("quote-text"),
  author: document.getElementById("quote-author"),
  newQuote: document.getElementById("new-quote"),
  favorite: document.getElementById("favorite"),
};

const favorites = createFavoritesStore(getStorage());
let current = null;

function renderFavorite() {
  const isFav = favorites.has(current.id);
  els.favorite.setAttribute("aria-pressed", String(isFav));
  els.favorite.textContent = isFav ? "★ Favorited" : "☆ Favorite";
}

function show(quote) {
  current = quote;
  els.text.textContent = quote.text;
  els.author.textContent = quote.author;
  renderFavorite();
}

els.newQuote.addEventListener("click", () => show(pickNextQuote(QUOTES, current.id)));
els.favorite.addEventListener("click", () => {
  favorites.toggle(current.id);
  renderFavorite();
});

show(pickRandomQuote(QUOTES));
