import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";

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

const login = (req, res) => {
  res.send("Hello from User Login");
};

export { login, newUser };
