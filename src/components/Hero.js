import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Message from './Message';
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
  width: 100%;
  height: auto;
`;

// Slideshow and Home Page Styles
const SlideshowContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const SlideshowImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  opacity: 0;
  transition: opacity 0.8s ease;

  &.active {
    opacity: 1;
  }
`;

// Chatbot GIF Styles
const ChatbotGif = styled.img`
  width: 50px;
  height: 50px;
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
  right: 15px; /* Position it on the right */
  top: 15px; /* Position it at the top */
  cursor: pointer; /* Change cursor to pointer */
  font-size: 1.5rem; /* Size of the icon */
  color: white; /* Color of the icon */
  transition: color 0.3s ease; /* Transition for hover effect */

  &:hover {
    color: #ff4d4d; /* Change color on hover */
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

// SearchBar Styles
const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute; /* Position over the slideshow */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* Ensure it's above the slideshow */
`;

const SearchBarContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  padding: 30px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  width: 100%; /* Make it full width but constrained by max-width */
  margin: 0 auto;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-right: 20px;

  &::after {
    content: '';
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    pointer-events: none;
    color: #2e582f;
  }
`;

const InputLabel = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: #2e582f;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  padding: 12px 15px;
  padding-right: 40px; /* space for dropdown icon */
  border: 2px solid #ccc;
  border-radius: 12px;
  font-size: 1rem;
  min-width: 250px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #7aab35;
  }
`;

const ExploreButton = styled.button`
  background-color: #2e582f;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #67924d;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none; /* Avoid focus outline flicker */
  }
`;

const PopularSearch = styled.div`
  margin-top: 15px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 150px;
  color: #000;

  button {
    background: none;
    border: none;
    color: #2e582f;
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      text-decoration: none;
    }
  }
`;
const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/transport', { state: { searchQuery: searchInput } });
  };

  return (
    <SearchBarWrapper>
      <div>
        <SearchBarContainer>
          <InputContainer>
            <InputLabel>Location</InputLabel>
            <InputField type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)} placeholder="Enter your destination" />
            <FaChevronDown style={{ position: 'absolute', right: '15px', top: '40px', color: '#7aab35' }} />
          </InputContainer>

          <InputContainer>
            <InputLabel>Date</InputLabel>
            <InputField type="date" placeholder="When will it start?" />
            <FaChevronDown style={{ position: 'absolute', right: '15px', top: '40px', color: '#7aab35' }} />
          </InputContainer>

          <InputContainer>
            <InputLabel>People</InputLabel>
            <InputField type="number" placeholder="How many people?" />
            <FaChevronDown style={{ position: 'absolute', right: '15px', top: '40px', color: '#7aab35' }} />
          </InputContainer>

          <ExploreButton onClick={handleSearchClick}>Explore Now</ExploreButton>
        </SearchBarContainer>

        <PopularSearch>
          Popular Search:
          <button onClick={() => console.log('Mojokerto clicked')}>Mojokerto</button>,
          <button onClick={() => console.log('Yogyakarta clicked')}>Yogyakarta</button>,
          <button onClick={() => console.log('Lombok clicked')}>Lombok</button>,
          <button onClick={() => console.log('Denpasar clicked')}>Denpasar</button>
        </PopularSearch>
      </div>
    </SearchBarWrapper>
  );
};

// App Component (Main homepage with slideshow and chatbot)
const App = () => {
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false); // State for typing indicator
  const chatBodyRef = useRef(null); // Ref for scrolling

  const videoSrc = "/load.mp4";
  const images = [
    '/museum.jpg',
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
        src="/chatbot.png" // Update with your GIF path
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
