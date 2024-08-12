import express from "express";
import GlobalErrorHanlder from "./middlewares/GlobalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./Books/bookRouter";
import cors from "cors";
import { config } from "./config/config";

// import passport from "passport";
// import session from "express-session";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import authRouter from "./GoogleAuthentication/authRouter";
// import dotenv from "dotenv";

const app = express();

// app.use(
//   session({
//     secret: "your-session-secret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.json());
app.use(
  cors({
    origin: [config.FRONTEND_URL as string, config.FRONTEND_URL_2 as string],
  })
);
// passport.serializeUser((user: any, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user: any, done) => {
//   done(null, user);
// });
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: config.GOOGLE_CLIENT_ID as string,
//       clientSecret: config.GOOGLE_CLIENT_SECRET as string,
//       callbackURL: config.GOOGLE_CALLBACK_URL as string,
//     },
//     async (
//       accessToken: string,
//       refreshToken: string,
//       profile: any,
//       done: Function
//     ) => {
//       // Handle user registration or login here
//       const user = {
//         googleId: profile.id,
//         displayName: profile.displayName,
//         email: profile.emails[0].value,
//       };
//       console.log(user);
//       done(null, user);
//     }
//   )
// );

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
// app.use("/auth", authRouter);
app.use(GlobalErrorHanlder);

export default app;
