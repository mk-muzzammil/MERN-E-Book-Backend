import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "./userModel";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

const registerUser = (req: Request, res: Response, next: NextFunction) => {
  //Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = createHttpError(403, "Validation Error Occured");
    console.log(errors.array());
    error.stack = errors
      .array()
      .map((err) => err.msg)
      .join(",");
    console.log(error.stack);
    return next(error);
  }
  //database process
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 12)
    .then((hashedpassword) => {
      const userObj = new User({
        name: name,
        email: email,
        password: hashedpassword,
      });
      return userObj.save();
    })
    .then((user) => {
      //Response
      const token = sign(
        { sub: user._id },
        config.JSON_WEB_TOKEN_SECRET as string,
        { expiresIn: "7d" }
      );

      res
        .status(201)
        .json({ message: "User Registered Succesfully ", accesToken: token });
    })
    .catch(() => {
      return next(
        createHttpError(500, "Error occured at Server in creating user ")
      );
    });
};

const loginUser = (req: Request, res: Response, next: NextFunction) => {
  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = createHttpError(403, "Validation Error Occured");
    error.stack = errors
      .array()
      .map((err) => err.msg)
      .join(",");
    return next(error);
  }
  //database process
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = createHttpError(404, "User Not Found,Incorrect Email ");
        return next(error);
      }
      bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (!match) {
            const error = createHttpError(403, "Password Not Matched");
            return next(error);
          }
          //response
          const token = sign(
            { sub: user._id },
            config.JSON_WEB_TOKEN_SECRET as string,
            { expiresIn: "7d" }
          );
          res
            .status(200)
            .json({ message: "User Logged In Succesfully", accesToken: token });
        })
        .catch(() => {
          return next(
            createHttpError(404, "User not Found ,Incorrect Email or password")
          );
        });
    })
    .catch(() => {
      return next(
        createHttpError(500, "Error occured at Server in creating user ")
      );
    });
  //response
};

export { registerUser, loginUser };
