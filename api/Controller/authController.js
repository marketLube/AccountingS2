import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import catchAsync from "../Utilities/catchAsync.js";
import AppError from "../Utilities/appError.js";
import { updateOne } from "./handlerFactory.js";
import mongoose from "mongoose";
import { connectToDatabase } from "../index.js";

const KEY = process.env.JWT_SECRET;

const generateToken = (id) => {
  const expiresIn = Math.floor(Date.now() / 1000) + 60 * 10 * 2; // 8 hours in seconds
  return jwt.sign({ id, exp: expiresIn }, KEY);
};
const sendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);
  if (!token) return next(new AppError("Server failed to create token", 500));

  // Example: Setting cookie without expiration (session cookie)
  res.cookie("token", token, {
    httpOnly: true, // For security
    sameSite: "none", // Prevent CSRF
    secure: true,
  });

  const currentUser = {
    email: user.email,
    phone: user.phone,
    image: user.image,
    name: user.name,
    role: user.role,
    count: user.count,
    _id: user._id,
  };

  res.status(statusCode).json({
    status: "Success",
    message: "Successfully logged in",
    envelop: {
      currentUser,
    },
  });
};

// const mails = ["skymarkdubai@gmail.com", "arjun7180@gmail.com"];

export const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  // if (!mails.includes(email)) {
  //   return next(new AppError("You are not Authorized", 401));
  // }

  // Create the user first
  const newUser = await User.create({
    name,
    email,
    password,
    phone,
  });

  // Send the token
  sendToken(newUser, 201, res);
});

export const protect = catchAsync(async (req, res, next) => {
  // 1) Get the token and check its there
  const token = req.cookies.token;
  if (!token) return next(new AppError("Please Login to get access..", 401));

  // 2) Varify token
  const decode = jwt.verify(token, KEY); // there is a chance to get error

  // 3) Check the user is still exist to make sure
  const currentUser = await User.findById(decode.id);
  if (!currentUser)
    return next(
      new AppError("The User belong to this token is not exist", 401)
    );

  // passing the user  to next middleware
  req.user = currentUser;

  next();
});
export const verify = catchAsync(async (req, res, next) => {
  let isLoggedIn = false;
  // 1) Get the token and check its there
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ status: "Failed", message: "Logged in failed", isLoggedIn });

  // 2) Varify token
  const decode = jwt.verify(token, KEY);

  const currentUser = await User.findById(decode.id).select(
    "email phone image name"
  );

  if (!currentUser) {
    return res.status(404).json({
      status: "Failed",
      message: "The User belong to this token is not exist",
      isLoggedIn,
    });
  }

  isLoggedIn = true;
  res.status(200).json({
    status: "Success",
    message: "Successfully Logged in",
    isLoggedIn,
    currentUser,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(
      new AppError("User must give email and password to login", 400)
    );

  await mongoose.disconnect();
  await mongoose
    .connect(process.env.PRIMERY_STR)
    .then((res) => console.log("connected primary"))
    .catch((e) => console.log("Error conntection"));

  const user = await User.findOne({ email });
  if (!user) return next(new AppError("Unauthorized...", 404));

  //checking password is matching or not
  const isPasswordCorrect = await user.checkPassword(password, user.password);
  if (!isPasswordCorrect) return next(new AppError("Incorrect Password.."));

  // restricting password going to frontend
  user.password = undefined;

  // disconnect the current database and make new connection

  console.log("Disconnected from the main database.");

  const connections = process.env.CONNECTIONS.split(",,,");
  const count = parseFloat(user.count);

  const newDbUri = connections[count - 1];
  await mongoose.disconnect();
  await mongoose
    .connect(newDbUri)
    .then((res) => console.log("connected"))
    .catch((e) => console.log("Error conntection"));

  sendToken(user, 200, res);
});

export const loginByOtp = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next(new AppError("User must give email to login", 400));

  const user = await User.findOne({ email });
  if (!user) return next(new AppError("Unauthorized..", 401));

  //checking password is matching or not
  await user.createPasswordResetOtp(email);
  await user.save();

  res
    .status(200)
    .json({ status: "Success", message: "Otp has been sended successfully" });
});

export const verifyOtp = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return next(new AppError("Something went wrong user not found...", 400));

  if (Date.now() > user.otpExpires) {
    return next(new AppError("This Otp is expired. Try again..", 401));
  }

  if (user.passwordResetOtp != otp)
    return next(new AppError("Incorrect OTP check your inbox again...", 400));

  sendToken(user, 200, res);
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  if (!password) return next(new AppError("Please provide the password", 400));
  const user = await User.findById(req.user._id);
  user.password = password;
  user.save();
  res.status(200).json("Successfully updated password");
});

export const logout = catchAsync(async (req, res, next) => {
  // res.clearCookie("token", { path: "/" });
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res
    .status(200)
    .json({ status: "Success", message: "Logged out, cookie cleared" });
});

export const updateMe = updateOne(User);
