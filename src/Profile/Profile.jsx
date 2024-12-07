import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
    const [bio, setBio] = useState("");
    const [poems, setPoems] = useState([]); // Store all poems
    const [selectedPoem, setSelectedPoem] = useState(null); // Selected poem for modal
    const [showPoemPopup, setShowPoemPopup] = useState(false);
    const [showPoemOverlay, setShowPoemOverlay] = useState(false); // To control overlay visibility
    const navigate = useNavigate();
    const email = localStorage.getItem("userEmail");
    if (!email) {
      console.error("No email found. User might not be logged in.");
    }

    useEffect(() => {
      const fetchBio = async () => {
        try {
          const response = await fetch(`/api/users/${email}/bio`);
          if (response.ok) {
            const data = await response.json();
            setBio(data.bio);
          } else {
            console.error("Failed to fetch bio");
          }
        } catch (error) {
          console.error("Error fetching bio:", error);
        }
      };
  
      fetchBio();
    }, []); // Empty dependency array ensures this runs only once when the component mounts
    
      // Fetch poems on component mount
    useEffect(() => {
      const fetchPoems = async () => {
        try {
          const response = await fetch(`/api/users/${email}/poems`);
          console.log(poems);
          console.log(response);
          if (response.ok) {
            const data = await response.json();
            console.log("Fetched data:", data); // Check structure here
            setPoems(data.poems); // Assuming the response contains a `poems` array
            console.log("Updated poems state:", data.poems); 
          } else {
            console.error("Failed to fetch poems");
          }
        } catch (error) {
          console.error("Error fetching poems:", error);
        }
      };

      fetchPoems();
    }, [email]);
  
    const handleBioChange = (e) => setBio(e.target.value);

    const handleSaveBio = async () => {
      try {
        const response = await fetch(`/api/users/${email}/bio`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bio }),
        });
    
        if (response.ok) {
          const data = await response.json();
          alert(data.msg);
        } else {
          alert('Failed to save bio');
        }
      } catch (error) {
        console.error('Error saving bio:', error);
        alert('An error occurred while saving your bio.');
      }
    };

    // Handle poem click to show overlay
    const handlePoemClick = (poem) => {
      console.log("Poem clicked:", poem);
      setSelectedPoem(poem);
      setShowPoemPopup(true);
      setShowPoemOverlay(true);
    };
    
    const handleClosePopup = () => {
      setShowPoemPopup(false);
      setSelectedPoem(null); // Clear the selected poem when closing the popup
    };
    
    return (
      <div>
        <header>
          <title>Profile</title>
          <link rel="icon" href="logo.ico" />
        </header>
        
        <div className="user-description">
          <h1>{email}'s profile!</h1>
          
          <section className="bio-section">
            <h2>About {email}</h2>
            <textarea
              value={bio} 
              onChange={handleBioChange}
              placeholder="Tell us about yourself..."
            />
            <button id="save-bio" onClick={handleSaveBio}>Update Bio</button>
          </section>
        </div>
        
        <section className="poems-section">
        <h2>Your Poems</h2>
          <div id="poems-container" style={{ display: "flex", flexWrap: "wrap" }}>
            {poems.length > 0 ? (
              poems.map((poem, index) => (
                <div
                  key={index}
                  className="poem-square"
                  onClick={() => handlePoemClick(poem)}
                >
                  poem{index} {/* Optional: Emoji or a decorative element */}
                </div>
              ))
            ) : (
              <p>No poems yet. Write one to get started!</p>
            )}
          </div>
        </section>

        <section className="write-poem-section">
          <h2>Write a New Poem</h2>
          <div id="button-container">
            <button id="write-poem" onClick={() => navigate("/WritePoem")}>
              Go to Write Poem
            </button>
          </div>
        </section>
  
        <footer>
          <span className="text-reset">Designed by Eva Terry</span>
          <br />
          <button onClick={() => window.location.href="https://github.com/evajterry/CS260-React"}>
            GitHub
          </button>
        </footer>

        {/* Custom Popup (Modal) for displaying the poem */}
        {showPoemPopup && selectedPoem && (
        <div className="custom-popup">
          <div className="popup-content">
            <h3>Selected Poem:</h3>
            <p>{selectedPoem}</p> {/* Display the poem content */}
            <button className="close-btn" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
