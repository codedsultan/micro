// const mongoose = require('mongoose');

import mongoose from 'mongoose';
// Define the schema for the URL
const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true, // Ensures the original URL is provided
    unique: true,   // Prevents duplication of the original URL
  },
  shortUrl: {
    type: String,
    required: true, // Shortened URL generated automatically
    unique: true,   // Ensures the shortened URL is unique
  },
  customShortUrl: {
    type: String,
    unique: true,   // Ensures custom short URL is unique
    sparse: true,   // Allows for the field to be empty if not used
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation date
  },
  expirationDate: {
    type: Date,
    default: null, // Optional field for expiration
  },
  clicks: {
    type: Number,
    default: 0, // Tracks the number of times the shortened URL is clicked
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});


// Create the model using the schema
const Url = mongoose.model('Url', urlSchema);

// Export the model
// module.exports = Url;
export default Url;
