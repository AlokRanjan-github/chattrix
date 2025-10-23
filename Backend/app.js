import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";

import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";

import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";
import { corsOptions } from "./constants/config.js";
import { socketAuthenticator } from "./middlewares/auth.js";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";

import {
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  ONLINE_USERS,
  START_TYPING,
  STOP_TYPING,
} from "./constants/events.js";

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

app.set("io", io);

app.use(cookieParser());
dotenv.config({
  path: "./.env",
  quiet: true,
});

//for accepting the json data coming from frontend (also req.body)
app.use(express.json());
app.use(cors(corsOptions));

//for only accepting form-data but we need multipart form-data so we're using multer as middleware
// app.use(express.urlencoded());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("Hello World from express");
});

const adminSecretKey = process.env.ADMIN_SECRET_KEY || "alokranjanboss";
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const userSocketIDs = new Map();
const onlineUsers = new Set();

//Authentication using inbuilt middleware
io.use((socket, next) => {
  cookieParser()(
    socket.request,
    socket.request.res,
    async (err) => await socketAuthenticator(err, socket, next)
  );
});

io.on("connection", (socket) => {
  const user = socket.user;
  userSocketIDs.set(user._id.toString(), socket.id);

  console.log("A user_id mapping with socket_id: ", userSocketIDs);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
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
      throw new Error(error);
    }
  });

  socket.on(START_TYPING, ({ members, chatId }) => {
    const membersSockets = getSockets(members);
    socket.to(membersSockets).emit(START_TYPING, { chatId });
  });

  socket.on(STOP_TYPING, ({ members, chatId }) => {
    const membersSockets = getSockets(members);
    socket.to(membersSockets).emit(STOP_TYPING, { chatId });
  });

  socket.on(CHAT_JOINED, ({ userId, members }) => {
    onlineUsers.add(userId.toString());

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
  });

  socket.on(CHAT_LEAVED, ({ userId, members }) => {
    onlineUsers.delete(userId.toString());

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
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
