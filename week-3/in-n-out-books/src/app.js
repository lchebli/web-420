//
name: "Leslie Khattarchebli"
Date: "8/31/2025"
file_Name: "app.js"
Description: "application file"
//**

//importing books.js from database folder
const books = require('./database/books');

// Router file for Express application
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Step 1: Import required modules
const express = require("express");
const createError = require("http-errors");

// Step 2: Create an Express app
const app = express();

// Step 3: Middleware set-up
app.use(express.json()); // Parses JSON
app.use(express.urlencoded({ extended: true })); // separate URL-data

// Step 4: Route for root for URL
//current HTML homepage

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>In-N-Out Books</title>
      <style>
        body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; }
        header { background: #d32f2f; color: #fff; padding: 2rem; text-align: center; }
        main { padding: 2rem; }
        .cta { margin-top: 2rem; }
        .cta a { background: #388e3c; color: #fff; padding: 1rem 2rem; text-decoration: none; border-radius: 5px; }
        footer { text-align: center; padding: 1rem; background: #eee; color: #333; margin-top: 2rem; }
      </style>
    </head>
    <body>
      <header>
        <h1>Welcome to In-N-Out Books</h1>
        <p>Your one-stop shop for fantasy and adventure books!</p>
      </header>
      <main>
        <h2>Featured Books</h2>
        <ul>
          <li>The Fellowship of the Ring by J.R.R. Tolkien</li>
          <li>Harry Potter and the Philosopher's Stone by J.K. Rowling</li>
          <li>The Two Towers by J.R.R. Tolkien</li>
          <li>Harry Potter and the Chamber of Secrets by J.K. Rowling</li>
          <li>The Return of the King by J.R.R. Tolkien</li>
        </ul>
        <div class="cta">
          <a href="/api/books">Browse All Books</a>
        </div>
      </main>
      <footer>
        &copy; 2025 In-N-Out Books. All rights reserved.
      </footer>
    </body>
    </html>
  `);
});

// Step 5: Handle 404 errors
app.use((req, res, next) => {
  next(createError(404));
});

// Step 6: Error-handling middleware for 500
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    type: "error",
    status: err.status,
    message: err.message,
    stack: req.app.get("env") === "development" ? err.stack : undefined
  });
});

// Step 7: Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Export the app instead of server
module.exports = app;


app.get('/api/books', (req, res) => {
  try {
    const books = mockDatabase.getBooks(); //an array
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve books', error: error.message });
  }
});

const express = require("express");
const Collection = require("./collection");
module.exports = app;

// database
const books = new Collection([
  { id: 1, title: "The Fellowship of the Ring", author: "J.R.R. Tolkien" },
  { id: 2, title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling" },
  { id: 3, title: "The Two Towers", author: "J.R.R. Tolkien" },
  { id: 4, title: "Harry Potter and the Chamber of Secrets", author: "J.K. Rowling" },
  { id: 5, title: "The Return of the King", author: "J.R.R. Tolkien" },
]);

app.get("/api/books/:id", (req, res) => {
  try {
    const id = req.params.id;

    // Validate that id is a number
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid book ID. Must be a number." });
    }

    const book = books.find(b => b.id === Number(id));

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const request = require('supertest');
const app = require('../app'); // assuming your Express app is exported from app.js

describe('GET /books/:id', () => {
  it('should return a books object with expected properties', async () => {
    const response = await request(app).get('/books/1');

    // Check that the response body is an object
    expect(response.body).toBeInstanceOf(Object);

    // Check that it has specific properties
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('author');
    expect(response.body).toHaveProperty('id');

    // Check that the object matches expected values
    expect(response.body).toEqual({
      id: 1,
      title: 'The Fellowship of the Ring',
      author: 'J.R.R. Tolkien'
    });
  });
});
