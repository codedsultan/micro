import logo from './logo.svg';
import './App.css';





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
// Replace with your Google Analytics Tracking ID
// const TRACKING_ID = 'UA-XXXXXXX-X';

// const App = () => {
//   const [longUrl, setLongUrl] = useState('');
//   const [shortUrl, setShortUrl] = useState('');
//   const [result, setResult] = useState('');
//   const [transactionId, setTransactionId] = useState('');
//   const [revenue, setRevenue] = useState(0);

//   // Initialize Google Analytics
//   useEffect(() => {
//     ReactGA.initialize(TRACKING_ID);
//     ReactGA.pageview(window.location.pathname + window.location.search);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Track URL shortening event in Google Analytics
//     ReactGA.event({
//       category: 'User',
//       action: 'Submitted URL to shorten',
//       label: longUrl,
//     });

//     try {
//       const response = await axios.post('http://localhost:3000/shorten', { longUrl });
//       setResult(response.data.shortUrl);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handlePurchase = async () => {
//     try {
//       // Track ecommerce conversion in Google Analytics
//       ReactGA.event({
//         category: 'Ecommerce',
//         action: 'Subscription Purchase',
//         label: 'Premium Membership',
//         value: revenue,
//       });

//       const response = await axios.post('http://localhost:3000/purchase', {
//         transactionId,
//         revenue,
//       });
//       console.log(response.data);
//     } catch (err) {
//       console.error('Error during purchase tracking:', err);
//     }
//   };

//   return (
//     <div>
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//       <h1>URL Shortener</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="url"
//           placeholder="Enter long URL"
//           value={longUrl}
//           onChange={(e) => setLongUrl(e.target.value)}
//         />
//         <button type="submit">Shorten</button>
//       </form>

//       {result && (
//         <div>
//           <p>Shortened URL: {result}</p>
//           <a href={result} target="_blank" rel="noopener noreferrer">Visit Short URL</a>
//         </div>
//       )}

//       <h2>Make a Purchase</h2>
//       <button onClick={handlePurchase}>Track Ecommerce Purchase</button>
//     </div>
//   );
// };



const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;

