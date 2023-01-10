const {
  getCartItems,
  createCartItem,
  deleteItem,
  deleteItems,
} = require("../controllers/cart");
const express = require("express");
const router = express.Router();

router.route("/").get(getCartItems).post(createCartItem).delete(deleteItems);
router.route("/:id").delete(deleteItem);

module.exports = router;
