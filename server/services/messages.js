const Message = require("../models/message");
const User = require("../models/user");
const Chat = require("../models/chat");

async function allMessages(chatId) {
  return await Message.find({ chat: chatId })
    .populate("sender", "username")
    .populate("chat");
}

async function sendMessage(content, chatId, userId) {
  const newMessage = {
    sender: userId,
    content: content,
    chat: chatId,
  };

  const result = new Message(newMessage);
  result = await result.populate("sender", "username");
  result = await result.populate("chat");
  result = await User.populate(message, {
    path: "chat.users",
    select: "username",
  });

  await Chat.findByIdAndUpdate(chatId, { latestMessage: result });

  await result.save();

  return result;
}

module.exports = {
  allMessages,
  sendMessage,
};
