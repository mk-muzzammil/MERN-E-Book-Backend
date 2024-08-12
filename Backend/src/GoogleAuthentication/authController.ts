import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";

const loginSuccess = (req: Request, res: Response) => {
  if (req.user) {
    res.status(200).json({
      message: "User Logged in Successfully",
      user: req.user,
      error: false,
    });
  } else {
    res.status(403).json({ message: "User Not Logged in" });
  }
};
const loginFailed = (req: Request, res: Response) => {
  res.status(401).json({ message: "User Not Logged in Failure" });
};
const logoutHanlder = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err: Error) => {
    if (err) {
      return next(err);
    }
    res.redirect(config.CLIENT_URL as string);
  });
};

export { loginSuccess, loginFailed, logoutHanlder };
