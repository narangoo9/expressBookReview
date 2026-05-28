const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const books = require("../booksdb");

let users = [];

const SECRET = "secretkey";

// Register
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.json({ message: "User successfully registered" });
});

// Login
router.post("/customer/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) return res.status(401).json({ message: "Invalid login" });

  const token = jwt.sign({ username }, SECRET);
  res.json({ message: "Customer successfully logged in", token });
});

// Add / update review
router.put("/customer/auth/review/:isbn", (req, res) => {
  const { review } = req.body;
  const isbn = req.params.isbn;

  const book = Object.values(books).find(b => b.isbn === isbn);

  if (!book) return res.status(404).json({ message: "Book not found" });

  book.reviews["user"] = review;

  res.json({ message: "Review added/updated successfully", reviews: book.reviews });
});

// Delete review
router.delete("/customer/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  const book = Object.values(books).find(b => b.isbn === isbn);

  if (book) delete book.reviews["user"];

  res.json({ message: "Review deleted successfully", reviews: book?.reviews || {} });
});

module.exports = router;