const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors'); // Enable CORS to allow frontend access
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 5000;

app.use(cors()); // Allow CORS

// Function to fetch train details between two stations
async function getTrainsBetweenStations(sourceStation, destinationStation) {
  // Base URL for erail.com
  const url = `https://erail.in/trains-between-stations/${sourceStation}/${destinationStation}`;
  
  try {
    // Fetch the HTML from the erail.com page
    const response = await axios.get(url);
    const html = response.data;

    // Load the HTML into cheerio
    const $ = cheerio.load(html);

    // Array to store train information
    const trains = [];

    // Find all div elements with class 'OneTrain'
    $('div.OneTrain').each((index, element) => {
      const trainData = $(element).attr('data-train').split('_');

      const trainDetails = {
        trainNumber: trainData[0],
        trainName: trainData[1],
        sourceStation: trainData[2],
        destinationStation: trainData[3],
        departureDate: trainData[4],
        departureTime: trainData[5],
        arrivalDate: trainData[6],
        arrivalTime: trainData[7],
        duration: trainData[8],
        distance: trainData[9],
        delay: trainData[10],
        onTime: trainData[11],
      };

      // Push the train details into the array
      trains.push(trainDetails);
    });

    // Return the list of trains
    return trains;

  } catch (error) {
    console.error(`Error fetching train data: ${error}`);
    return [];
  }
}

app.get('/trains/:sourceStation/:destinationStation', async (req, res) => {
  const { sourceStation, destinationStation } = req.params;
  
  // Fetch train details
  const trains = await getTrainsBetweenStations(sourceStation, destinationStation);
  
  if (trains.length === 0) {
    res.status(404).send('No trains found');
  } else {
    res.json(trains);
  }
});

//Getting destination places and Data
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
