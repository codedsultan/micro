node server.js

POST http://localhost:5000/shorten
Content-Type: application/json

{
  "longUrl": "https://www.example.com",
  "customShortUrl": "customalias"
}

Response:
{
  "longUrl": "https://www.example.com",
  "shortUrl": "customalias"
}
