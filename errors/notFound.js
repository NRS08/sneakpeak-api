const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api-error");

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
