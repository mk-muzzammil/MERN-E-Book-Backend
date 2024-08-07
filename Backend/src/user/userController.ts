import { NextFunction, Request, Response } from "express";

const registerUser = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Register User" });
};

export { registerUser };
