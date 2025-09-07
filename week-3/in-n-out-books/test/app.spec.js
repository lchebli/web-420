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
