const request = require('supertest');
const app = require('./app'); //

describe('Chapter 3: API Tests', () => {
  test('Should return an array of books', async () => {
    const response = await request(app).get('/api/books');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Should return a single book', async () => {
    const response = await request(app).get('/api/books/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  test('Should return a 400 error if the id is not a number', async () => {
    const response = await request(app).get('/api/books/abc');
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid book ID. Must be a number.');
  });
});


//Start of Week 5
//Chapter 4: API Tests
request(app).post('/books').send({ title: 'Clean Code' });

const request = require('supertest');
const app = require('../app'); // adjust path if needed

describe('Chapter 4: API Tests', () => {
  let bookId;

  // a. Should return a 201-status code when adding a new book
  test('Should return 201 when adding a new book', async () => {
    const res = await request(app)
      .post('/books')
      .send({ title: 'Clean Code', author: 'Robert C. Martin' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Clean Code');
    expect(res.body.author).toBe('Robert C. Martin');

    bookId = res.body.id;
  });

  // b. Should return a 400-status code when adding a new book with missing title
  test('Should return 400 when adding a book with missing title', async () => {
    const res = await request(app)
      .post('/books')
      .send({ author: 'Unknown Author' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  // c. Should return a 204-status code when deleting a book
  test('Should return 204 when deleting a book', async () => {
    const res = await request(app).delete(`/books/${bookId}`);
    expect(res.statusCode).toBe(204);
  });
});
//End of Week 5


//Start: of Week 6

const request = require("supertest");
const express = require("express");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");

// Users.js - database
const users = require("users.js");

// Login route tests
app.post("/api/login", (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createError(400, "Bad Request");
    }

    const user = users.find(u => u.email === email);
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      throw createError(401, "Unauthorized");
    }

    res.status(200).json({ message: "Authentication successful" });
  } catch (err) {
    next(err);
  }
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    type: "error",
    status: err.status || 500,
    message: err.message
  });
});

describe("Chapter 6: API Tests", () => {
  test("Logs user in and returns a 200-status", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: validEmail, password: validPassword });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Authentication successful");
  });

  test("Returns a 401-status", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: validEmail, password: invalidPassword });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });

  test("Return a 400-status code", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: "" }); // Missing password

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Bad Request");
  });
});
// End: of Week 6