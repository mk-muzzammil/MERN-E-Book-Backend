import { validationResult } from "express-validator";
import Book from "./bookModel";
import { Request, Response, NextFunction } from "express";
import createHttpError, { HttpError } from "http-errors";
import cloudinary from "../config/cloudinaryConfig";
import path from "path";
import fs from "fs";
import { AuthRequest } from "../middlewares/tokenVerification";

const uploadToCloudinary = (
  FolderName: string,
  FileName: string,
  FilePath: string,
  Mimetype: string,
  resourceType: string = "auto"
) => {
  return cloudinary.uploader.upload(FilePath, {
    folder: FolderName,
    filename_override: FileName,
    format: Mimetype,
    resource_type: resourceType as "auto" | "raw" | "image" | "video",
  });
};
const postCreateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = createHttpError(403, "Validation Error Occurred");
    error.stack = errors
      .array()
      .map((err) => err.msg)
      .join(",");
    return next(error);
  }

  const files = req.files as {
    coverImage: Express.Multer.File[];
    pdfFile: Express.Multer.File[];
  };

  const coverfileName = files.coverImage[0].filename;
  const coverfilePath = path.resolve(
    __dirname,
    "../../public/data/Uploads",
    coverfileName
  );
  const coverImageMimeType = files.coverImage[0].mimetype.split("/")[1];

  const pdfFileName = files.pdfFile[0].filename;
  const pdfFilePath = path.resolve(
    __dirname,
    "../../public/data/Uploads",
    pdfFileName
  );
  const pdfFileMimeType = files.pdfFile[0].mimetype.split("/")[1];

  try {
    const [coverImageResult, pdfFileResult] = await Promise.all([
      uploadToCloudinary(
        "coverImages",
        coverfileName,
        coverfilePath,
        coverImageMimeType,
        "image"
      ),
      uploadToCloudinary(
        "booksPdf",
        pdfFileName,
        pdfFilePath,
        pdfFileMimeType,
        "raw"
      ),
    ]);

    const coverImageSecureUrl = coverImageResult.secure_url;
    const pdfFileSecureUrl = pdfFileResult.secure_url;

    const _req = req as AuthRequest;
    // Database process
    const { title, genre } = req.body;
    const newBook = new Book({
      title,
      author: _req.userId,
      genre,
      coverImage: coverImageSecureUrl,
      pdfFile: pdfFileSecureUrl,
    });

    // Delete the local files after successful upload
    await fs.promises.unlink(coverfilePath);
    await fs.promises.unlink(pdfFilePath);

    const book = await newBook.save();

    // Response
    res
      .status(201)
      .json({ message: "Book Created Successfully", id: book._id });
  } catch (error) {
    return next(error);
  }
};

export { postCreateBook };
