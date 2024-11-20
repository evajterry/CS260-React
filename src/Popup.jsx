import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginOrCreate, } from './Login/unauthenticated';
import './Popup.css';
// import { Login } from './Login/login';

const Popup = ({ hidePopups, onLogin }) => {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });
  const [displayError, setDisplayError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const navigate = useNavigate();

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = '/api/auth/login';
    const userData = {
      email: formData.email,
      password: formData.password,
    }
  
  const result = await loginOrCreate(endpoint, userData, setDisplayError)

  if (result.success) {
    console.log('Logged into account:', userData);
    hidePopups();
    onLogin(formData.email);
    navigate('/Search');
  } else {
    alert('Error logging into account: account may not exist', displayError);
    console.log('Error logging into account:', displayError);
  }
  };

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
              name="email"  // Changed from id to name
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"  // Changed from id to name
              value={formData.password}
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

