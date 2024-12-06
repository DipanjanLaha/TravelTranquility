import React from "react";
import "./Transport.css"; // CSS for styling both Header and TourCards
import styled from 'styled-components';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import SearchBox from "../components/searchbar";


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
  { title: "Train", image: "./train.jpg", route: "/trains" },
  { title: "Road", image: "./road.jpg", route: "/buses" },
  { title: "Flight", image: "./flightt.jpg", route: "/flights" },
];


// Main component that combines the Header and TourCards
const TourPage = () => {
  const location = useLocation();
  const [cities, setCities] = useState([]);
  const { searchQuery, fromWhere } = location.state || {}; // searchQuery->TO || fromWhere->FROM
  const [error, setError] = useState('');
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]); // New state for itinerary
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [showModal2, setShowModal2] = useState(false);
  const [groupedCities, setGroupedCities] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null);


  useEffect(() => {
    if (!searchQuery) return;

    // Fetch cities from backend
    //axios.get(`http://localhost:5000/cities?state=${searchQuery}`)
    axios.get(`http://localhost:5000/places?city=${searchQuery}`)
      .then(response => {
        setCities(response.data);
        groupCities(response.data);
        setError('');
      })
      .catch(() => {
        setError('No cities found for this state');
        setCities([]);
      });
  }, [searchQuery]);

  // Group cities by a specific key (e.g., 'City')
  const groupCities = (data) => {
    const grouped = data.reduce((acc, item) => {
      const key = item.City; // Change to your grouping key
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
    setGroupedCities(grouped);
    console.log(grouped)
  };

   // Handle modal open
   const handleShowModal = (group) => {
    setSelectedGroup(group);
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGroup(null);
  };

  useEffect(() => {
    if (!fromWhere || !searchQuery) return;

    // Fetch train data from API
    axios.get(`http://localhost:5000/trains/${fromWhere}/${searchQuery}`)
      .then(response => {
        setTrains(response.data);
      })
      .catch(error => {
        console.error("Error fetching the train data:", error);
      });
  }, [fromWhere, searchQuery]);

  const navigate = useNavigate();

  // Function to handle city details navigation
  const handleCityClick = (city) => {
    navigate(`/city-details/${city.City}`, { state: { cityData: city } });
  };

  // Function to handle tour navigation
  const handleTourClick = (route) => {
    navigate(route, {
      state: {
        searchInput: searchQuery,
        searchInputFrom: fromWhere, // Pass travel date along with other values
      },
    }); // Navigates to the respective tour route (train, bus, flight)
  };

  const handleAddToItinerary = (city) => {
    if (!selectedCities.includes(city)) {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const handleGenerateItinerary = () => {
    if (selectedCities.length === 0) {
      alert("Please add places to the itinerary.");
    } else {
      //setShowModal2(true); // Show the modal

      // Open a new tab
      console.log(selectedCities);
    const newTab = window.open("", "_blank");

    // Check if the tab was successfully opened
    if (newTab) {
      // Generate HTML content for the itinerary
      const itineraryContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Itinerary</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #333; text-align: center; }
              h3 { color: red; }
              ul { list-style-type: none; padding: 0; }
              li { margin: 5px 0; font-size: 18px; }
            </style>
          </head>
          <body>
            <h1>Your Itinerary</h1>
            <ul>
              ${selectedCities.map((city, index) => `
                  <li>
                    <h3>Day ${index + 1} ${city[1]}: ${city[0].slice(4)}</h3>
                    <p>${city[2]}</p>
                  </li>`
                ).join("")}
            </ul>
          </body>
        </html>
      `;

      // Write the content to the new tab
      newTab.document.write(itineraryContent);
      newTab.document.close(); // Close the document stream
    } else {
      alert("Unable to open a new tab. Please check your browser's popup blocker settings.");
    }
    }
  };

  //const handleShowModal2 = () => setShowModal2(true);
  const handleCloseModal2 = () => setShowModal2(false);

  return (
    <div className="tour-page-container">
      {/* List of Destinations */}
      <div className="topic">
        <h1>Places to visit..</h1>
        <SearchBox></SearchBox>
      </div>

      <div>
      <CityGrid>
        {Object.keys(groupedCities).map((group, index) => (
          <CityItem key={index} >
            <div className="card-body">
              <h5 className="card-title">{group}</h5>
              <img src={`http://localhost:5000/uploads/${group}.jpg`}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
              alt={group}/>
              <p className="card-text">
                Explore the best places in {group}!
              </p>
              <button
                className="btn btn-primary"
                onClick={() => handleShowModal(group)}
              >
                View All in {group}
              </button>
            </div>
          </CityItem>
        ))}
      </CityGrid>

      {/* React Bootstrap Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Places in {selectedGroup}</Modal.Title>
        </Modal.Header>
        <Modal.Body
        style={{
          maxHeight: "600px", // Set a maximum height
          overflowY: "auto",  // Enable vertical scrolling
        }}>
          {selectedGroup &&
            groupedCities[selectedGroup].map((city, index) => (
              <div key={index} className="modal-item">
                <h5>{city.Place}</h5>
                <img
                  src={`http://localhost:5000/uploads/${city.imageUrl}`}
                  alt={city.City}
                  className="city-image"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />
                <p>{city.Place_desc}</p>
                <button
                className="btn btn-primary"
                onClick={() => handleAddToItinerary([city.Place, city.City, city.Place_desc])}
              >
                Add To Itenary
              </button>
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

      {/*<CityGrid>
        {cities.map((city, index) => (
          <CityItem key={index}>
            <div className="card-body">
              {/* Log the image URL */}
              {/*{console.log(`Image URL: http://localhost:5000/uploads/${city.imageUrl}`)}
              <img
                src={`http://localhost:5000/uploads/${city.imageUrl}`}
                alt={city.City}
                className="city-image"
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <h5 className="card-title">{city.City}</h5>
              <p className="card-text">Explore the best places in {city.City}!</p>
              <button
                className="btn btn-primary"
                onClick={() => handleCityClick(city)}
              >
                Explore More
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleAddToItinerary(city)}
              >
                Add To Itenary
              </button>
            </div>
          </CityItem>
        ))}
      </CityGrid>*/}

      <div className="mt-4 text-center">
        <button className="btn btn-success" onClick={handleGenerateItinerary}>
          Generate Itinerary
        </button>
      </div>


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

      {/* Bootstrap Modal for Itinerary */}
      <Modal show={showModal2} onHide={handleCloseModal2}>
        <Modal.Header closeButton>
          <Modal.Title>Your Itinerary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group">
            {selectedCities.map((city, index) => (
              <li key={index} className="list-group-item">
                <h5>{"Day "+[index+1]+" "+city[0].slice(4)+", "+city[1]}</h5>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TourPage;
