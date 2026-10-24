// Built-in quote list. Ids are stable: favorites are stored by id, so never rename one.
const raw = [
  { id: "jobs-great-work", text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { id: "knuth-premature", text: "Premature optimization is the root of all evil.", author: "Donald Knuth" },
  { id: "fowler-humans", text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { id: "lovelace-imagination", text: "Imagination is the discovering faculty, pre-eminently.", author: "Ada Lovelace" },
  { id: "hopper-always-done", text: "The most dangerous phrase in the language is, 'We've always done it this way.'", author: "Grace Hopper" },
  { id: "dijkstra-simplicity", text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
  { id: "kay-invent-future", text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { id: "abelson-people-read", text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { id: "kernighan-debugging", text: "Debugging is twice as hard as writing the code in the first place.", author: "Brian Kernighan" },
  { id: "torvalds-show-code", text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { id: "beck-make-it-work", text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { id: "confucius-not-stop", text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
];

export const QUOTES = Object.freeze(raw.map((q) => Object.freeze(q)));
