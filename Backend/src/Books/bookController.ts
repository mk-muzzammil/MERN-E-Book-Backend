import { Result, validationResult } from "express-validator";
import Book from "./bookModel";
import { Request, Response, NextFunction } from "express";
import createHttpError, { HttpError } from "http-errors";
import cloudinary from "../config/cloudinaryConfig";
import path from "path";
import fs from "fs";
import { AuthRequest } from "../middlewares/tokenVerification";
import mongoose from "mongoose";
import { promises } from "dns";
import { config } from "../config/config";

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
const deleteFromCloudinary = (
  publicId: string,
  resoucetype: string = "auto"
) => {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: resoucetype as "auto" | "raw" | "image" | "video",
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
    const { title, genre, description } = req.body;
    const newBook = new Book({
      title,
      author: _req.userId,
      genre,
      coverImage: coverImageSecureUrl,
      pdfFile: pdfFileSecureUrl,
      description,
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

const postUpdateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get BookId from params and the extract book
  //from database and check if book exist or not
  //verify the user is the author of the book if oka then give them acess
  //Now go to update Process and check which fields to update but first check weither we new file uploaded or not if yes then upload to cloudinary and get the secure url
  const { title, genre } = req.body;

  //get BookId from params and the extract book
  const bookId = req.params.bookId;
  const files = req.files as {
    coverImage: Express.Multer.File[];
    pdfFile: Express.Multer.File[];
  };
  //from database and check if book exist or not
  try {
    const book = await Book.findById(bookId);
    const _req = req as AuthRequest;
    if (!book) {
      return next(createHttpError(404, "Book not found"));
    }
    //verify the user is the author of the book if oka then give them acess
    if (book.author.toString() !== _req.userId) {
      return next(
        createHttpError(403, "You are not the author of this book cant update")
      );
    }
    //Now go to update Process and check which fields to update but first check weither we new file uploaded or not if yes then upload to cloudinary and get the secure url

    let coverImageSecureUrl = book.coverImage;
    let pdfFileSecureUrl = book.pdfFile;
    if (files.coverImage || files.pdfFile) {
      if (files.coverImage) {
        //first delete the old cover image from cloudinary and then new one uploaded
        const coverImagePublicId =
          book.coverImage.split("/").at(-2) +
          "/" +
          book.coverImage.split("/").at(-1)?.split(".").at(0);
        await deleteFromCloudinary(coverImagePublicId, "image");
        const coverfileName = files.coverImage[0].filename;
        const coverfilePath = path.resolve(
          __dirname,
          "../../public/data/Uploads",
          coverfileName
        );
        const coverImageMimeType = files.coverImage[0].mimetype.split("/")[1];
        const coverImageresult = await uploadToCloudinary(
          "coverImages",
          coverfileName,
          coverfilePath,
          coverImageMimeType,
          "image"
        );
        coverImageSecureUrl = coverImageresult.secure_url;
        console.log(coverImageSecureUrl);
      }
      if (files.pdfFile) {
        //first delete the old pdfFile from cloudinary and then new one uploaded

        const pdffilePublicId =
          book.pdfFile.split("/").at(-2) + "/" + book.pdfFile.split("/").at(-1);
        await deleteFromCloudinary(pdffilePublicId, "raw");

        const pdfFileName = files.pdfFile[0].filename;
        const pdfFilePath = path.resolve(
          __dirname,
          "../../public/data/Uploads",
          pdfFileName
        );
        const pdfFileMimeType = files.pdfFile[0].mimetype.split("/")[1];
        const pdfFileResult = await uploadToCloudinary(
          "booksPdf",
          pdfFileName,
          pdfFilePath,
          pdfFileMimeType,
          "raw"
        );
        pdfFileSecureUrl = pdfFileResult.secure_url;
        console.log(pdfFileSecureUrl);
      }
    }
    //update the book in the database with new values
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      {
        title,
        genre,
        coverImage: coverImageSecureUrl,
        pdfFile: pdfFileSecureUrl,
      },
      { new: true }
    );
    //Response
    if (!updatedBook) {
      return next(
        createHttpError(500, "Error occured at server while updating book")
      );
    }
    res
      .status(200)
      .json({ message: "Book Updated Successfully", bookId: updatedBook._id });
  } catch (error) {
    return next(createHttpError(500, "Error occured at server"));
  }
};
const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
  const pageNumber = parseInt(req.query.page as string) || 1;
  const NoOfbooksPerPage = parseInt(req.query.limit as string) || 5;
  let totalBooks: number;
  Book.find()
    .countDocuments()
    .then((count) => {
      totalBooks = count;
    });
  if (NoOfbooksPerPage) {
    Book.find()
      .populate("author", "name")
      .skip((pageNumber - 1) * NoOfbooksPerPage)
      .limit(NoOfbooksPerPage)
      .then((books) => {
        if (!books) {
          return next(createHttpError(404, "No Books Found"));
        }
        res.status(200).json({
          message: "Books Fetched Sucesfully ",
          books: books,
          totalBooks: totalBooks,
          booksPerPage: NoOfbooksPerPage,
        });
      })
      .catch((error) => {
        return next(
          createHttpError(500, "Error occured at server while fetching books")
        );
      });
  }
};

const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return next(createHttpError(404, "Book Not Found"));
  }

  try {
    const book = await Book.findById(bookId).populate("author", "name");
    if (!book) {
      return next(createHttpError(404, "Book Not Found"));
    }
    res.status(200).json(book);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(createHttpError(404, "Book Not Found"));
    }
    return next(
      createHttpError(500, "Error occurred at server while fetching book")
    );
  }
};

const deletebook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;
  const _req = req as AuthRequest;

  Book.findById(bookId)
    .then(async (book) => {
      if (!book) {
        return next(createHttpError(404, "Book Not Found"));
      }
      if (book.author._id.toString() !== _req.userId) {
        return next(
          createHttpError(
            403,
            "You are not the author of this book cant delete"
          )
        );
      }
      //delete from cloudinary
      //coverImages/gkvcc0seniouvqxtivij  ===>cloudinary public Id for cover image
      //booksPdf/blqwbcb0um0zvfjwm7gi.pdf ===>cloudinary public Id for pdf file
      //https://res.cloudinary.com/djnqejhoj/image/upload/v1723125822/coverImages/gkvcc0seniouvqxtivij.png ==>coverImage
      //https://res.cloudinary.com/djnqejhoj/raw/upload/v1723125824/booksPdf/ujlh6nfgvh6zko1lwbhv.pdf  ==>pdfFile
      const coverImagePublicId =
        book.coverImage.split("/").at(-2) +
        "/" +
        book.coverImage.split("/").at(-1)?.split(".").at(0);
      const pdffilePublicId =
        book.pdfFile.split("/").at(-2) + "/" + book.pdfFile.split("/").at(-1);
      console.log("CoverImage Public id ", coverImagePublicId);
      console.log("pdfFile Public id ", pdffilePublicId);
      // Promise.all([deleteFromCloudinary(coverImagePublicId,"image"),deleteFromCloudinary(pdffilePublicId,"raw")]);
      try {
        await deleteFromCloudinary(coverImagePublicId, "image");
        await deleteFromCloudinary(pdffilePublicId, "raw");
      } catch (error) {
        return next(
          createHttpError(500, "Error occured at server while deleting book")
        );
      }

      Book.deleteOne({ _id: bookId })
        .then((result) => {
          console.log(result);
          res.status(200).json({ message: "Book Deleted Successfully" });
        })
        .catch((error) => {
          return next(
            createHttpError(
              500,
              "Error occurred at server while deleting Book Images"
            )
          );
        });
    })

    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(createHttpError(404, "Book Not Found"));
      }
      return next(
        createHttpError(500, "Error occurred at server while fetching book")
      );
    });
};
export { postCreateBook, postUpdateBook, getAllBooks, getBookById, deletebook };
