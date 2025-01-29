import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import validators from "../../../../utils/validators.js";
import utility from "../../../../utils/utility.js";

/// CHECK URL AVAILABLE ///

const checkUrlAvailable = catchAsyncError(async (req, res, next) => {
  const { shortUrl } = req.body;

  if (!shortUrl) {
    return next(new ErrorHandler("please enter a short url", 400));
  }

  // const uname = shortUrl.split("/")[1];

  

  // if (shortUrl && !validators.validateUrl(uname)) {
  //   return next(new ErrorHandler("please enter a valid url", 400));
  // }

  const isUrlAvailable = await utility.checkUrlAvailable(
    shortUrl.toLowerCase()
  );

  if (isUrlAvailable) {
    res.status(200).json({
      success: true,
      message: "url is available",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "url is not available",
    });
  }
});

export default checkUrlAvailable;
