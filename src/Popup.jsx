import React from 'react';
import './Popup.css';

const Popup = ({ hidePopups }) => {
  return (
    <>
      <div className="popup-overlay" id="overlay" onClick={hidePopups}></div>

      <div className="popup" id="loginPopup">
        <span className="close" onClick={hidePopups}>&times;</span>
        <h2>Login</h2>
        <form method="get" action="search.html">
          <div className="form-group">
            <span>@</span>
            <input type="text" placeholder="your@email.com" />
          </div>
          <div className="form-group">
            <span>🔒</span>
            <input type="password" placeholder="password" />
          </div>
          <button type="submit" className="submit-btn">Access some poetry!</button>
        </form>
      </div>
    </>
  );
};

export default Popup;
