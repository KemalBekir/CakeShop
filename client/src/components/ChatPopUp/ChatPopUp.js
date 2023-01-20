import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./ChatPopUp.css";
import * as ChatService from "../../services/chatService";
import * as MsgService from "../../services/messageService";
import { AuthContext } from "../../contexts/authContext";
import ChatFeed from "../ChatFeed/ChatFeed";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000"; //TODO - change when deploying
let socket, selectedChatCompare;

const ChatPopup = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chat, setChat] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [latestMessage, setLatestMessage] = useState();


  const fetchChat = async () => {
    setIsOpen(!isOpen);
    if (isOpen !== true) {
      ChatService.getChats(user.accessToken).then((result) => {
        setLatestMessage(result[0].latestMessage.content);
        setChat(result);
      });
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => {
      setSocketConnected(true);
    });
  }, []);


  useEffect(() => {
    fetchMessages();
    selectedChatCompare = chat;
  },[latestMessage]);

  

  useEffect(() => {
    socket.on('message received', (newMsgReceived) => {
      if(!selectedChatCompare || selectedChatCompare._id !== newMsgReceived.chat._id){
        //TODO - notification
        setLatestMessage(newMsgReceived.content);
      } else {
        setMessages(prevMessages => [...prevMessages, newMsgReceived]);
      }
    });
  })



  const fetchMessages = async () => {
    if (!chat) return;

    MsgService.getAllMessages(chat[0]._id, user.accessToken).then((result) => {
      setMessages(result);
      socket.emit("join chat", result[0]._id);

    });
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      //add socket.emit and message service
      event.preventDefault();
      setNewMessage("");
      MsgService.sendMsg(newMessage, chat[0]._id, user.accessToken).then(
        (result) => {
          socket.emit('new message', result);
          setMessages([...messages, result]);
        }
      );
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;



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
