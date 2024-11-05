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

// Serve the images from the public directory
app.use('/uploads', express.static('uploads'));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Sample city data with image URLs
const citiesData = [
  { City: 'Goa', imageUrl: '/uploads/goa_img.png' },
  // Add more cities as needed
];

// API endpoint to fetch cities by state
app.get('/cities', (req, res) => {
  const { state } = req.query;
  const filteredCities = citiesData.filter(city => city.City.toLowerCase() === state.toLowerCase());
  if (filteredCities.length > 0) {
    res.json(filteredCities);
  } else {
    res.status(404).json({ error: 'No cities found for this state' });
  }
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
