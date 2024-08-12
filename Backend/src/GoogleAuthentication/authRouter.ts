import express from "express";
import { loginSuccess, loginFailed, logoutHanlder } from "./authController";
import passport from "passport";
import { config } from "../config/config";
const authRouter = express.Router();

// authRouter.get("/login/success", loginSuccess);
// authRouter.get("/auth/login", loginFailed);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    successRedirect: config.CLIENT_URL,
  })
);
authRouter.get("/auth/logout", logoutHanlder);

export default authRouter;
