
import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";
import utility from "../../../../utils/utility.js";

/// SHORTEN URL ///

const shortenUrl = catchAsyncError(async (req, res, next) => {
  const { longUrl, customShortUrl } = req.body;

  // Create a unique short URL using your system (for example, a random string or counter)
  const shortUrl = Math.random().toString(36).substring(2, 8);

  // If customShortUrl is provided, use it
  const finalShortUrl =  shortUrl;

  // Save the URL in MongoDB
  const newUrl =  {
    longUrl: longUrl,
    shortUrl: finalShortUrl,
    // customShortUrl: customShortUrl,
    owner: req.user._id,
  }
  url = await models.Url.create(newUrl);

  const user = await models.User.findById(req.user._id);

  user.urls.push(url._id);
  user.urlsCount++;

  await user.save();

  const ownerData = await utility.getOwnerData(url.owner, req.user);

  const urlData = {};

  urlData._id = url._id;
  urlData.longUrl = url.longUrl;
  urlData.shortUrl = url.shortUrl;
  urlData.owner = ownerData;
  

  res.status(201).json({
    success: true,
    message: "url shortened successfully",
    url:  urlData
  });

});

export default shortenUrl;
