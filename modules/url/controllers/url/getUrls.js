import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";
import utility from "../../../../utils/utility.js";

/// GET URLs ///

const getUrls = catchAsyncError(async (req, res, next) => {
  const user = await models.User.findById(req.user._id)
    .select("_id following");

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  let currentPage = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;


  const urls = await models.Url.find({
    owner: {
      $in: [user._id],
    },
  }).sort({
    createdAt: -1,
  });

  const urlsResults = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    const ownerData = await utility.getOwnerData(url.owner, req.user);

    const urlData = {};
    urlData._id = url._id;
    urlData.shortUrl = url.shortUrl;
    urlData.longUrl = url.longUrl;
    urlData.createdAt = url.createdAt;
    urlsResults.push(urlData);
  }

  let totalUrls = urls.length;
  let totalPages = Math.ceil(totalUrls / limit);

  if (currentPage < 1) {
    currentPage = 1;
  }

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let skip = (currentPage - 1) * limit;

  let prevPageIndex = null;
  let hasPrevPage = false;
  let prevPage = null;
  let nextPageIndex = null;
  let hasNextPage = false;
  let nextPage = null;

  if (currentPage < totalPages) {
    nextPageIndex = currentPage + 1;
    hasNextPage = true;
  }

  if (currentPage > 1) {
    prevPageIndex = currentPage - 1;
    hasPrevPage = true;
  }

  const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl
    }`.split("?")[0];

  if (hasPrevPage) {
    prevPage = `${baseUrl}?page=${prevPageIndex}&limit=${limit}`;
  }

  if (hasNextPage) {
    nextPage = `${baseUrl}?page=${nextPageIndex}&limit=${limit}`;
  }

  const results = urlsResults.slice(skip, skip + limit);

  res.status(200).json({
    success: true,
    currentPage,
    totalPages,
    limit,
    hasPrevPage,
    prevPage,
    hasNextPage,
    nextPage,
    results,
  });
});

export default getUrls;