import express from "express";
import login  from "../controllers/user.js";

const router = express.Router();

// http://localhost/3000/user/
router.get("/",(req, res)=>{
    res.send("This is User Route Home page")
})

// http://localhost/3000/user/login
router.get("/login", login);

export { router  as userRoute};
