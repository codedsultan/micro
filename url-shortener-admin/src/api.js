import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Change if needed

export const shortenUrl = async (longUrl, customShortUrl) => {
  const response = await axios.post(`${BASE_URL}/shorten`, {
    longUrl,
    customShortUrl
  });
  return response.data;
};

export const shortenUrlWithBitly = async (longUrl) => {
  const response = await axios.post(`${BASE_URL}/shorten-bitly`, {
    longUrl
  });
  return response.data;
};

export const fetchUrls = async () => {
  const response = await axios.get(`${BASE_URL}/urls`); // Assuming a route for fetching all URLs
  return response.data;
};
