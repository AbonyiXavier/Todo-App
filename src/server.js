import express from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import passport from "passport";
import cookieSession from "cookie-session";
import createError from "http-errors";
import dotenv from "dotenv";
import router from "./routes/index";

require("./helpers/database/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", router);

app.get("/", (request, response) => {
  response.status(200).json({
    status: true,
    message: "Todo App API",
  });
});

app.use((request, response, next) => {
  next(createError.NotFound());
});

app.use((err, request, response, next) => {
  response.status(err.status || 500);
  response.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});

export default app;
