// const mongoose = require('mongoose');

import mongoose from 'mongoose';
// Define the schema for the URL
const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true, // Set to false to remove 'required' validation
    unique: false,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  customShortUrl: {
    type: String,
    unique: true,
    sparse: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expirationDate: {
    type: Date,
    default: null,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

// Create the model using the schema
const Url = mongoose.model('Url', urlSchema);

// Export the model
// module.exports = Url;
export default Url;
