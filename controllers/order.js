const Order = require("../modles/Order");

const getAllOrders = async (req, res) => {
  const { status } = req.query;
  // console.log(status);
  const orders = await Order.find({ status: status });
  res.status(200).json({ orders, name: req.user.name });
};

const getName = async (req, res) => {
  res.status(200).json({ name: req.user.name });
};
const getOrdersByIdPending = async (req, res) => {
  const { userId } = req.user;
  const orders = await Order.find({ createdBy: userId, status: "pending" });
  res.status(200).json({ orders });
};
const getOrdersByIdDelivered = async (req, res) => {
  const { userId } = req.user;
  const orders = await Order.find({ createdBy: userId, status: "delivered" });
  res.status(200).json({ orders });
};

const createOrder = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const order = await Order.create(req.body);
  res.status(201).json({ order });
};

const getAnOrder = async (req, res) => {
  res.status(200).json({ msg: "Single Order" });
};

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findByIdAndUpdate({ _id: orderId }, req.body, {
    runValidators: true,
  });
  if (!order) {
    throw new BadRequestError(`No order with id ${orderId}`);
  }
  res.status(201).json({ order });
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.query;
  const del = await Order.findByIdAndDelete({ _id: orderId });
  if (!del) {
    throw new BadRequestError(`No order with id ${orderId}`);
  }
  res.status(200).send();
};

module.exports = {
  getAllOrders,
  getOrdersByIdPending,
  getOrdersByIdDelivered,
  createOrder,
  getAnOrder,
  updateOrder,
  getName,
  deleteOrder,
};
