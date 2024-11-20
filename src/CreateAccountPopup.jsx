import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { loginOrCreate, } from './Login/unauthenticated';

const CreateAccountPopup = ({ hidePopups, onAccountCreated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [displayError, setDisplayError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handle form submission
    const endpoint = '/api/auth/create'; // needs to be the account creation endpoint
    const userData = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
    };
    // navigate('/Search'); make sure we still navigate to search

    const result = await loginOrCreate(endpoint, userData, setDisplayError)

    if (result.success) {
      console.log('Account created successfully:', userData);
      hidePopups();
      console.log('onAccountCreated:', onAccountCreated, hidePopups);
      onAccountCreated(formData.email); // Pass the user name to update the header
      navigate('/Search');
    } else {
      alert('Error creating account: account may already exist', displayError);
      console.log('Error creating account:', displayError);
    }
  };

  return (
    <>
      <div className="overlay" onClick={hidePopups}></div> {/* Overlay */}
      <div className="popup">
        <span className="close" onClick={hidePopups}>&times;</span>

        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input
            type="text"
            id="first-name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
            type="text"
            id="last-name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group">
            <label htmlFor="create-email">Email</label>
            <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group">
            <label htmlFor="create-password">Password</label>
            <input
            type="password"
            id="password"
            name="password"
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
}

export default CreateAccountPopup;
