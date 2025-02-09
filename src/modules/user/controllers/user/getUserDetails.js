import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";

/// GET USER DETAILS ///

const getUserDetails = catchAsyncError(async (req, res, next) => {
  if (!req.query.id) {
    return next(new ErrorHandler("please enter user id in query params", 400));
  }

  const user = await models.User.findById(req.query.id)
    .select({
      _id: 1,
      fname: 1,
      lname: 1,
      email: 1,
      uname: 1,
      urlsCount: 1,
      avatar: 1,
      about: 1,
      dob: 1,
      gender: 1,
      website: 1,
      role: 1,
      accountStatus: 1,
      isVerified: 1,
      createdAt: 1,
      fbid:1
    });

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  const userDetails = {};

  userDetails._id = user._id;
  userDetails.fname = user.fname;
  userDetails.lname = user.lname;
  userDetails.email = user.email;
  userDetails.uname = user.uname;
  userDetails.urlsCount = user.urlsCount;
  userDetails.avatar = user.avatar;
  userDetails.about = user.about;
  userDetails.dob = user.dob;
  userDetails.gender = user.gender;
  userDetails.website = user.website;
  userDetails.role = user.role;
  userDetails.accountStatus = user.accountStatus;
  userDetails.isVerified = user.isVerified;
  userDetails.createdAt = user.createdAt;
  userDetails.fbid = user.fbid;
  res.status(200).json({
    success: true,
    user: userDetails,
  });
});

export default getUserDetails;
