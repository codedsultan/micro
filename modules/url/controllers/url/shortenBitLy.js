
import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";
import utility from "../../../../utils/utility.js";

/// SHORTEN shortenBitLy ///

const shortenBitLy = catchAsyncError(async (req, res, next) => {

  const { longUrl} = req.body;

  // Create a unique short URL using your system (for example, a random string or counter)
  try {
    const response = await axios.post(
      `https://api-ssl.bitly.com/v4/shorten`,
      {
        long_url: longUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${BITLY_API_KEY}`,
        },
      }
    );

    const shortenedUrl = response.data.link;
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
  } catch (err) {
    // return next(new ErrorHandler("failed to shorten url using bitly", 500));
    res.status(500).json({ error: 'Failed to shorten URL using Bitly' });
  }
  
});

export default shortenBitLy;
