const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Name"],
  },
  price: {
    type: Number,
    required: [true, "Provide price"],
  },
  image: {
    type: String,
    required: [true, "Provide Image"],
  },
  size: {
    type: String,
    require: [true, "Please provide size"],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
});

module.exports = mongoose.model("Cart", cartSchema);
