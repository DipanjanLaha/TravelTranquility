import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import Message from './Message';
import './Hero.css';
import { MdClose } from 'react-icons/md';


// Loading Page (Splash Screen) Styles
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Video = styled.video`
  width: 50vw;
  height: 50vh;
`;

// Slideshow and Home Page Styles
const SlideshowContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const SlideshowImage = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.8s ease;
  &.active {
    opacity: 1;
  }
`;

// Chatbot GIF Styles
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

// Chatbot Modal Styles
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

const ExploreButton = styled.button`
  background-color: #2e582f;
  color: white;
  padding: 12px 17px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #67924d;
  }

  &:focus {
    outline: none;
  }
`;

const PopularSearch = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 1rem;
  font-weight: 200px;
  gap:10px;
  color: black;

  button {
    background: none;
    border: none;
    color: black;
    font-weight: bold;
    cursor: pointer;

    
  }
`;



const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchInputFrom, setSearchInputFrom] = useState('');
  const navigate = useNavigate();
  const [travelDate, setTravelDate] = useState(''); // State for storing date
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchClick = () => {
    //*navigate('/transport', { state: { searchQuery: searchInput, fromWhere: searchInputFrom } });
    //*console.log("Travel Date:", travelDate);
    navigate('/transport', {
      state: {
        searchQuery: searchInput,
        fromWhere: searchInputFrom,
        travelDate: travelDate, // Pass travel date along with other values
      },
    });
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchInput.trim()) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/suggestions?q=${encodeURIComponent(searchInput)}`);
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce the API calls
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchInput]);


  return (
<div className='app'>
            <div className="transparent-container">
                <nav className="navbar">
                    <div className="transparent-containers">
                        <ul className="navbar-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/Destination">Destinations</Link></li>
                        <li><Link to="/Feedback">Feedbacks</Link></li>
                         <li><Link to="/Blog">Blog</Link></li>
                         <li><Link to="/Contact">Contact</Link></li>
                        </ul>

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
                                />
                        </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
  <div className="suggestions-dropdown">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchInput(suggestion);
                      setSuggestions([]);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              
              )}
          

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
                            <label className="input-label">People</label>
                            <input type="number" placeholder="How many people?" className="input-field" />
                        </div>

          <ExploreButton onClick={handleSearchClick}>Explore Now</ExploreButton>
        

        <PopularSearch>
          Popular Search:
          <button onClick={() => console.log('Munnar clicked')}>Munnar</button>,
          <button onClick={() => console.log('Goa clicked')}>Goa</button>,
          <button onClick={() => console.log('Manali clicked')}>Manali</button>,
          <button onClick={() => console.log('Varanasi clicked')}>Varanasi</button>
        </PopularSearch>
      </div>
 </div>
</div>
</div>
  );
};

// Main App Component
const App = () => {
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);
  const firstTimeOpenRef = useRef(true); // Track if chatbot is opened for the first time

  const videoSrc = '/tranquility.mp4';
  const images = [
    '/g.jpg',
    '/Czech-Fields-Houses.jpg',
    '/Gangtok.jpg',
    '/pool.jpg',
    '/temple.jpeg.jpg',
];

  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
}, [images.length]);


  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight; // Scroll to the bottom
    }
  }, [messages]);

  const toggleChatbot = () => {
    setChatbotVisible((prev) => !prev);

    if (firstTimeOpenRef.current) {
      // Add welcome message the first time chatbot opens
      setMessages((prev) => [...prev, { text: 'Hello, what can I help you with?', isUser: false }]);
      firstTimeOpenRef.current = false; // Mark as no longer the first time
    }
  };

  const handleSend = () => {
    if (input.trim() === '') return; // Prevent sending empty messages
    const newMessage = { text: input, isUser: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate chatbot response after 1 second
    setTimeout(() => {
      const botResponse = getBotResponse(input); // Get a bot response based on user input
      setMessages((prevMessages) => [...prevMessages, botResponse]);
      setIsTyping(false); // Hide typing indicator
    }, 1000);
  };

  const closeChatbot = () => {
    setChatbotVisible(false); // Hide the chatbot
  };

  const getBotResponse = (input) => {
    const lowerCaseInput = input.toLowerCase();
    let responseText;


    // Define keywords for various responses
    const greetings = ['hello', 'hi', 'hey'];
    const helpKeywords = ['help', 'assist', 'support'];
    const bookingKeywords = ['book', 'reservation', 'schedule'];

    // Check for greetings
    if (greetings.some((greeting) => lowerCaseInput.includes(greeting))) {
      responseText = 'Hello! How can I assist you today?';
    }
    // Check for help-related keywords
    else if (helpKeywords.some((keyword) => lowerCaseInput.includes(keyword))) {
      responseText = 'I can help you with finding locations and travel information.';
    }
    // Check for booking-related keywords
    else if (bookingKeywords.some((keyword) => lowerCaseInput.includes(keyword))) {
      responseText = 'What would you like to book? A flight, hotel, or something else?';
    }
    // Default response for unrecognized input
    else {
      responseText = 'I\'m sorry, I didn\'t understand that. Can you please rephrase?';
    }

    return { text: responseText, isUser: false };
  };


  if (loading) {
    return (
      <LoadingContainer>
        <Video autoPlay loop muted>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support HTML5 video.
        </Video>
      </LoadingContainer>
    );
  }

  return (
    <SlideshowContainer>
      {images.map((src, index) => (
        <SlideshowImage
          key={index}
          src={src}
          className={index === currentImageIndex ? 'active' : ''}
        />
      ))}

      <SearchBar />

      <ChatbotGif
        src="/bot.png" // Update with your GIF path
        alt="Chatbot"
        onClick={toggleChatbot}
      />

      <ChatbotContainer visible={chatbotVisible}>
        <ChatbotHeader>Chat with us!</ChatbotHeader>
        <CloseIcon onClick={closeChatbot} /> {/* Close icon */}
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
    </SlideshowContainer>
  );
};

export default App;
