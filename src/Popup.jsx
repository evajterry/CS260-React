import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Popup.css';

const Popup = ({ hidePopups, onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateToSearch = (event) => {
    event.preventDefault();
    console.log('Logging in...');
    
    // You can validate email and password here if needed

    // Call the onLogin function passed from the parent to update the authState
    onLogin(email); // Pass email as the login username
    navigate('/Search'); // Navigate to the Search page
  };

  return (
    <>
      <div className="popup-overlay" id="overlay" onClick={hidePopups}></div>
      <div className="popup" id="loginPopup">
        <span className="close" onClick={hidePopups}>&times;</span>
        <h2>Login</h2>
        <form onSubmit={navigateToSearch}>
          <div className="form-group">
            <span>@</span>
            <input 
              type="text" 
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
