import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/features.js";
import userRoute from "./routes/user.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

const app = express();
//for accepting the json data coming from frontend (also req.body)
app.use(express.json());
//for only accepting form-data but we need multipart form-data so we're using multer as middleware
// app.use(express.urlencoded());

app.use(cookieParser());
dotenv.config({
  path: "./.env",
  quiet: true,
});

app.use("/user", userRoute);
app.get("/", (req, res) => {
  res.send("Hello World from express");
});

app.use(errorMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
