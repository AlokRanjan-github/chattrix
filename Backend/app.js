import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";

const app = express();

app.use(cookieParser());
dotenv.config({
  path: "./.env",
  quiet: true,
});

//for accepting the json data coming from frontend (also req.body)
app.use(express.json());

//for only accepting form-data but we need multipart form-data so we're using multer as middleware
// app.use(express.urlencoded());

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("Hello World from express");
});

app.use(errorMiddleware);

const adminSecretKey = process.env.ADMIN_SECRET_KEY || "alokranjanboss";
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

const port = process.env.PORT || 5000;
app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port} IN ${envMode} Mode`);
});

export { envMode, adminSecretKey };
