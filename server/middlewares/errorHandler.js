const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err.name == "LoginError") {
    statusCode = 400;
    message = "Invalid email or password";
  }

  if (err.message == "EMAIL_DUPLICATE") {
    statusCode = 400;
    message = "Email has already been registered";
  }

  if (
    err.message === "USER_NOT_FOUND" ||
    err.message === "INVALID_PASSWORD" ||
    err.message === "FIELD_EMPTY"
  ) {
    statusCode = 400;
    message = "Invalid email or password";
  }

  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = "Field cannot be empty";
  }

  if (err.message === "Unauthorized" || err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token, login first";
  }
  if (err.message === "Forbidden") {
    statusCode = 403;
    message = "You don't have access";
  }

  if (err.message === "PRODUCT_NOT_FOUND") {
    statusCode = 404;
    message = "Product not found";
  }

  if (err.message === "CATEGORY_NOT_FOUND") {
    statusCode = 404;
    message = "Category not found";
  }

  if (err.message === "DATA_NOT_FOUND") {
    statusCode = 404;
    message = "No data found";
  }

  res.status(statusCode).json({
    statusCode,
    message,
  });
};

module.exports = errorHandler;
