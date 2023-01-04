const { isAuth } = require("../middleware/guards");
const Chat = require("../models/chat");
const User = require("../models/user");

const router = require("express").Router();

router.post("/", isAuth(), async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ message: "UserId params not send with request" });
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "username",
  });

  let chatData;

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
  }

  try {
    const createdChat = await Chat.create(chatData);
    const result = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );
    res.status(200).json(result);
  } catch (err) {}
});

router.get("/", isAuth(), async (req, res) => {});

router.post("/group", isAuth(), async (req, res) => {});

router.put("/rename", isAuth(), async (req, res) => {});

router.put("/groupremove", isAuth(), async (req, res) => {});

router.put("/groupadd", isAuth(), async (req, res) => {});

module.exports = router;
