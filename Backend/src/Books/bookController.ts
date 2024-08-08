import { validationResult } from "express-validator";
import Book from "./bookModel";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
const postCreateBook = (req: Request, res: Response, next: NextFunction) => {
  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = createHttpError("403", "Validation Error Occured");
    error.stack = errors
      .array()
      .map((err) => err.msg)
      .join(",");
    return next(error);
  }
  console.log("Requested Files ", req.files);

  //database process
  //Response
  console.log("Book Created ");
};

export { postCreateBook };
