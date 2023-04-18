import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./ChatPopUp.css";
import * as ChatService from "../../services/chatService";
import * as MsgService from "../../services/messageService";
import { AuthContext } from "../../contexts/authContext";
import ChatFeed from "../ChatFeed/ChatFeed";
import io from "socket.io-client";
import { ChatContext } from "../../contexts/chatContext";

const ENDPOINT = "https://cakeshop-api.onrender.com"; //TODO - change when deploying
let socket, selectedChatCompare;

const ChatPopup = ({ cake }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isClose, setIsClose] = useState(true);

  const [chat, setChat] = useState();
  const [socketConnected, setSocketConnected] = useState(false);

  const { latestMessage, setLatestMessage } = useContext(ChatContext);

  const fetchChat = async () => {
    if (isClose !== false) {
      ChatService.getChats(user.accessToken).then((result) => {
        if (result.length > 0) {
          setLatestMessage(result[0].latestMessage?.content);
          setChat(result);
        } else {
          ChatService.accessChat(user.accessToken, cake.owner._id).then(
            (result) => {
              setChat(result);
            }
          );
        }
      });
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => {
      setSocketConnected(true);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchChat();
    fetchMessages();

    selectedChatCompare = chat;
  }, [latestMessage, isClose]);

  useEffect(() => {
    socket.on("message received", (newMsgReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMsgReceived.chat._id
      ) {
        setLatestMessage(newMsgReceived.content);
      } else {
        setMessages((prevMessages) => [...prevMessages, newMsgReceived]);
      }
    });
  });

  const fetchMessages = async () => {
    if (!chat) return;

    MsgService.getAllMessages(chat[0]._id, user.accessToken).then((result) => {
      setMessages(result);
      socket.emit("join chat", result[0]._id);
    });
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      event.preventDefault();

      setNewMessage("");
      MsgService.sendMsg(newMessage, chat[0]._id, user.accessToken).then(
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
    <div>
      <button
        onClick={() => {
          setIsClose(!isClose);
        }}
        className="chat-container"
      >
        <FontAwesomeIcon icon={faCommentDots} />
      </button>
      {isClose === false ? (
        <div className="chat-window">
          <div className="chat-window-top">
            <button
              className="chat-btn"
              onClick={() => {
                setIsClose(true);
                socket.disconnect();
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          {messages && (
            <div className="chat-window-content">
              <ChatFeed messages={messages} />
            </div>
          )}

          <form className="chat-window-input">
            <input
              className="chat-input"
              placeholder="Type a message"
              value={newMessage}
              onChange={typingHandler}
              onKeyDown={sendMessage}
            />
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default ChatPopup;
