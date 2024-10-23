import React from "react";
import "./Transport.css"; // CSS for styling both Header and TourCards
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
// Station codes mapping
const stationCode = new Map([
  ["ladakh", "NDLS"],
  ["kolkata", "HWH"]
]);

// Styled components for CityGrid and CityItem
const CityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 40px;
  padding: 20px;
  background-color: #f9f9f9;
`;

const CityItem = styled.div`
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    animation: bounceToTop 0.6s ease forwards; /* Apply bounce animation */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    background-color: #f0f8ff;
    color: #1d4f91;

    /* Update the child elements when parent is hovered */
    .card-title {
      color: #1d4f91;
    }

    .card-text {
      color: #555;
    }

    h6 {
      color: #777;
    }
  }

  /* Keyframes for bounce animation */
  @keyframes bounceToTop {
    0% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-10px);
    }
    50% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-5px); /* Subtle final bounce position */
    }
  }

  .card-body {
    padding: 20px;
  }

  .card-title {
    font-size: 1.6rem;
    color: #2e582f;
    margin-bottom: 12px;
    font-weight: bold;
    transition: color 0.3s ease;
  }

  .card-text {
    font-size: 1rem;
    color: #333;
    margin-bottom: 15px;
    transition: color 0.3s ease;
  }

  h6 {
    font-size: 15px;
    margin-bottom: 12px;
    color: #aaaa;
    transition: color 0.3s ease;
  }

  .btn {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
      background-color: #0056b3;
      transform: translateY(-3px); /* Slight button lift on hover */
    }
  }
`;

// Array of tours
const tours = [
  {
    title: "Train",
    image: "./train.jpg",
    route: "/trains",
  },
  {
    title: "Road",
    image: "./road.jpg",
    route: "/buses",
  },
  {
    title: "Flight",
    image: "./flightt.jpg",
    route: "/flights",
  },
];

// Main component that combines the Header and TourCards
const TourPage = () => {
  const location = useLocation();
  const [cities, setCities] = useState([]);
  const { searchQuery, fromWhere } = location.state || {}; // searchQuery->TO || fromWhere->FROM
  const [error, setError] = useState('');
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);

  const srcCode = stationCode.get(`${searchQuery}`); // getting SRC station code from map
  const destCode = stationCode.get(`${fromWhere}`); // getting DEST station code from map

  useEffect(() => {
    if (!searchQuery) return;

    // Fetch cities from backend
    axios.get(`http://localhost:5000/cities?state=${searchQuery}`)
      .then(response => {
        setCities(response.data);
        setError('');
      })
      .catch(() => {
        setError('No cities found for this state');
        setCities([]);
      });
  }, [searchQuery]);

  useEffect(() => {
    if (!srcCode || !destCode) return;

    // Fetch train data from API
    axios.get(`http://localhost:5000/trains/${srcCode}/${destCode}`)
      .then(response => {
        setTrains(response.data);
      })
      .catch(error => {
        console.error("Error fetching the train data:", error);
      });
  }, [srcCode, destCode]);

  const navigate = useNavigate();

  // Function to handle city details navigation
  const handleCityClick = (city) => {
    navigate(`/city-details/${city.City}`, { state: { cityData: city } });
  };

  // Function to handle tour navigation
  const handleTourClick = (route) => {
    navigate(route); // Navigates to the respective tour route (train, bus, flight)
  };

  return (
    <div className="tour-page-container">
      {/* Logo Section */}
      <div className="logo-container">
        <Link to="/">
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
            <img src="./bookk.gif" alt="Easy Booking" />
            <h3>Easy booking</h3>
            <p>Quick and easy booking for upcoming dates</p>
          </div>
          <div className="feature-item">
            <img src="./guide.gif" alt="Digital Tour Guide" />
            <h3>Digital tour guide</h3>
            <p>Our digital tour guide is ready to guide your trip</p>
          </div>
          <div className="feature-item">
            <img src="./prom.gif" alt="Lots of Promos" />
            <h3>Lots of promos</h3>
            <p>Various promotions and drawings of tours</p>
          </div>
        </div>
      </section>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {/* List of Destinations */}
      <div className="topic">
        <h1>Places to visit..</h1>
      </div>
      <CityGrid>
        {cities.map((city, index) => (
          <CityItem key={index}>
            <div className="card-body">
              <h5 className="card-title">{city.City}</h5>
              <h6>Explore more</h6>
              <FontAwesomeIcon
                icon={faCircleChevronDown}
                size="2x"
                onClick={() => handleCityClick(city)}
                style={{ cursor: 'pointer', color: '#2e582f' }}
              />
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
              <h3>{tour.title}</h3>
              <button className="arrow-button" onClick={() => handleTourClick(tour.route)}>
              <FontAwesomeIcon icon={faCaretRight} size="2x" />              
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TourPage;
