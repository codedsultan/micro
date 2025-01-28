import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";

/// DELETE USER ///

const deleteUser = catchAsyncError(async (req, res, next) => {
  if (!req.query.id) {
    return next(new ErrorHandler("please enter user id in query params", 400));
  }

  const user = await models.User.findById(req.query.id);

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  const urls = user.urls;
  const userId = user._id;

  await user.remove();

  for (let i = 0; i < urls.length; i++) {
    const url = await models.Url.findById(urls[i]);
    url.remove();
  }

  res.status(200).json({
    success: true,
    message: "user deleted successfully",
  });
});

export default deleteUser;
