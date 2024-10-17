const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors'); // Enable CORS to allow frontend access

const app = express();
const port = 5000;

app.use(cors()); // Allow CORS

app.get('/api/csv-data', (req, res) => {
  const results = [];

  fs.createReadStream('updated_City.csv')
    .pipe(csv())
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', () => {
      res.json(results); // Send CSV data as JSON
    });
});

let cities = [];

// Function to load CSV file
function loadCities() {
  fs.createReadStream('updated_City.csv')  // Replace with the path to your CSV
    .pipe(csv())
    .on('data', (row) => {
      cities.push(row);  // Each row contains a city and state
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
}

// Call the function to load cities data when the server starts
loadCities();

// Define the route to search cities by state
app.get('/cities', (req, res) => {
  const state = req.query.state;

  if (!state) {
    return res.status(400).send('State query parameter is required');
  }

  // Filter cities that match the state
  const filteredCities = cities.filter(city => city.State.toLowerCase() === state.toLowerCase());

  if (filteredCities.length > 0) {
    res.json(filteredCities);  // Return only the city names
  } else {
    res.status(404).send('No cities found for the given state');
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
