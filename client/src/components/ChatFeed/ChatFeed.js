import React, { useRef, useEffect } from "react";
import "./ChatFeed.css";

const ChatFeed = ({ messages }) => {
  const feedRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the feed after every new message is received
    feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [messages]);
  
  return (
    <div ref={feedRef} className="feed-content-container">
      {messages.map((message, index) => (
        <div className="feed-content-text" key={index}>
          {message.content}
        </div>
      ))}
    </div>
  );
};

export default ChatFeed;
