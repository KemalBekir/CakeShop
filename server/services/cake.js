const Cake = require("../models/cake");
const User = require("../models/user");

async function getAll() {
  return Cake.find({});
}

async function getTopFive() {
  return Cake.find({}).sort({ createdAt: "desc" }).limit(5);
}

async function getCakesOnOffer(){
  return Cake.find({onOffer: true});
}

async function getAllDesc() {
  return Cake.find({}).sort({ price: "desc" });
}

async function getAllAsc() {
  return Cake.find({}).sort({ price: "asc" });
}

async function getAllCakesByOwner(owner) {
  return Cake.find({ owner }).sort("");
}

async function getById(id) {
  return Cake.findById(id).populate({
    path: "owner",
    select: ["email", "username"],
  });
}

async function create(cake) {
  const result = new Cake(cake);
  await result.save();

  const user = await User.findById(result.owner);
  user.myAds.push(result._id);
  await user.save();

  return result;
}

async function update(id, cake) {
  const existing = await Cake.findById(id);

  existing.cakeName = cake.cakeName;
  existing.desc = cake.desc;
  existing.price = cake.price;
  existing.type = cake.type;
  existing.imgOne = cake.imgOne;
  existing.imgTwo = cake.imgTwo;
  existing.imgThree = cake.imgThree;
  existing.imgFour = cake.imgFour;
  existing.onOffer = cake.onOffer;
  await existing.save();

  return existing;
}

async function deleteById(id) {
  await Cake.findByIdAndDelete(id);
}

async function searchFunction(text) {
  return Cake.find({
    $or: [
      { cakeName: { $regex: `${text}`, $options: "i" } },
      { type: { $regex: `${text}`, $options: "i" } },
    ],
    /*{$or: [{ name: {$regex: 'london', $options: 'i'}}, { location: {$regex: 'london', $options: 'i'}}]}*/
  });
}

async function isLiked(cakeId, userId) {
  const cake = await Cake.find(cakeId);

  if (cake.likes.includes(userId)) {
    cake.filter((x) => x._id != userId);
  }
  cake.likes.push(userId);
  await cake.save();
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
  getTopFive,
  searchFunction,
  getAllCakesByOwner,
  getAllDesc,
  getAllAsc,
  isLiked,
  getCakesOnOffer,
};
