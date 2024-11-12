import React, { useState } from 'react';
import './CreateAccountPopup';
import { useNavigate } from 'react-router-dom';

const CreateAccountPopup = ({ hidePopups }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
    console.log('Form submitted:', formData);
    hidePopups();
    navigate('/Search');
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
            <label htmlFor="email">Email</label>
            <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
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
