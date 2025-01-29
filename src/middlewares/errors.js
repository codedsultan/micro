import ErrorHandler from "../helpers/errorHandler.js";
import logger from "../logger/index.js";

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "intenal server error";
  
  const Logger = logger.getInstance();
  Logger.error(`Error: ${err.message}`, { stack: err.stack });
  // Wrong MongoDB Id error
  if (err.name === "CastError") {
    const message = `Resource not found - (invalid: ${err.path})`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `entity is already in use`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "jsonWebTokenError") {
    const message = `token is invalid`;
    err = new ErrorHandler(message, 400);
  }

  // JWT Expire error
  if (err.name === "TokenExpiredError") {
    const message = `token is expired`;
    err = new ErrorHandler(message, 400);
  }

  
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;