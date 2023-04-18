import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./ChatWindow.css";
import * as ChatService from "../../services/chatService";
import * as MsgService from "../../services/messageService";
import { AuthContext } from "../../contexts/authContext";
import ChatFeed from "../ChatFeed/ChatFeed";
import io from "socket.io-client";
import { ChatContext } from "../../contexts/chatContext";

const ENDPOINT = "https://cakeshop-api.onrender.com"; //TODO - change when deploying
let socket, selectedChatCompare;

const ChatWindow = ({ isClose, setIsClose }) => {
  const { user } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [latestMessage, setLatestMessage] = useState();

  const {
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    messages,
    setMessages,
  } = useContext(ChatContext);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => {
      setSocketConnected(true);
    });

    return () => {
      socket.disconnect();
    };
  }, [isClose]);

  useEffect(() => {
    fetchMessages();
    setIsClose(false);

    selectedChatCompare = selectedChat;
  }, [latestMessage]);

  useEffect(() => {
    socket.on("message received", (newMsgReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMsgReceived.chat._id
      ) {
        //TODO - notification
        // setLatestMessage(newMsgReceived.content);
      } else {
        setMessages((prevMessages) => [...prevMessages, newMsgReceived]);
      }
    });
  }, [latestMessage]);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    MsgService.getAllMessages(selectedChat._id, user.accessToken).then(
      (result) => {
        setLatestMessage(result[result.length - 1].content);
        setMessages(result);
        socket.emit("join chat", selectedChat._id);
      }
    );
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      event.preventDefault();
      setNewMessage("");
      MsgService.sendMsg(newMessage, selectedChat._id, user.accessToken).then(
        (result) => {
          socket.emit("new message", result);
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
    <section className="chat-window-section">
      <div className="chat-window-container">
        <div className="chat-window-top">
          <button
            className="chat-btn"
            onClick={() => {
              setIsClose(true);
              setSelectedChat("");
              socket.disconnect();
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        {messages && (
          <div className="chat-window-content-mychat">
            <ChatFeed messages={messages} />
          </div>
        )}
        <form className="chat-window-form">
          <input
            className="chat-form-input"
            placeholder="Type a message"
            value={newMessage}
            onChange={typingHandler}
            onKeyDown={sendMessage}
          />
        </form>
      </div>
    </section>
  );
};

export default ChatWindow;
