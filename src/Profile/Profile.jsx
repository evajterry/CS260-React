import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";


function Profile() {
    const [username, setUsername] = useState("[Username]");
    const [bio, setBio] = useState("");
  
    const handleBioChange = (e) => setBio(e.target.value);
    const handleSaveBio = () => alert("Bio saved!");
  
    return (
      <div>
        <header>
          <title>Profile</title>
          <link rel="icon" href="logo.ico" />
        </header>
        <nav>
          <ul>
            <li>
              <Link to="/index.html">Log out</Link>
            </li>
            <li>
              <Link to="/search.html">Search</Link>
            </li>
            <li>
              <Link to="/about.html">About</Link>
            </li>
          </ul>
        </nav>
        
        <div className="user-description">
          <header>
            <h1>User Profile</h1>
            <p>Welcome, <span id="user-name">{username}</span></p>
          </header>
          
          <section className="bio-section">
            <h2>About Me</h2>
            <textarea
              id="bio"
              placeholder="Write a short bio about yourself..."
              rows="4"
              value={bio}
              onChange={handleBioChange}
            ></textarea>
            <button id="save-bio" onClick={handleSaveBio}>Save Bio</button>
          </section>
        </div>
        
        <section className="folders-section">
          <div id="folders-container">
            <div className="folder">
              <h3>Nature</h3>
              <button className="view-folder" onClick={() => window.location.href = "folder1.html"}>
                View Folder
              </button>
            </div>
            <div className="folder">
              <h3>Family</h3>
              <button className="view-folder" onClick={() => window.location.href = "folder2.html"}>
                View Folder
              </button>
            </div>
            <div className="folder">
              <h3>Sonnets</h3>
              <button className="view-folder" onClick={() => window.location.href = "folder3.html"}>
                View Folder
              </button>
            </div>
            {/* Add more folders as needed */}
          </div>
          <div id="button-container">
            <button id="new-folder">Create New Folder</button>
          </div>
        </section>
        
        <section className="write-poem-section">
          <h2>Write a New Poem</h2>
          <div id="button-container">
            <button id="write-poem" onClick={() => window.location.href = "postPoem.html"}>
              Go to Write Poem
            </button>
          </div>
        </section>
  
        <footer>
          <span className="text-reset">Designed by Eva Terry</span>
          <br />
          <button onClick={() => window.location.href="https://github.com/evajterry/CS260"}>
            GitHub
          </button>
        </footer>
      </div>
    );
  }
  
  export default Profile;