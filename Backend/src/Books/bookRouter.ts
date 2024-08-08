import express from "express";
import { body } from "express-validator";
import { postCreateBook } from "./bookController";
const bookRouter = express.Router();

bookRouter.post(
  "/create-book",
  [
    body(
      "title",
      "Please enter correct title not include numbers and of min length 5"
    )
      .isAlpha()
      .isLength({ min: 5 }),
    body(
      "genre",
      "Please enter correct genre not include numbers and of min length 5"
    )
      .isAlpha()
      .isLength({ min: 5 }),
  ],
  postCreateBook
);

export default bookRouter;
