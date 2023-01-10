const StatusCodes = require("http-status-codes");
const errorHandler = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || 500,
    message: err.message || `Something went wrong, try again`,
  };
  if (err.name == "ValidationError") {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  if (err.code && err.code == 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `Duplicate value at ${Object.keys(
      err.keyValue
    )} field, try different value`;
  }

  // res.status(500).json(err);
  res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHandler;
