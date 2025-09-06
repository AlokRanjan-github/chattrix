import express from "express";
import { userRoute } from "./routes/user.js";

const app = express();

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World from express");
});

app.listen(3000, () => {
  console.log("Server is listening to port 3000 ");
});
