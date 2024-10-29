import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignPage from "./pages/SignPage";
import Transport from "./components/Transport";
import TrainDetails from "./components/TrainDetails";
import BusDetail from "./components/BusDetail"; // Import BusDetail
import FlightDetail from "./components/FlightDetail"; // Import FlightDetail
import BlogPage from "./pages/BlogPage";
import FeedbackPage from "./pages/FeedbackPage";
import DestinationPage from "./pages/DestinationPage";
import ContactPage from "./pages/ConatctPage"
import CityDetails from './components/CityDetails';


function App() {
  return (
    <Router>
      {/* The Header is included in every page */}
      <div className="app-container">

        <Routes>
          {/* Route for the Home page */}
          <Route path="/" element={<Home />} />

          {/* Route for the Loginpage */}
          <Route path="/login" element={<LoginPage />} />
          {/* Route for the SignupPage */}
          <Route path="/signup" element={<SignPage />} />

          {/* Route for the Transport page */}
          <Route path="/transport" element={<Transport />} />

          {/* Route for Train Details */}
          <Route path="/trains" element={<TrainDetails />} />  {/* Add this route */}

          <Route path="/buses" element={<BusDetail />} />
          <Route path="/flights" element={<FlightDetail />} />
          <Route path="/Blog" element={<BlogPage />} />
          <Route path="/Contact" element={<ContactPage />} />
          <Route path="/Feedback" element={<FeedbackPage />} />
          <Route path="/Destination" element={<DestinationPage />} />
          <Route path="/city-details/:cityName" element={<CityDetails />} /> {/* Route for city details */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
