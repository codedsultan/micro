const express = require('express');
// const mongoose = require('mongoose');
const axios = require('axios');
const Url = require('./models/Url'); 
// Replace with your actual Google Analytics Tracking ID
const TRACKING_ID = 'UA-XXXXXXX-X';
const app = express();

// MongoDB URL model (assuming you have the URL schema)
// const Url = mongoose.model('Url', {
//   shortUrl: String,
//   longUrl: String,
//   expirationDate: Date,
//   createdAt: Date,
// });

// const urlSchema = new mongoose.Schema({
//     longUrl: String,
//     shortUrl: String,
//     customShortUrl: String,
//     createdAt: { type: Date, default: Date.now },
//     expirationDate: Date,
//     clicks: { type: Number, default: 0 }, // New field for click tracking
//   });
  

// Function to track URL click event in Google Analytics
const trackUrlClick = async (shortUrl, source, location) => {
  try {
    // Assuming source is the referrer (e.g., website, search engine, etc.)
    // Assuming location is the user’s geographical data (e.g., country, city)
    await axios.post('https://www.google-analytics.com/collect', null, {
      params: {
        v: '1', // Version
        tid: TRACKING_ID, // Tracking ID
        cid: '555', // Client ID (e.g., from cookies or generated)
        t: 'event', // Event type (event)
        ec: 'URL Shortener', // Event Category
        ea: 'Click', // Event Action
        el: shortUrl, // Event Label (shortened URL)
        ev: '1', // Event Value
        cd1: location, // Custom Dimension 1: Geographical data (e.g., country)
        cd2: source, // Custom Dimension 2: Referrer/Source (e.g., search engine)
      },
    });
  } catch (error) {
    console.error('Error sending data to Google Analytics:', error);
  }
};

// Function to track an ecommerce conversion (if you plan to monetize)
const trackEcommerceConversion = async (transactionId, revenue) => {
  try {
    await axios.post('https://www.google-analytics.com/collect', null, {
      params: {
        v: '1',
        tid: TRACKING_ID,
        cid: '555',
        t: 'transaction', // Transaction type
        ti: transactionId, // Transaction ID
        tr: revenue, // Revenue
        ec: 'URL Shortener', // Event Category
        ea: 'Subscription Purchase', // Event Action
        el: 'Premium Membership', // Event Label
        ev: revenue, // Event Value
      },
    });
  } catch (error) {
    console.error('Error tracking ecommerce conversion:', error);
  }
};

// Redirect shortened URL and track click event
app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ shortUrl });
    if (!url) return res.status(404).json('Short URL not found');

    const currentDate = new Date();
    if (url.expirationDate && currentDate > url.expirationDate) {
      await Url.deleteOne({ shortUrl });
      return res.status(410).json('This URL has expired');
    }

    // Track geographical data (e.g., using the IP or user-agent data)
    const source = req.headers.referer || 'Unknown'; // Track the referrer/source (e.g., search engine, website)
    const location = req.ip; // You can enhance this by using a geolocation service

    // Track URL click and send data to Google Analytics
    await trackUrlClick(shortUrl, source, location);

    // Redirect to long URL
    res.redirect(url.longUrl);
  } catch (err) {
    res.status(500).json('Server error');
  }
});

// Example route to simulate an ecommerce conversion (e.g., user buys premium service)
app.post('/purchase', async (req, res) => {
  const { transactionId, revenue } = req.body;

  try {
    // Track ecommerce conversion event
    await trackEcommerceConversion(transactionId, revenue);
    res.status(200).json('Ecommerce transaction tracked');
  } catch (err) {
    res.status(500).json('Error tracking ecommerce transaction');
  }
});

// URL shortening route
app.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
  
    const shortUrl = Math.random().toString(36).substring(2, 8); // Generate random 6 characters
    const expirationDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // 24 hours expiration
  
    try {
      const newUrl = new Url({ longUrl, shortUrl, expirationDate, createdAt: new Date() });
      await newUrl.save();
  
      res.status(200).json({ shortUrl: `http://localhost:3000/${shortUrl}` });
    } catch (err) {
      res.status(500).json('Error saving URL');
    }
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

// Endpoint to fetch analytics data
app.get('/analytics/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
  
    try {
      const url = await Url.findOne({ shortUrl });
      if (!url) return res.status(404).json('Short URL not found');
  
      res.json({ clicks: url.clicks });
    } catch (err) {
      res.status(500).json('Server error');
    }
});

app.get('/urls', async (req, res) => {
    try {
      const urls = await Url.find(); // Assuming your URL model is called Url
      res.status(200).json(urls);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
app.listen(3000, () => console.log('Server running on port 3000'));
