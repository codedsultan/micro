// Route to redirect to original URL based on shortened URL
// app.get('/:shortUrl', async (req, res) => {
//     const { shortUrl } = req.params;
  
//     try {
//       const url = await Url.findOne({ shortUrl });
//       if (!url) return res.status(404).json('Short URL not found');
      
//       res.redirect(url.longUrl);
//     } catch (err) {
//       res.status(500).json('Server error');
//     }
//   });


import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";

/// GET URL and redirect ///

const getUrlRedirect = catchAsyncError(async (req, res, next) => {
  const { shortUrl } = req.params;

  if (!shortUrl) {
    return next(new ErrorHandler("please enter a short url", 400));
  }

  const url = await models.Url.findOne({ shortUrl });

  if (!url) {
    return next(new ErrorHandler("url not found", 404));
  }

  res.redirect(url.longUrl);
});

export default getUrlRedirect;