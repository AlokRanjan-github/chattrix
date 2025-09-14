import { compare, hash } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "../middlewares/error.js";

// Create a new user and save it to the database and save in cookies

const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  // console.log(req.body);
  const avatar = {
    public_id: "asdfladkjf",
    url: "adfjurl",
  };
  const user = await User.create({
    name,
    username,
    password,
    bio,
    avatar,
  });

  // res.status(201).json({ message: "User created successfully" });
  sendToken(res, user, 201, "User Created Successfully");
};

const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Username", 404));

  const isMatch = await compare(password, user.password);

  if (!isMatch) return next(new ErrorHandler("Invalid Password", 404));

  sendToken(res, user, 200, `Welcome Back, ${user.name}`);
});

const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);

  if (!user) return next(new ErrorHandler("User not found", 404));

  res.status(200).json({
    success: true,
    user,
  });
});
const logout = TryCatch(async (req, res, next) => {
  res
    .status(200)
    .cookie("ItsaSecret-Token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully!",
    });
});
const searchUser = TryCatch(async (req, res, next) => {
  const {name} = req.query;
  res.json({
    success: true,
    message:name
  })
});

export { login, newUser, getMyProfile, logout, searchUser };
