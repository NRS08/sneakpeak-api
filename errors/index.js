const BadRequestError = require("./BadRequest");
const UnauthenticatedError = require("./UnauthenticatedError");
const notFound = require("./notFound");
const CustomAPIError = require("./custom-api-error");

module.exports = {
  BadRequestError,
  UnauthenticatedError,
  notFound,
  CustomAPIError,
};
