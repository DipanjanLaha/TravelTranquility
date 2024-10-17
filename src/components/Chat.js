import React, { useState } from 'react';
import Message from './Message';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Simulate bot responses based on user input
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes('hello')) {
      return 'Hello! How can I assist you today?';
    } else if (message.includes('how are you')) {
      return 'I am a bot, but I\'m doing well! How about you?';
    } else {
      return 'I\'m not sure what you mean. Could you rephrase that?';
    }
  };

  // Function to handle sending messages
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);

    // Bot response after user message
    const botMessage = { text: getBotResponse(input), sender: 'bot' };
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 500); // Simulated delay for bot response

    setInput(''); // Clear input field
  };

  // Function to handle 'Enter' key press for sending message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <Message key={index} text={message.text} sender={message.sender} />
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
