const { getById } = require("../services/cake");

module.exports = () => async (req, res, next) => {
  const id = req.params.id;
  try {
    const cake = await getById(id);
    cake._ownerId = cake.owner;
    //TODO: Change name of variable depending on project
    res.locals.cake = cake;
    next();
  } catch (err) {
    res.status(404).json({ message: "Record not found" });
  }
};
