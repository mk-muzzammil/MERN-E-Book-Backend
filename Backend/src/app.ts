import express from "express";
import GlobalErrorHanlder from "./middlewares/GlobalErrorHandler";
import userRouter from "./user/userRouter";
const app = express();

app.get("/", (req, res, next) => {
  res.json({ message: "Hello This is E book store" });
});

app.use("/api/users", userRouter);
app.use(GlobalErrorHanlder);

export default app;
