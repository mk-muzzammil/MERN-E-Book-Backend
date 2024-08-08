import express from "express";
import { body } from "express-validator";
import path from "node:path";
import { postCreateBook } from "./bookController";
import multer from "multer";
import tokenVerification from "../middlewares/tokenVerification";
const bookRouter = express.Router();
//==========Multer Configuration=======
const uploadMulter = multer({
  dest: path.resolve(__dirname, "../../public/data/Uploads"),
  limits: { fileSize: 3e7 }, //3e7 ==>30mb
});

bookRouter.post(
  "/create-book",
  tokenVerification,

  uploadMulter.fields([
    { name: "pdfFile", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),

  postCreateBook
);

export default bookRouter;
