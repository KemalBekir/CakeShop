const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const schema = new Schema({
  cakeName: {
    type: String,
    required: [true, "Cake name is required"],
    minlength: [4, "Cake name must contain atleast 4 characters"],
  },
  desc: {
    type: String,
    required: true,
    maxlength: [300, "Description must be 300 characters at most"],
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  imgOne: {
    type: String,
    default: undefined,
    required: true,
  },
  imgTwo: {
    type: String,
    default: undefined,
    required: true,
  },
  imgThree: {
    type: String,
    default: undefined,
    required: true,
  },
  imgFour: {
    type: String,
    default: undefined,
    required: true,
  },
  likes: [{ type: ObjectId, ref: "User" }],
  owner: { type: ObjectId, ref: "User" },
  onOffer: { type: Boolean, default: false },
  discount: {
    type: Number,
    enum: [0, 10, 15, 20, 25, 30, 35, 40, 45, 50],
    default: 0,
  },
});

const Cake = model("Cake", schema);

module.exports = Cake;
