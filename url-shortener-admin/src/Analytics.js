import React, { useState, useEffect } from 'react';

const Analytics = ({ shortUrl }) => {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await fetch(`http://localhost:5000/analytics/${shortUrl}`);
      const data = await response.json();
      setClicks(data.clicks);
    };

    fetchAnalytics();
  }, [shortUrl]);

  return (
    <div>
      <p>Clicks: {clicks}</p>
    </div>
  );
};

export default Analytics;
