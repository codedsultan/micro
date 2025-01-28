import cloudinary from "cloudinary";
import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";

/// UPDATE URL ///

const updateUrl = catchAsyncError(async (req, res, next) => {
  if (!req.query.id) {
    return next(new ErrorHandler("please enter url id in query params", 400));
  }

  const { longUrl } = req.body;

  const url = await models.Url.findById(req.query.id);

  if (!url) {
    return next(new ErrorHandler("url not found", 404));
  }

  if (user.owner.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("unauthorized operation", 401));
  }

  if (longUrl) {
    longUrl.caption = longUrl;
  }


  await url.save();

  res.status(200).json({
    success: true,
    message: "url updated successfully",
  });
});

export default updateUrl;
