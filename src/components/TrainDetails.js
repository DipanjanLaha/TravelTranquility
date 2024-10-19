import React, { useEffect, useState } from 'react';
import axios from 'axios';  // You can use axios for API calls or fetch API

function TrainDetails() {
  const [trains, setTrains] = useState([]);

  // Fetch train details from the API or use static data
  useEffect(() => {
    // Example: Fetching data from an API (you can replace this with your actual API)
    axios.get('http://localhost:5000/trains/BWN/HWH')
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

  return (
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
  );
}

export default TrainDetails;
