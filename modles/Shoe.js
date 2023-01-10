const mongoose = require("mongoose");

const shoeSchema = new mongoose.Schema({
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
  image1: {
    type: String,
    required: [true, "Provide Image"],
  },
  image2: {
    type: String,
    required: [true, "Provide Image"],
  },
  image3: {
    type: String,
    required: [true, "Provide Image"],
  },
  rating: {
    type: Number,
    require: [true, "Provide Rating"],
  },
  description: {
    type: String,
    required: [true, "Provide Description"],
  },
  brand: {
    type: String,
    required: [true, "Provide Brand name"],
  },
  color: {
    type: String,
    required: [true, "Provide Color"],
  },
  category: {
    type: String,
    required: [true, "Provide Category"],
  },
});
module.exports = mongoose.model("Shoe", shoeSchema);
