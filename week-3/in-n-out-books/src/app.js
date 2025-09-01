//
name:Leslie Khattarchebli
Date: 8/31/2025
file_Name: app.js
Description: application file
//**


// Require statements
const express = require("express");

// Make Express app
const app = express();

// Route for root for URL
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>In-N-Out Books</title></head>
    </html>
  `);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

});

// Define the middleware configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware function for 404 error

const createError = require('http-errors');

app.use(function(req, res, next) {
  next(createError(404));
});

// Error for 500
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    type: 'error',
    status: err.status || 500,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  });
});

//exporting express application from app.js file
module.exports = app;
const app = require('../app');

