import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  res.json({ message: "Hello This is E book store" });
});

export default app;
