const CustomAPIError = require("./custom-api-error");

class UnautheticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
module.exports = UnautheticatedError;
