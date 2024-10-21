import React from "react";
import "./Transport.css"; // CSS for styling both Header and TourCards
import styled, { keyframes } from 'styled-components';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from "react";



const stationCode = new Map([
  ["ladakh", "NDLS"],
  ["kolkata", "HWH"]
])


// Styled components
const CityGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 40px;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0);
`;

const CityItem = styled.div`
  background-color: #f1f1f1;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0);
  }

  .city-info {
    margin-top: 10px;
  }

  strong {
    font-size: 1.4rem;
    color: #2e582f;
  }

  .city-details {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;

    .city-data {
      background-color: #ffff;
      border-radius: 5px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #98c5cd;
      }

      .label {
        font-weight: bold;
        color: #2e582f;
      }

      .value {
        color: #333;
        font-size: 16px;
      }
    }
  }
`;

// Array of tours
const tours = [
  {
    title: " Train",
    image: "./train.jpg", // Replace with actual image path
    route: "/trains", // Added route for Train
  },
  {
    title: " Road",
    image: "./road.jpg", // Replace with actual image path
    route: "/buses", // Added route for Bus
  },
  {
    title: "Flight",
    image: "./flightt.jpg", // Replace with actual image path
    route: "/flights", // Added route for Flight
  },
];

// Main component that combines the Header and TourCards
const TourPage = () => {

  const location = useLocation();
  const [cities, setCities] = useState([]); // State for cities list
  const { searchQuery, fromWhere } = location.state || ''; // searchQuery->TO || fromWhere->FROM
  const [error, setError] = useState(''); // State for error handling
  const [setTrains] = useState([]);

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
      <CityGrid>
        {cities.map((city, index) => (
          <CityItem key={index}>
            <div className="city-info">
              <strong>{city.City}</strong>
              <div className="city-details">
                <div className="city-data">
                  <span className="label">State:</span>
                  <span className="value">{city.State}</span>
                </div>
                <div className="city-data">
                  <span className="label">Ideal Duration:</span>
                  <span className="value">{city.Ideal_duration || 'N/A'}</span>
                </div>
                <div className="city-data">
                  <span className="label">City Description:</span>
                  <span className="value">{city.City_desc || 'N/A'}</span>
                </div>
              </div>
            </div>
          </CityItem>
        ))}
      </CityGrid>

      {/* Tour Cards Section */}
      <section className="tour-cards-section">
        <h2 className="tour-heading">Choose your tour</h2>
        <div className="tour-cards">
          {tours.map((tour, index) => (
            <div className="tour-card" key={index}>
              <img src={tour.image} alt={tour.title} className="tour-image" />
              <div className="tour-info">
                </div>
                <h3>{tour.title}</h3>
                <div>
                  {/* The arrow button that redirects to the respective detail page */}
                  <button className="arrow-button" onClick={() => handleButtonClick(tour.route)}>
                    --→
                  </button>
                </div>
              </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TourPage;
