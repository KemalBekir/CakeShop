const { isAuth } = require("../middleware/guards");
const Chat = require("../models/chat");
const User = require("../models/user");

const router = require("express").Router();

router.post("/", isAuth(), async (req, res) => {
 
});

router.get("/", isAuth(), async (req, res) => {});

router.post("/group", isAuth(), async (req, res) => {});

router.put("/rename", isAuth(), async (req, res) => {});

router.put("/groupremove", isAuth(), async (req, res) => {});

router.put("/groupadd", isAuth(), async (req, res) => {});

module.exports = router;
