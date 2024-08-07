import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";
import { HttpError } from "http-errors";

const GlobalErrorHanlder = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    message: error.message,
    errorStack: config.NODE_ENV === "development" ? error.stack : "",
  });
};
export default GlobalErrorHanlder;
