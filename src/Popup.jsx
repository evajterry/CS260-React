import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Popup.css';
// import { Login } from './Login/login';

const Popup = ({ hidePopups, onLogin }) => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', {email, password});
    onLogin(email, password);
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
            <label>Email</label>
            <input
              type="email"
              name="login-email"  // Changed from id to name
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="login-password"  // Changed from id to name
              value={password}
              onChange={handlePasswordChange}
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

