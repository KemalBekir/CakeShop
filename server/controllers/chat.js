const { isAuth } = require("../middleware/guards");
const preload = require("../middleware/preload");

const { accessChat, getChats } = require("../services/chat");
const mapErrors = require("../utils/mappers");

const router = require("express").Router();

router.post("/", isAuth(), async (req, res) => {
  try {
    const userId = req.user._id;
    const  ownerId  = req.body.ownerId;
    const result = await accessChat(userId, ownerId);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    const error = mapErrors(err);
    res.status(400).json({ message: error });
  }
});

router.get("/", isAuth(), async (req, res) => {
  try {
    const result = await getChats(req.user._id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    const error = mapErrors(err);
    res.status(400).json({ message: error });
  }
});

// router.post("/group", isAuth(), async (req, res) => {});

// router.put("/rename", isAuth(), async (req, res) => {});

// router.put("/groupremove", isAuth(), async (req, res) => {});

// router.put("/groupadd", isAuth(), async (req, res) => {});

module.exports = router;
