const {
  getAllOrders,
  createOrder,
  getAnOrder,
  updateOrder,
  getOrdersByIdPending,
  getOrdersByIdDelivered,
  getName,
  deleteOrder,
} = require("../controllers/order");
const authenticateUser = require("../middlewares/authenticateUser");
const authenticateAdmin = require("../middlewares/authenticateAdmin");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(authenticateAdmin, getAllOrders)
  .post(authenticateUser, createOrder)
  .delete(authenticateAdmin, deleteOrder);
router.route("/name").get(authenticateAdmin, getName);
router.route("/myorders/pending").get(authenticateUser, getOrdersByIdPending);
router
  .route("/myorders/delivered")
  .get(authenticateUser, getOrdersByIdDelivered);
router
  .route("/:id")
  .get(authenticateAdmin, getAnOrder)
  .patch(authenticateAdmin, updateOrder);

module.exports = router;
