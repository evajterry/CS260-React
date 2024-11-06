import React from 'react';

function CreateAccountPopup({ hidePopups }) {
  return (
    <>
      <div className="overlay" onClick={hidePopups}></div> {/* Overlay */}
      <div className="popup" id="createAccountPopup">
        <span className="close" onClick={hidePopups}>&times;</span>
        <h2>Create Account</h2>
        <form method="get" action="search.html">
          {/* Add fields for creating an account here */}
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" name="first-name" required />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" name="last-name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" name="dob" required />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select id="country" name="country" required>
              <option value="">Select a country</option>
              <option value="BGD">Bangladesh</option>
              <option value="BRA">Brazil</option>
              <option value="CAN">Canada</option>
              <option value="CHN">China</option>
              <option value="COD">Democratic Republic of the Congo</option>
              <option value="DEU">Germany</option>
              <option value="EGY">Egypt</option>
              <option value="ETH">Ethiopia</option>
              <option value="IDN">Indonesia</option>
              <option value="IND">India</option>
              <option value="IRN">Iran</option>
              <option value="JPN">Japan</option>
              <option value="MEX">Mexico</option>
              <option value="NGA">Nigeria</option>
              <option value="PAK">Pakistan</option>
              <option value="PHL">Philippines</option>
              <option value="KOR">South Korea</option>
              <option value="THA">Thailand</option>
              <option value="TUR">Turkey</option>
              <option value="USA">United States</option>
              <option value="VNM">Vietnam</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </>
  );
}

export default CreateAccountPopup;
