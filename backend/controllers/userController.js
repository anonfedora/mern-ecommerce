const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const crypto = require("crypto");
const sendToken = require("../utils/jwtToken.js");
const sendEmail = require("../utils/sendEmail.js");
const cloudinary = require("cloudinary").v2;

//Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  sendToken(user, 201, res);
});

//User Login
exports.userLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password!", 401));
  }

  const isPassword = await user.comparePassword(password);

  if (!isPassword) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

//User Logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  //Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
  const firstName = user.name.split(" ")[0];
  const message = `Dear ${firstName},\n\nYour password reset token from Shop is :- \n\n ${resetPasswordUrl}
  \n\nIf you have not requested for this email, please then ignore this message, more prefarrably, delete this message.
  \n\nPlease, do not share your token link with others.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Shop Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(err.message, 500));
  }
});

//Password Reset
exports.passwordReset = catchAsyncErrors(async (req, res, next) => {
  //creating token hash  from resetPasswordToken/resetPasswordExpire
  console.log(req.params.token);
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  //console.log(req.params.token);
  //console.log(resetPasswordToken);
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("Reset Password Token is invalid or has expired", 400)
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

//Get User Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//Update User Password
//Need to handle +password response
exports.passwordUpdate = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }
  user.password = req.body.newPassword;
  await await user.save();
  sendToken(user, 200, res);
});

exports.profileUpdate = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.uploader.destroy(imageId);

    const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

//Get all users => Admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Get single user => Admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User with Id: ${req.params.id} does not exist.`, 400)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
  console.log(user)
});

//Update user role => Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

exports.userDelete = catchAsyncErrors(async (req,res,next)=> {
  const user = await User.findById(req.params.id);

  if (!user){
    return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400))
  }
  console.log(user);
  const imageId = user.avatar.public_id;

  await cloudinary.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});



