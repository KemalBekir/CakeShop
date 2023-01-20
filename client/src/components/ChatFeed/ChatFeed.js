import React, { useRef, useEffect, useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { isSameSenderMargin, isSameUser } from "../../utils/utils";
import "./ChatFeed.css";
import moment from "moment";

const ChatFeed = ({ messages }) => {
  const feedRef = useRef(null);
  const { user } = useContext(AuthContext);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    // Scroll to the bottom of the feed after every new message is received
    feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [messages]);

  return (
    <div ref={feedRef} className="feed-content-container">
      {messages.map((m, i) => (
        <div
          className={`feed-content-text ${
            m.sender._id === user._id ? "from-user" : "from-other"
          }`}
          key={i}
          style={{
            position: "relative",
          }}
          onMouseEnter={() => {
            setSelectedMessage(m);
          }}
          onMouseLeave={() => {
            setSelectedMessage(null);
          }}
        >
          {m.content}
          {selectedMessage === m && (
            <span
              className={`time-stamp ${
                m.sender._id === user._id ? "right" : "left"
              }`}
            >
              {moment(m.createdAt).format("HH:mm")}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatFeed;
