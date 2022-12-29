const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const messageSchema = new Schema(
  {
    sender: { type: ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: ObjectId, ref: "Chat" },
    readBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);

module.exports = Message;
