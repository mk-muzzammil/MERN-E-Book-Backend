import express from "express";
import GlobalErrorHanlder from "./middlewares/GlobalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./Books/bookRouter";
import cors from "cors";
import { config } from "./config/config";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: config.FRONTEND_URL,
  })
);
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
//   next();
// });
app.get("/", (req, res, next) => {
  res.json({ message: "Hello This is E book store" });
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.use(GlobalErrorHanlder);

export default app;
