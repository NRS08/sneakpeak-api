const express = require("express");
const router = express.Router();
const authenticateAdmin = require("../middlewares/authenticateAdmin");
const {
  getAllShoes,
  getSingleShoe,
  createShoe,
  updateShoe,
  deleteShoe,
} = require("../controllers/shoes");

router.route("/").get(getAllShoes).post(authenticateAdmin, createShoe);
router
  .route("/:id")
  .get(getSingleShoe)
  .patch(authenticateAdmin, updateShoe)
  .delete(authenticateAdmin, deleteShoe);

module.exports = router;
