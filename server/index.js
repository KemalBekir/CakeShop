const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require("./middleware/cors");
const usersController = require("./controllers/users");
const catalogController = require("./controllers/catalog");
const chatController = require("./controllers/chat");
const messageController = require("./controllers/message");
const auth = require("./middleware/auth");
dotenv.config();
const PORT = process.env.PORT || 5000;

start();

async function start() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database ready");
  } catch (error) {
    console.log(error.message);
    console.error("Database conection failed");
  }

  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
  });

  mongoose.connection.on("connected", () => {
    console.log("mongoDB connected");
  });

  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(auth());
  app.use("/users", usersController);
  app.use("/catalog", catalogController);
  app.use("/chat", chatController);
  app.use("/message", messageController);

  app.get("/", (req, res) => {
    res.json({ message: "REST service operational" });
  });

  app.listen(PORT, () => console.log(`REST service started on ${PORT}`));
}
