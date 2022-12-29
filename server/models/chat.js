const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const chatSchema = new Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: ObjectId, ref: "User" }],
    latestMessage: { type: ObjectId, ref: "Message" },
    groupAdmin: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Chat = model("Chat", chatSchema);

module.exports = Chat;
