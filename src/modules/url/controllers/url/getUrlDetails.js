import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";

/// GET URL DETAILS ///

const getUrlDetails = catchAsyncError(async (req, res, next) => {
  if (!req.query.id) {
    return next(new ErrorHandler("please enter url id in query params", 400));
  }

  const url = await models.Url.findById(req.query.id).select("-__v");

  if (!url) {
    return next(new ErrorHandler("url not found", 404));
  }

  await url.populate([
    {
      path: "owner",
      model: "User",
      select: [
        "_id",
        "fname",
        "lname",
        "email",
        "uname",
        "avatar",
        "accountStatus",
        "isVerified",
      ],
    },
  ]);

  res.status(200).json({
    success: true,
    url,
  });
});

export default getUrlDetails;