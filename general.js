const express = require("express");
const router = express.Router();
const books = require("../booksdb");

// Get all books
router.get("/", (req, res) => {
  res.json(books);
});

// Get by ISBN
router.get("/isbn/:isbn", (req, res) => {
  const book = Object.values(books).find(b => b.isbn === req.params.isbn);
  res.json(book || {});
});

// Get by author
router.get("/author/:author", (req, res) => {
  const result = Object.values(books).filter(
    b => b.author.toLowerCase() === req.params.author.toLowerCase()
  );
  res.json(result);
});

// Get by title
router.get("/title/:title", (req, res) => {
  const result = Object.values(books).filter(
    b => b.title.toLowerCase() === req.params.title.toLowerCase()
  );
  res.json(result);
});

module.exports = router;