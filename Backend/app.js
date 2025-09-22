import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";

import { Server } from "socket.io";
import { createServer } from "http";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";

import cors from "cors";

const app = express();

const server = createServer(app);
const io = new Server(server, {});

app.use(cookieParser());
dotenv.config({
  path: "./.env",
  quiet: true,
});

//for accepting the json data coming from frontend (also req.body)
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);

//for only accepting form-data but we need multipart form-data so we're using multer as middleware
// app.use(express.urlencoded());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("Hello World from express");
});

const adminSecretKey = process.env.ADMIN_SECRET_KEY || "alokranjanboss";
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const userSocketIDs = new Map();

io.on("connection", (socket) => {
  //Authentication using inbuilt middleware

  io.use((socket, next) => {});

  const user = {
    _id: "fo32se2i98fec",
    name: "kalluaBadmos",
  };

  userSocketIDs.set(user._id.toString(), socket.id);

  console.log("A user_id mapping with socket_id: ", userSocketIDs);

  socket.on(NEW_MESSAGE, async ({ chatId, members, messages }) => {
    const messageForRealTime = {
      content: messages,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: messages,
      sender: user._id,
      chat: chatId,
    };

    const membersSocket = getSockets(members);

    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });

    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

    try {
      await Message.create(messageForDB);
    } catch (error) {
      console.log(error);
    }

    console.log("New Message", messageForRealTime);
  });

  socket.on("disconnect", () => {
    console.log("A user Disconnected", socket.id);
    userSocketIDs.delete(user._id.toString());
  });
});

app.use(errorMiddleware);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port} IN ${envMode} Mode`);
});

export { envMode, adminSecretKey, userSocketIDs };
