import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import models from "../../../../models/index.js";

/// GET PROFILE DETAILS

const getProfileDetails = catchAsyncError(async (req, res, next) => {
  const user = await models.User.findById(req.user._id)
    .select([
      "_id", "fname", "lname", "email", "uname", "avatar",
      "dob", "gender", "about", "website", "location",
      "urlsCount" , "isValid", "accountStatus", "isVerified", "verificationStatus",
      "role", "createdAt", "emailVerified", "phone", "phoneVerified","fbid"
    ]);

  const profileDetails = {};

  profileDetails._id = user._id;
  profileDetails.fname = user.fname;
  profileDetails.lname = user.lname;
  profileDetails.email = user.email;
  profileDetails.emailVerified = user.emailVerified;
  profileDetails.uname = user.uname;
  profileDetails.avatar = user.avatar;
  profileDetails.phone = user.phone;
  profileDetails.phoneVerified = user.phoneVerified;
  profileDetails.dob = user.dob;
  profileDetails.gender = user.gender;
  profileDetails.about = user.about;
  profileDetails.website = user.website;
  profileDetails.location = user.location;
  profileDetails.urlsCount = user.urlsCount;
  profileDetails.isValid = user.isValid;
  profileDetails.accountStatus = user.accountStatus;
  profileDetails.isVerified = user.isVerified;
  profileDetails.verificationStatus = user.verificationStatus;
  profileDetails.role = user.role;
  profileDetails.createdAt = user.createdAt;
  profileDetails.fbid = user.fbid;

  res.status(200).json({
    success: true,
    user: profileDetails,
  });
});

export default getProfileDetails;
