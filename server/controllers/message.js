const { isAuth } = require("../middleware/guards");
const { getAllMessages, sendMessage } = require("../services/messages");
const mapErrors = require("../utils/mappers");

const router = require("express").Router();

router.get("/:chatId", isAuth(), async (req, res) => {
  const chatId = req.params.chatId;

  try {
    const result = await getAllMessages(chatId);
    res.json(result);
  } catch (err) {
    console.error(err);
    const error = mapErrors(err);
    res.status(400).json({ message: error });
  }
});

router.post("/", isAuth(), async (req, res) => {
  const content = req.body.content;
  const chatId = req.body.chatId;
  const userId = req.user._id;

  try {
    const result = await sendMessage(content, chatId, userId);
    res.json(result);
  } catch (err) {
    console.error(err);
    const error = mapErrors(err);
    res.status(400).json({ message: error });
  }
});

module.exports = router;
