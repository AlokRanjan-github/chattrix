import mongoose from "mongoose";
import jwt from "jsonwebtoken";
// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

const cookieOptions = {
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};
const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return res
    .status(code)
    .cookie("ItsaSecret-Token", token, cookieOptions)
    .json({
      success: true,
      message,
    });
};


export { connectDB, sendToken };
