import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./ChatPopUp.css";
import { Field, Formik } from "formik";

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      event.preventDefault();
      //add socket.emit and message service
      setNewMessage('');
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className="chat-container">
        <FontAwesomeIcon icon={faCommentDots} />
      </button>
      {isOpen ? (
        <div className="chat-window">
          <div className="chat-window-top">
            <button className="chat-btn" onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          {/* Your chat content goes here */}
          <form onKeyDown={sendMessage}>
            <input
              className="chat-input"
              placeholder="Enter a message..."
              onChange={typingHandler}
              value={newMessage}
            />
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default ChatPopup;
