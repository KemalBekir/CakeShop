const Chat = require("../models/chat");
const User = require("../models/user");

async function accessChat(userId, ownerId) {
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: userId } } },
      { users: { $elemMatch: { $eq: ownerId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "username",
  });

  const result = await createChat(userId, ownerId);
  await result.save();

  return result;
}

async function createChat(userId, ownerId) {
  let chatData = {
    chatName: "sender",
    isGroupChat: false,
    users: [userId, ownerId],
  };

  const result = await Chat.create(chatData);
  const FullChat = await Chat.findOne({ _id: result._id }).populate(
    "users",
    "-password"
  );

  return FullChat;
}

async function getChats(userId){
    const result = await Chat.find({ users: {$elemMatch: {$eq: userId}}})
    .populate('users', '-password')
    .populate('groupAdmin', '-password')
    .populate('latestMessage')
    .sort({ updatedAt: -1});

    result = await User.populate(result, {
        path: 'latestMessage.sender',
        select: 'username',
    });

    return result;
}

module.exports = {
  accessChat,
  getChats,
};
