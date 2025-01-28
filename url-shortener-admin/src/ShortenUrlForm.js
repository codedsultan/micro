const [expirationDate, setExpirationDate] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await shortenUrl(longUrl, customShortUrl, expirationDate);
    setResult(data);
  } catch (err) {
    console.error(err);
  }
};

return (
  <div className="shorten-form">
    <h2>Shorten a URL</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Long URL:</label>
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Custom Short URL (optional):</label>
        <input
          type="text"
          value={customShortUrl}
          onChange={(e) => setCustomShortUrl(e.target.value)}
        />
      </div>
      <div>
        <label>Expiration Date (optional):</label>
        <input
          type="datetime-local"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
      </div>
      <button type="submit">Shorten</button>
    </form>
    {result && (
      <div>
        <p>Shortened URL: <a href={`/${result.shortUrl}`} target="_blank" rel="noopener noreferrer">{result.shortUrl}</a></p>
      </div>
    )}
  </div>
);
