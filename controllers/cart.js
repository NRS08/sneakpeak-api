const Cart = require("../modles/Cart");
const { BadRequestError } = require("../errors");

const getCartItems = async (req, res) => {
  const { userId, name } = req.user;
  const cart = await Cart.find({ createdBy: userId });
  res.status(200).json({ cart, name });
};

const createCartItem = async (req, res) => {
  const { name, image, price, size } = req.body;
  if (!name || !image || !price || !size) {
    throw new BadRequestError("Provide all info");
  }
  req.body.createdBy = req.user.userId;
  const item = await Cart.create(req.body);
  res.status(201).json({ item });
};

const deleteItem = async (req, res) => {
  const { id: itemId } = req.params;
  const { userId } = req.user;
  const item = await Cart.findByIdAndDelete({ _id: itemId, createdBy: userId });
  if (!item) {
    throw new BadRequestError(`No item with id ${itemId}`);
  }
  res.status(200).send();
};
const deleteItems = async (req, res) => {
  const { userId } = req.user;
  const item = await Cart.deleteMany({ createdBy: userId });
  if (!item) {
    throw new BadRequestError(`No item with id ${itemId}`);
  }
  res.status(200).send();
};
module.exports = { getCartItems, createCartItem, deleteItem, deleteItems };
