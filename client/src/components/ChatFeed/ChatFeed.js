import React from "react";
import "./ChatFeed.css";

const ChatFeed = ({ messages }) => {
  return (
    <div className="feed-content-container">
      {messages.map((message, index) => (
        <div
        className="feed-content-text"
          key={index}
        >
          {message.content}
        </div>
      ))}
    </div>
  );
};

export default ChatFeed;
