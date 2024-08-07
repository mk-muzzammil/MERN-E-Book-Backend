import express from "express";
const userRouter = express.Router();
import { registerUser } from "./userController";

userRouter.post("/register", registerUser);

export default userRouter;
