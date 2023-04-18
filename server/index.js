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

  const server = app.listen(PORT, () =>
    console.log(`REST service started on ${PORT}`)
  );

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: process.env.HOST_URI,
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });

    socket.on('join chat', (room) => {
        socket.join(room);
    });

    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

    socket.on('new message', (newMsgReceived) => {
        let chat = newMsgReceived.chat;
        if(!chat.users) {
            return console.log('chat users not defined');
        }

        chat.users.forEach((user) => {
            if(user._id === newMsgReceived.sender._id) return;

            socket.in(user._id).emit('message received', newMsgReceived);
        });
    });

    socket.off('setup', () => {
        console.log('User disconnected');
        socket.leave(userData._id);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });

  });

}
