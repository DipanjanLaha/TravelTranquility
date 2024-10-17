import React from 'react';
import './Message.css'; // For message-specific styles

const Message = ({ text, sender }) => {
  return (
    <div className={`chat-message ${sender === 'user' ? 'user' : 'bot'}`}>
      <p>{text}</p>
    </div>
  );
};

export default Message;
