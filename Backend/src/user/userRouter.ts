import express from "express";
import { body } from "express-validator";
const userRouter = express.Router();
import { registerUser, loginUser } from "./userController";
import User from "./userModel";

userRouter.post(
  "/register",
  [
    body("name", "Please enter Valid name").isLength({ min: 5 }),
    body("email", "Please enter Valid email")
      .isEmail()
      .normalizeEmail()
      .trim()
      .custom((value) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email already exists Try another ");
          }
        });
      }),
    body("password", "Please enter Valid password").isLength({ min: 5 }).trim(),
  ],
  registerUser
);
userRouter.post(
  "/login",
  [
    body("email", "Please enter Valid email").isEmail().normalizeEmail().trim(),
    body("password", "Please enter Valid password").isLength({ min: 5 }).trim(),
  ],
  loginUser
);

export default userRouter;
