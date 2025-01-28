import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";

/// GET URLs ///

const getAllUrls = catchAsyncError(async (req, res, next) => {
  const user = await models.User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  let currentPage = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 50;

  const urls = await models.Url.find()
    .select("-__v")
    .populate("owner", [
      "_id",
      "fname",
      "lname",
      "email",
      "uname",
      "avatar",
      "accountType",
      "accountStatus",
      "isVerified",
    ])
    .sort({
      createdAt: -1,
    });

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

  const baseUrl = `${req.protocol}://${req.get("host")}${
    req.originalUrl
  }`.split("?")[0];

  if (hasPrevPage) {
    prevPage = `${baseUrl}?page=${prevPageIndex}&limit=${limit}`;
  }

  if (hasNextPage) {
    nextPage = `${baseUrl}?page=${nextPageIndex}&limit=${limit}`;
  }

  const results = urls.slice(skip, skip + limit);

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

export default getAllUrls;
