const express = require("express");
const {
  updateUserData,
  registerUser,
  loginUser,
} = require("../../Controllers/userController");
const router = express.Router();

// login route
router.post("/login", loginUser);
//Register
router.post("/register", registerUser);
//Update user's data
router.put("/:id", updateUserData);

module.exports = router;
