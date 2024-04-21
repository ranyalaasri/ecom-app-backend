const User = require("../models/user.js");
const { HashPassword, VerifyPassword } = require("../utils/Hashing.js");
const jwt = require("jsonwebtoken");
const config = require("./../config/keys");
const CONSTANTS = require("../constants/index");

exports.registerUser = async (req, res) => {
  console.log("front app", req.body);
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUserByEmail = await User.findOne({ email: email }).select(
      "-password"
    );

    if (existingUserByEmail) {
      res
        .status(CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE)
        .json("Email already exists.");
    }

    const hashedPass = await HashPassword(password);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPass,
    });

    const userWithoutPassword = newUser.toObject();
    delete userWithoutPassword.password;

    if (!newUser) {
      res
        .status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE)
        .json(CONSTANTS.SERVER_ERROR);
    }

    res.status(CONSTANTS.SERVER_CREATED_HTTP_CODE).json(newUser);
  } catch (error) {
    res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
      message: CONSTANTS.SERVER_ERROR,
      status: CONSTANTS.SERVER_ERROR_HTTP_CODE,
    });
  }
};

exports.loginUser = async (req, res) => {
  const response = {};
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const passwordMatch = await VerifyPassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        userFirstName: user.firstName,
        userLastName: user.lastName,
        userEmail: user.email,
        userRole: "Admin",
      },
      config.jwt.secret
    );
    response.message = "Login success";
    response.user = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    response.token = token;
    response.token_type = "Bearer";

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, firstName, lastName, email, phoneNumber } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const currentTimestamp = Date.now();

    const updatedUser = {
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      lastUpdate: currentTimestamp,
    };

    const userUpdated = await User.findOneAndUpdate({ _id: id }, updatedUser, {
      upsert: false,
      new: true,
    });

    res.status(200).json("User Updated successfully.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
