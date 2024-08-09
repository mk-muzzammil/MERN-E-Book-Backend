import express from "express";
import { body } from "express-validator";
import path from "node:path";
import {
  postCreateBook,
  postUpdateBook,
  getAllBooks,
  getBookById,
  deletebook,
} from "./bookController";
import multer from "multer";
import tokenVerification from "../middlewares/tokenVerification";
const bookRouter = express.Router();
//==========Multer Configuration=======
const uploadMulter = multer({
  dest: path.resolve(__dirname, "../../public/data/Uploads"),
  limits: { fileSize: 3e7 }, //3e7 ==>30mb
});
const pageNumber = 1;

bookRouter.post(
  "/create-book",
  tokenVerification,

  uploadMulter.fields([
    { name: "pdfFile", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),

  postCreateBook
);
bookRouter.patch(
  "/:bookId",
  tokenVerification,

  uploadMulter.fields([
    { name: "pdfFile", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),

  postUpdateBook
);
bookRouter.get("/", getAllBooks);
bookRouter.get("/:bookId", getBookById);
bookRouter.delete("/:bookId", tokenVerification, deletebook);

export default bookRouter;
