const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const generateReferralCode = () => {
  return (
    "NXA" +
    Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()
  );
};

/*
=========================
REGISTER USER
=========================
*/

const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      password,
      referralCode,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !mobile ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [
        { email },
        { mobile },
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "Email or mobile already registered",
      });
    }

    let parentUser = null;

    if (referralCode) {
      parentUser = await User.findOne({
        referralCode,
      });

      if (!parentUser) {
        return res.status(400).json({
          success: false,
          message: "Invalid referral code",
        });
      }
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      mobile,
      password: hashedPassword,
      referralCode:
        generateReferralCode(),
      referredBy: parentUser
        ? parentUser._id
        : null,
    });

    res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      token: generateToken(
        user._id
      ),
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        referralCode:
          user.referralCode,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
=========================
LOGIN USER
=========================
*/

const loginUser = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      token: generateToken(
        user._id
      ),
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        referralCode:
          user.referralCode,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
=========================
GET PROFILE
=========================
*/

const getProfile = async (
  req,
  res
) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};