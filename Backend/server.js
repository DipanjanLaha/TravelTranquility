const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve images folder as static files
app.use('/images', express.static(path.join(__dirname, 'images')));

// Endpoint to get list of cities
app.get('/api/cities', (req, res) => {
  const imagesDir = path.join(__dirname, 'images');
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).send({ error: 'Unable to scan directory' });
    }

    // Filter image files with .png extension and remove file extensions to get city names
    const cityNames = files
      .filter(file => file.endsWith('.png')) // Adjusted to filter `.png` files
      .map(file => ({
        name: path.parse(file).name,
        imageUrl: `/images/${file}`,
      }));

    res.send({ cities: cityNames });
  });
});

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/auth-demo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
