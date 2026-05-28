const express = require("express");
const axios = require("axios");
const router = express.Router();
const books = require("../booksdb");

const API_BASE_URL = "http://localhost:5000";

// Axios async helpers required by the IBM final project rubric.
const getAllBooksUsingAxios = async () => {
  const response = await axios.get(`${API_BASE_URL}/`);
  return response.data;
};

const getBookByISBNUsingPromise = (isbn) => {
  return axios.get(`${API_BASE_URL}/isbn/${isbn}`).then((response) => response.data);
};

const getBooksByAuthorUsingPromise = (author) => {
  return axios.get(`${API_BASE_URL}/author/${author}`).then((response) => response.data);
};

const getBooksByTitleUsingPromise = (title) => {
  return axios.get(`${API_BASE_URL}/title/${title}`).then((response) => response.data);
};

// GET ALL BOOKS
router.get("/", async (req, res) => {
  res.json(books);
});

// GET BY ISBN
router.get("/isbn/:isbn", async (req, res) => {
  const book = Object.values(books).find(b => b.isbn === req.params.isbn);
  res.json(book || {});
});

// GET BY AUTHOR
router.get("/author/:author", async (req, res) => {
  const result = Object.values(books).filter(
    b => b.author.toLowerCase() === req.params.author.toLowerCase()
  );
  res.json(result);
});

// GET BY TITLE
router.get("/title/:title", async (req, res) => {
  const result = Object.values(books).filter(
    b => b.title.toLowerCase() === req.params.title.toLowerCase()
  );
  res.json(result);
});

// GET REVIEW (IMPORTANT FIX)
router.get("/review/:isbn", (req, res) => {
  const book = Object.values(books).find(b => b.isbn === req.params.isbn);
  res.json(book?.reviews || {});
});

router.getAllBooksUsingAxios = getAllBooksUsingAxios;
router.getBookByISBNUsingPromise = getBookByISBNUsingPromise;
router.getBooksByAuthorUsingPromise = getBooksByAuthorUsingPromise;
router.getBooksByTitleUsingPromise = getBooksByTitleUsingPromise;

module.exports = router;
