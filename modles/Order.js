const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
  },
  email: {
    type: String,
    required: [true, "Please enter Email"],
    minlength: 8,
    maxlength: 25,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please give valid email address",
    ],
  },
  address: {
    type: String,
    required: [true, "Please enter Address"],
  },
  zipCode: {
    type: Number,
    required: [true, "Please enter Zip Code"],
  },
  city: {
    type: String,
    required: [true, "Please enter City name"],
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "delivered"],
      message: `{VALUE} is not supported`,
    },
    default: "pending",
  },
  items: {
    type: Array,
    required: [true, "No items added"],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
});

module.exports = mongoose.model("Order", orderSchema);
