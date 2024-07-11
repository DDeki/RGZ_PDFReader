const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

// Serve static files from the dist directory
app.use('/ocr-home', express.static(path.join(__dirname, 'dist')));

// Handle SPA (Single Page Application) routes
app.get('/ocr-home/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Redirect all other routes to /ocr-home/
app.get('*', (req, res) => {
  if (req.path !== '/ocr-home/') {
    res.redirect('/ocr-home/');
  } else {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:8080/ocr-home/`);
});
