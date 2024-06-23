import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import User from "../models/user-model.js";
import { ErrorHandler } from "../utils/error-handler.js";
import sendToken from "../utils/jwtToken.js";

//* Register
const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    return next(
      new ErrorHandler(`User wtih email:${email} Already Exist`, 400)
    );
  }
  const user = await User.create({ name, email, password });

  sendToken(user, 201, res);
});

//* Login

const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }
  sendToken(user, 200, res);
});

//* Get user

const getUser = catchAsyncError(async (req, res, next) => {
  // Check if user ID is present in the request
  if (!req.user || !req.user.id) {
    return next(new ErrorHandler("Unauthorized", 401));
  }

  const userId = req.user.id;

  // Fetch user data from the database using the user ID
  const user = await User.findById(userId);

  // Check if user exists
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  // Respond with user data
  res.status(200).json(user);
});

//* Logout
const logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});

//* Get ALl users -- Admin

const getUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

export default { register, login, getUser, getUsers, logout };
