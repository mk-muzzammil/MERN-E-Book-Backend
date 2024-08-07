import express from "express";
import GlobalErrorHanlder from "../middlewares/GlobalErrorHandler";
const app = express();

app.get("/", (req, res, next) => {
  res.json({ message: "Hello This is E book store" });
});

app.use(GlobalErrorHanlder);

export default app;
