import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Popup.css';
import { Login } from './Login/login';

const Popup = ({ hidePopups, onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateToSearch = (event) => {
    event.preventDefault();
    console.log('Logging in...');

    // Validate email and password if needed here

    // Call the onLogin function to update the authState in App.js
    onLogin(email); // Set email as the userName

    // Close the popup and navigate to the Search page
    hidePopups();
    navigate('/Search');
  };

  return (
    <>
      <div className="popup-overlay" onClick={hidePopups}></div>
      <div className="popup" id="loginPopup">
        <span className="close" onClick={hidePopups}>&times;</span>
        <form onSubmit={navigateToSearch}>
          <div className="form-group">
            <span>@</span>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <span>🔒</span>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">Access some poetry!</button>
        </form>
      </div>
    </>
  );
};

export default Popup;

