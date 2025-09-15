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

