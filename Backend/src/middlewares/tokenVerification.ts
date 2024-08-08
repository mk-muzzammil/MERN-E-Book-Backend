import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";

export interface AuthRequest extends Request {
  userId: string;
}
const tokenVerification = (req: Request, res: Response, next: NextFunction) => {
  //token get from header by splitting
  //Authorization:Bearer token
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return next(createHttpError(401, "Token is missing"));
  }
  //veify token
  try {
    const payload = verify(token, config.JSON_WEB_TOKEN_SECRET as string);
    //add the userID from token to req object for further use
    const _req = req as AuthRequest;
    _req.userId = payload.sub as string;
    //if token is valid then next()
    next();
  } catch (error) {
    return next(createHttpError(401, "Token is invalid or expired"));
  }
};
export default tokenVerification;
