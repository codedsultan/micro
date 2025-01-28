A url shortner API using Node.js, Express, MongoDB

## Installation

1. Clone the repository
2. Install dependencies using npm
3. Create a .env file in the root directory and add the following variables:

<!-- MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
CLOUDINARY_API_KEY=<cloudinary-api-key>
CLOUDINARY_API_SECRET=<cloudinary-api-secret> -->

4. Run the server using node

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


POST http://localhost:5000/shorten-bitly
Content-Type: application/json

{
  "longUrl": "https://www.example.com"
}


Response:
{
  "longUrl": "https://www.example.com",
  "shortUrl": "https://bit.ly/3n8v7x8"
}