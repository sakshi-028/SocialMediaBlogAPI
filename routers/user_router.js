const express = require("express");
const { signupUser, loginUser, getAllusers } = require("../controllers/user_controller");

const router = express.Router();

router.post("/signup",signupUser );
router.post("/login",loginUser );
router.get("/getUsers",getAllusers);


module.exports= router;
