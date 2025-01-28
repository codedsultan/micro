import React, { useState, useEffect } from 'react';
import { fetchUrls } from '../api';
import Analytics from './Analytics';
import ShortenUrlForm from './ShortenUrlForm';

const Dashboard = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const getUrls = async () => {
      const data = await fetchUrls();
      setUrls(data);
    };

    getUrls();
  }, []);

  return (
    <div className="dashboard">
      <h1>URL Shortener Dashboard</h1>
      <ShortenUrlForm />
      <h2>URL List</h2>
      <table>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Shortened URL</th>
            <th>Analytics</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url.shortUrl}>
              <td>{url.longUrl}</td>
              <td><a href={`/${url.shortUrl}`} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a></td>
              <td>
                <Analytics shortUrl={url.shortUrl} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
