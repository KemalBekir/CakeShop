import { createContext, useContext, useState } from "react";
import React from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [isClose, setIsClose] = useState(true);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        chats,
        setChats,
        isClose,
        setIsClose,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
