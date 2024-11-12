import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Popup.css';
import { Login } from './Login/login';

const Popup = ({ hidePopups, onLogin }) => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email);
    hidePopups();
    navigate('/Search');
  }

  return (
    <>
      <div className="popup-overlay" onClick={hidePopups}></div>
      <div className="popup">
        <span className="close" onClick={hidePopups}>&times;</span>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              required
              />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
      
    </>
  );
};

export default Popup;

