import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";

/// DELETE URL ///

const deleteUrl = catchAsyncError(async (req, res, next) => {
  if (!req.query.id) {
    return next(new ErrorHandler("please enter url id in query params", 400));
  }

  const url = await models.Url.findById(req.query.id);

  if (!url) {
    return next(new ErrorHandler("url not found", 404));
  }

  if (url.owner.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("unauthorized operation", 401));
  }

  await url.remove();

  const user = await models.User.findById(req.user._id);

  const index = user.urls.indexOf(req.query.id);

  user.urls.splice(index, 1);
  user.urlsCount--;

  await user.save();

  res.status(200).json({
    success: true,
    message: "url deleted successfully",
  });
});

export default deleteUrl;
