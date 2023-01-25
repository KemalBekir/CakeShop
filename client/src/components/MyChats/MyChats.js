import React, { useContext, useEffect, useState } from "react";
import * as ChatService from "../../services/chatService";
import { AuthContext } from "../../contexts/authContext";
import "./MyChats.css";
import { getSender } from "../../utils/utils";
import { ChatContext } from "../../contexts/chatContext";

const MyChats = () => {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState();
  const [notification, setNotification] = useState([]);
  const [latestMessage, setLatestMessage] = useState();

  const fetchChat = async () => {
    ChatService.getChats(user.accessToken).then((result) => {
      setLatestMessage(result[0].latestMessage.content);
      setChats(result);
    });
  };

  const { selectedChat, setSelectedChat } = useContext(ChatContext);

  useEffect(() => {
    fetchChat();
  }, [latestMessage]);

  return (
    <div>
      {chats ? (
        <>
          {chats.map((chat) => {
            return (
              <div
                className="chat-list"
                onClick={() => setSelectedChat(chat)}
                key={chat._id}
              >
                <p className="chat-user-title">{getSender(user, chat.users)}</p>
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
