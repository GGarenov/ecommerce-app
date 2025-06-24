const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const isProduction = process.env.NODE_ENV === "production";

const JWT_SECRET_KEY =
  process.env.JWT_SECRET_KEY || "your_fallback_secret_for_dev_only";
if (!process.env.JWT_SECRET_KEY) {
  console.warn(
    "JWT_SECRET_KEY is not set as an environment variable! Using a fallback for development. THIS IS NOT SECURE FOR PRODUCTION."
  );
}

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "This email is already in use",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exist",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },

      JWT_SECRET_KEY,
      { expiresIn: "60m" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "None" : "Lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .json({
        success: true,
        message: "Logged in successfully",
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const logoutUser = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
    })
    .json({
      success: true,
      message: "Logged out successfully!",
    });
};

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
