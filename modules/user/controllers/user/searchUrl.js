import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";

/// SEARCH URL ///

const searchUrl = catchAsyncError(async (req, res, next) => {
  if (!req.query.q) {
    return next(new ErrorHandler("please provide a search query", 400));
  }

  const searchText = req.query.q;

  const urls = await models.Url.find(
    {
      owner: user._id,
      $or: [
        {
          longUrl: new RegExp(searchText, "gi"),
        },
        {
          shortUrl: new RegExp(searchText, "gi"),
        },
        
      ],
    },
    {
      _id: 1,
      longUrl: 1,
      shortUrl: 1,
      createdAt: 1,
    }
  );

  if (urls.length <= 0) {
    return next(new ErrorHandler("no user found", 404));
  }

  res.status(200).json({
    success: true,
    count: urls.length,
    results: urls,
  });
});

export default searchUrl;
