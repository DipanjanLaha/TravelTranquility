import React, { useEffect, useState } from 'react';
import axios from 'axios';  // You can use axios for API calls or fetch API
import './TrainDetails.css';




function TrainDetails() {
  const [trains, setTrains] = useState([]);
  const [srcCode, setSrcCode] = useState('BWN');  // Default value for source code
  const [destCode, setDestCode] = useState('HWH');  // Default value for destination code
  const [loading, setLoading] = useState(false);  // To manage loading state
  const [error, setError] = useState(null);  // To manage errors

  // Fetch train details when srcCode or destCode changes
  useEffect(() => {
    if (srcCode && destCode) {
      setLoading(true);  // Set loading to true when fetching starts
      setError(null);  // Clear any previous errors
      axios.get(`http://localhost:5000/trains/${srcCode}/${destCode}`)
        .then(response => {
          setTrains(response.data);
          setLoading(false);  // Set loading to false when data is fetched
        })
        .catch(error => {
          console.error("There was an error fetching the train data!", error);
          setError('Failed to fetch train data');  // Set error message
          setLoading(false);  // Stop loading on error
        });
    }
  }, [srcCode, destCode]);  // Trigger the useEffect when srcCode or destCode changes

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Fetch will automatically trigger due to useEffect watching srcCode and destCode
  };

  return (
    <div className="train-details-container">
      <h1>Train Details</h1>

      {/* Form for source and destination input */}
      <form onSubmit={handleFormSubmit}>
        <label>
          Source Code:
          <input
            type="text"
            value={srcCode}
            onChange={(e) => setSrcCode(e.target.value)}
          />
        </label>
        <br />
        <label>
          Destination Code:
          <input
            type="text"
            value={destCode}
            onChange={(e) => setDestCode(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Fetch Trains</button>
      </form>

      {/* Loading, error, or data display */}
      {loading ? (
        <p>Loading train details...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="train-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Train Name</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Departure Date</th>
              <th>Departure Time</th>
              <th>Duration</th>
              <th>Distance</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((train, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{train.trainName}</td>
                <td>{train.sourceStation || 'N/A'}</td>
                <td>{train.destinationStation || 'N/A'}</td>
                <td>{train.departureDate || 'N/A'}</td>
                <td>{train.departureTime || 'N/A'}</td>
                <td>{train.duration || 'N/A'}</td>
                <td>{train.distance || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TrainDetails;
