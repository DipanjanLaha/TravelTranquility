import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import Message from './Message';
import { MdClose } from 'react-icons/md';
import './Homepage.css';

// Styled Components for Chatbot


const ChatbotGif = styled.img`
  width: 80px;
  height: 80px;
  position: fixed;
  bottom: 20px;
  left: 20px;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const CloseIcon = styled(MdClose)`
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
  font-size: 1.5rem;
  color: white;
  transition: color 0.3s ease;
  &:hover {
    color: #ff4d4d;
  }
`;

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 80px;
  left: 20px;
  width: 300px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.visible ? 'block' : 'none')};
  z-index: 1000;
`;

const ChatbotHeader = styled.div`
  background-color: #7aab35;
  color: white;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
  font-weight: bold;
`;

const ChatbotBody = styled.div`
  padding: 10px;
  overflow-y: auto;
  height: calc(100% - 50px);
`;

const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
`;

const ChatInput = styled.input`
  width: calc(100% - 40px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const TypingIndicator = styled.div`
  font-style: italic;
  color: gray;
  margin: 5px 0;
`;

const Homepage = ({ images, currentImageIndex, handleSearchClick, navigate }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchInputFrom, setSearchInputFrom] = useState('');
  const [travelDate, setTravelDate] = useState('');

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundColor: '#333',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <div className="transparent-container">
        <nav className="navbar">
          <div className="transparent-containers">
            <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">About Us</Link></li>
            <li><Link to="/Destination">Explore</Link></li>
            <li><Link to="/Blog">Blog</Link></li>
            <li><Link to="/Contact">Contact</Link></li>
            </ul>
            <div className="navbar-search">
  <input type="text" placeholder="Search..." className="search-input" />
</div>

          </div>
        </nav>
        <h1 className="explore-heading">
          Explore beyond Boundaries,
          <span className="explore-subheading">Travel beyond Expectations</span>
          <span className="explore-subheadings">
            We don't just plan trips, we craft unforgettable adventures.
          </span>
        </h1>
        <div className="search-bar-wrapper">
          <div className="search-bar-container">
            <div className="input-container">
              <label className="input-label">Location</label>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter your destination"
                className="input-field"
              />
            </div>
            <div className="input-container">
              <label className="input-label">From</label>
              <input
                type="text"
                value={searchInputFrom}
                onChange={(e) => setSearchInputFrom(e.target.value)}
                placeholder="Enter your location"
                className="input-field"
              />
            </div>
            <div className="input-container">
              <label className="input-label">Date</label>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="input-container">
      <label className="input-label">Number of People</label>
      <input
        type="number"
        min="1"
        placeholder="Enter number of people"
        className="input-field"
      />
    </div>
            <button className="explore-button" onClick={handleSearchClick}>
              Explore Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);
  const firstTimeOpenRef = useRef(true);

  const images = ['/g.jpg', '/Czech-Fields-Houses.jpg', '/Gangtok.jpg', '/pool.jpg', '/temple.jpeg.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleSearchClick = () => {
    navigate('/transport', {
      state: {
        searchQuery: 'searchInput',
        fromWhere: 'searchInputFrom',
        travelDate: 'travelDate',
      },
    });
  };

  const toggleChatbot = () => {
    setChatbotVisible((prev) => !prev);
    if (firstTimeOpenRef.current) {
      setMessages((prev) => [...prev, { text: 'Hello, how can I help you?', isUser: false }]);
      firstTimeOpenRef.current = false;
    }
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessage = { text: input, isUser: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = { text: 'Can you elaborate?', isUser: false };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <Homepage
        images={images}
        currentImageIndex={currentImageIndex}
        handleSearchClick={handleSearchClick}
        navigate={navigate}
      />
      <ChatbotGif src="/bot.png" alt="Chatbot" onClick={toggleChatbot} />
      <ChatbotContainer visible={chatbotVisible}>
        <ChatbotHeader>
          Chat with us!
          <CloseIcon onClick={() => setChatbotVisible(false)} />
        </ChatbotHeader>
        <ChatbotBody ref={chatBodyRef}>
          {messages.map((message, index) => (
            <Message key={index} text={message.text} isUser={message.isUser} />
          ))}
          {isTyping && <TypingIndicator>Typing...</TypingIndicator>}
        </ChatbotBody>
        <ChatInputContainer>
          <ChatInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
          />
        </ChatInputContainer>
      </ChatbotContainer>
    </>
  );
};

export default App;
