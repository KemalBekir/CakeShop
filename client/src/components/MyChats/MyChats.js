import React, { useContext, useEffect, useState } from "react";
import * as ChatService from "../../services/chatService";
import * as MsgService from "../../services/messageService";
import { AuthContext } from "../../contexts/authContext";
import "./MyChats.css";
import { getSender } from "../../utils/utils";
import { ChatContext } from "../../contexts/chatContext";

const MyChats = () => {
  const { user } = useContext(AuthContext);
  const [notification, setNotification] = useState([]);
  const [chatId, setChatId] = useState();
  const [active, setActive] = useState(false);

  const fetchChats = async () => {
    ChatService.getChats(user.accessToken).then((result) => {
      setLatestMessage(result[0].latestMessage.content);
      setChats(result);
    });
  };

  const getAllMessages = async () => {
    if (selectedChat) {
      MsgService.getAllMessages(selectedChat._id, user.accessToken).then(
        (result) => {
          setMessages(result);
        }
      );
    }
  };

  const {
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    latestMessage,
    setLatestMessage,
    messages,
    setMessages,
  } = useContext(ChatContext);

  useEffect(() => {
    fetchChats();
  }, [latestMessage, selectedChat]);

  useEffect(() => {
    getAllMessages();
  }, [chatId]);

  return (
    <div>
      {chats ? (
        <>
          {chats.map((chat) => {
            return (
              <div
                className="chat-list"
                onClick={() => {
                  setSelectedChat(chat);
                  setChatId(selectedChat?._id);
                }}
                key={chat._id}
              >
                <p
                  className={`chat-user-title ${
                    chat._id === selectedChat?._id ? "selected-bg" : "bg"
                  }`}
                >
                  {getSender(user, chat.users)}
                </p>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default MyChats;
