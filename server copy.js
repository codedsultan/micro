const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// URL Schema for MongoDB
const urlSchema = new mongoose.Schema({
  longUrl: String,
  shortUrl: String,
  customShortUrl: String, // For custom short URLs
  createdAt: { type: Date, default: Date.now },
});

const Url = mongoose.model('Url', urlSchema);

// 3rd Party API Config (Bitly Example)
const BITLY_API_KEY = process.env.BITLY_API_KEY; // From your Bitly account

// Route to shorten URL using your own system
app.post('/shorten', async (req, res) => {
  const { longUrl, customShortUrl } = req.body;

  // Create a unique short URL using your system (for example, a random string or counter)
  const shortUrl = Math.random().toString(36).substring(2, 8);

  // If customShortUrl is provided, use it
  const finalShortUrl = customShortUrl || shortUrl;

  // Save the URL in MongoDB
  const newUrl = new Url({ longUrl, shortUrl: finalShortUrl, customShortUrl });
  await newUrl.save();

  res.json({ longUrl, shortUrl: finalShortUrl });
});

// Route to shorten URL using 3rd Party API (Bitly Example)
app.post('/shorten-bitly', async (req, res) => {
  const { longUrl } = req.body;

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
    const newUrl = new Url({ longUrl, shortUrl: shortenedUrl });
    await newUrl.save();

    res.json({ longUrl, shortUrl: shortenedUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to shorten URL using Bitly' });
  }
});

// Route to redirect to original URL based on shortened URL
app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ shortUrl });
    if (!url) return res.status(404).json('Short URL not found');
    
    res.redirect(url.longUrl);
  } catch (err) {
    res.status(500).json('Server error');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
