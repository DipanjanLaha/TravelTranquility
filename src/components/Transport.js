import React from "react";
import "./Transport.css"; // CSS for styling both Header and TourCards
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from "react";

const CityList = styled.ul`
  margin-top: 20px;
  list-style-type: none;
  padding-left: 0;
`;

const CityItem = styled.li`
  font-size: 1rem;
  color: #333;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
`;

const stationCode = new Map([
  ["ladakh", "NDLS"],
  ["kolkata", "HWH"]
])

// Array of tours
const tours = [
  {
    title: "Train",
    rating: "5.0",
    image: "./train.jpg", // Replace with actual image path
    route: "/trains", // Added route for Train
  },
  {
    title: "Bus",
    rating: "4.9",
    image: "./bus.jpg", // Replace with actual image path
    route: "/buses", // Added route for Bus
  },
  {
    title: "Flight",
    rating: "5.0",
    image: "./flight.jpeg", // Replace with actual image path
    route: "/flights", // Added route for Flight
  },
];

// Main component that combines the Header and TourCards
const TourPage = () => {

  const location = useLocation();
  const [cities, setCities] = useState([]); // State for cities list
  const { searchQuery, fromWhere } = location.state || ''; // searchQuery->TO || fromWhere->FROM
  const [error, setError] = useState(''); // State for error handling
  const [trains, setTrains] = useState([]);

  var srcCode = stationCode.get(`${searchQuery}`); // getting SRC station code from map
  var destCode = stationCode.get(`${fromWhere}`); // getting DEST station code from map

  useEffect(() => {
    if (!searchQuery) return; // Do nothing if state input is empty

    // Fetch cities from backend
    axios.get(`http://localhost:5000/cities?state=${searchQuery}`)
      .then(response => {
        setCities(response.data); // Update the cities list with full objects
        setError(''); // Clear any previous error
      })
      .catch(err => {
        setError('No cities found for this state'); // Show error if no cities found
        setCities([]); // Clear cities if error
      });
  }, [searchQuery]);

  useEffect(() => {
    // Example: Fetching data from an API (you can replace this with your actual API)
    axios.get(`http://localhost:5000/trains/${srcCode}/${destCode}`)
      .then(response => {
        setTrains(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the train data!", error);
      });

    // Alternatively, use static train data like this:
    // setTrains([
    //   { id: 1, name: 'Express 101', source: 'City A', destination: 'City B', time: '10:00 AM' },
    //   { id: 2, name: 'Local 202', source: 'City C', destination: 'City D', time: '2:00 PM' },
    //   { id: 3, name: 'SuperFast 303', source: 'City E', destination: 'City F', time: '6:00 PM' }
    // ]);
  }, []);
  

  const navigate = useNavigate(); // Declare the useNavigate hook

  // Function to handle button click and navigate to detail page
  const handleButtonClick = (route) => {
    navigate(route); // Redirect to the corresponding detail page
  };

  return (
    <div className="tour-page-container">

      {/* Logo Section */}
      <div className="logo-container">
        <Link to="/"> {/* Link that redirects to homepage */}
          <img src="/destination.png" alt="Travel Tranquility Logo" className="logo" />
        </Link>

        <span className="logo-text">TRANQUILITY</span>
      </div>

      {/* Header Section */}
      <section className="header-section">
        <h1>Top values for you</h1>
        <p>Try a variety of benefits when using our services</p>
        <div className="features">
          <div className="feature-item">
            <img src="./plane.gif" alt="Airport Pickup" />
            <h3>Airport pickup</h3>
            <p>We provide escort from the airport to the hotel</p>
          </div>
          <div className="feature-item">
            <img src="./booking.gif" alt="Easy Booking" />
            <h3>Easy booking</h3>
            <p>Quick and easy booking of tours for upcoming dates</p>
          </div>
          <div className="feature-item">
            <img src="./guide.gif" alt="Digital Tour Guide" />
            <h3>Digital tour guide</h3>
            <p>Our digital tour guide is ready to guide your trip</p>
          </div>
          <div className="feature-item">
            <img src="./promo.gif" alt="Lots of Promos" />
            <h3>Lots of promos</h3>
            <p>Various promotions and drawings of tours</p>
          </div>
        </div>
      </section>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {/* List of Destinations */}
      <CityList>
        {cities.map((city, index) => (
          <CityItem key={index}>
            <div>
              <strong>{city.City}</strong>, {city.State}
            </div>
            <div><flex>
              {/* Add any other data you want to display */}
              Ideal Duration: {city.Ideal_duration || 'N/A'}
              City Desc: {city.City_desc || 'N/A'}
            </flex>
            </div>
          </CityItem>
        ))}
      </CityList>

      <div className="train-details-container">
      <h1>Train Details</h1>

      {trains.length === 0 ? (
        <p>Loading train details...</p>
      ) : (
        <table className="train-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Train Name</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((train, index) => (
              <><div>
                <strong>{train.trainNumber}</strong>, {train.trainName}, {train.sourceStation || 'N/A'}, {train.destinationStation || 'N/A'},
                {train.departureDate || 'N/A'}, {train.departureTime || 'N/A'}, {train.duration || 'N/A'}, {train.distance || 'N/A'}
              </div><div><flex>
                {/* Add any other data you want to display */}
              </flex>
                </div></>
            ))}
          </tbody>
        </table>
      )}
    </div>

      {/* Tour Cards Section */}
      <section className="tour-cards-section">
        <h2 className="tour-heading">Choose your tour</h2>
        <div className="tour-cards">
          {tours.map((tour, index) => (
            <div className="tour-card" key={index}>
              <img src={tour.image} alt={tour.title} className="tour-image" />
              <div className="tour-info">
                <div className="tour-rating">
                  <span>{tour.rating}</span>
                  <span className="star-icon">★</span>
                </div>
                <h3>{tour.title}</h3>
                <div>
                  {/* The arrow button that redirects to the respective detail page */}
                  <button className="arrow-button" onClick={() => handleButtonClick(tour.route)}>
                    --→
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TourPage;
