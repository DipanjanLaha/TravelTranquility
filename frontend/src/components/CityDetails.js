import React from 'react';
import { useLocation } from 'react-router-dom';
import './CityDetails.css'; // Import the CSS file

const CityDetails = () => {
  const location = useLocation();
  const { cityData } = location.state || {}; // Retrieve city data from navigation state

  // Mock data for sightseeing images
  const sightseeing = [
    { title: 'Activities', image: '/sport.jpg' },
    { title: 'Beautiful Park', image: '/park.jpg' },
    { title: 'Famous Museum', image: '/mue.jpg' },
  ];

  return (
    <div className="city-details-container">
      {cityData ? (
        <div>
          {/* Main section with city image and description */}
          <div className="hero-section">
            <div className="hero-text">
              <h1>{cityData.City}</h1>
              <p>{cityData.City_desc || 'No description available'}</p>
              <p>Days: {cityData.days || 'N/A'}</p>
            </div>
            <img src="/goaa.jpg" alt={`${cityData.City}`} />
          </div>

          {/* Sightseeing section */}
          <h2>Sightseeing Spots</h2>
          <div className="sightseeing-section">
            {sightseeing.map((spot, index) => (
              <div className="sightseeing-item" key={index}>
                <img src={spot.image} alt={spot.title} />
                <p>{spot.title}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No city details available.</p>
      )}
    </div>
  );
};

export default CityDetails;
