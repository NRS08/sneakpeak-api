const Shoe = require("../modles/Shoe");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getAllShoes = async (req, res) => {
  let queryProducts = {};
  const { name, range, color, brand, sort, category, limit } = req.query;
  if (name) {
    queryProducts.name = { $regex: name, $options: "i" };
  }
  if (color) {
    queryProducts.color = color;
  }
  if (brand) {
    queryProducts.brand = brand;
  }
  if (category) {
    queryProducts.category = category;
  }
  if (range) {
    const operatorMap = {
      ">": "$gt",
      "<": "$lt",
    };
    const regEx = /(>|<)\b/g;
    let filters = range.replace(regEx, (match) => `${operatorMap[match]}-`);
    const options = ["price"];
    filters = filters.split(",").forEach((item) => {
      const [operator, value] = item.split("-");
      queryProducts["price"] = { [operator]: Number(value) };
    });
  }
  let result = Shoe.find(queryProducts);
  if (sort) {
    result.sort(sort);
  }
  // const page = parseInt(req.query.page) || 1;
  // const limit = parseInt(req.query.limit) || 10;
  // const skip = (page - 1) * limit;
  // results.skip(skip).limit(limit);
  if (limit) {
    result.limit(limit);
  }
  const shoes = await result;
  res.status(200).json({ shoes });
};
const getSingleShoe = async (req, res) => {
  const { id: shoeId } = req.params;
  const shoe = await Shoe.findById({ _id: shoeId });
  if (!shoe) {
    throw new BadRequestError("No shoe found");
  }
  res.status(200).json({ shoe });
};
const createShoe = async (req, res) => {
  const shoe = await Shoe.create(req.body);
  res.status(201).json({ shoe });
};
const updateShoe = async (req, res) => {
  const { id: shoeId } = req.params;
  const { name, price, rating, brand, color, category } = req.body;
  if (!name || !price || !rating || !brand || !color || !category) {
    throw new BadRequestError("Provide comple info");
  }
  const shoe = await Shoe.findByIdAndUpdate({ _id: shoeId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!shoe) {
    throw new BadRequestError(`No shoe with id ${shoeId}`);
  }
  res.status(201).json({ shoe });
};
const deleteShoe = async (req, res) => {
  const { id: shoeId } = req.params;
  const shoe = await Shoe.findByIdAndDelete({ _id: shoeId });
  if (!shoe) {
    throw new BadRequestError(`No shoe with id ${shoeId}`);
  }
  res.status(200).json({ mgs: "Deleted" });
};

module.exports = {
  getAllShoes,
  getSingleShoe,
  createShoe,
  updateShoe,
  deleteShoe,
};
