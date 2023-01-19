import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./ChatPopUp.css";
import * as ChatService from "../../services/chatService";
import * as MsgService from "../../services/messageService";
import { AuthContext } from "../../contexts/authContext";
import ChatFeed from "../ChatFeed/ChatFeed";

const ChatPopup = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chat, setChat] = useState();

  const fetchChat = async () => {
    setIsOpen(!isOpen);
    if (isOpen !== true) {
      ChatService.getChats(user.accessToken).then((result) => {
        setChat(result);
      });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [chat]);

  const fetchMessages = async () => {
    if (!chat) return;

    MsgService.getAllMessages(chat[0]._id, user.accessToken).then((result) => {
      setMessages(result);
    });
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      //add socket.emit and message service
      event.preventDefault();
     MsgService.sendMsg(
        newMessage,
        chat[0]._id,
        user.accessToken
      ).then((result) => {
        setMessages([...messages, result]);
      });
        setNewMessage('');
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div>
      <button onClick={fetchChat} className="chat-container">
        <FontAwesomeIcon icon={faCommentDots} />
      </button>
      {isOpen ? (
        <div className="chat-window">
          <div className="chat-window-top">
            <button className="chat-btn" onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          {messages && (
            <div className="chat-window-content">
              <ChatFeed messages={messages} />
            </div>
          )}

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
