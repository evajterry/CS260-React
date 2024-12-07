import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { Modal, Button, Form } from "react-bootstrap";


function Profile() {
    const [username, setUsername] = useState("[Username]");
    const [bio, setBio] = useState("");
    const [folders, setFolders] = useState([
      { name: "Nature", poems: ["Poem 1", "Poem 2"] },
      { name: "Family", poems: ["Poem A", "Poem B"] },
      { name: "Sonnets", poems: ["Sonnet 1", "Sonnet 2"] },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [showAddFolderModal, setShowAddFolderModal] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const [showPoemPopup, setShowPoemPopup] = useState(false);
    const [selectedPoem, setSelectedPoem] = useState("");

    const navigate = useNavigate();

    const email = localStorage.getItem("userEmail");
    if (!email) {
      console.error("No email found. User might not be logged in.");
    }
  
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

    const handleViewFolder = (folder) => {
      console.log('Viewing folder:', folder);
      setSelectedFolder(folder);
      setShowModal(true);
    };

    const handlePoemClick = (poem) => {
      setSelectedPoem(poem);
      setShowPoemPopup(true);  // Ensure the popup is shown when a poem is clicked
    };

    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedFolder(null);
    };

    const handleOpenAddFolderModal = () => setShowAddFolderModal(true);
    const handleCloseAddFolderModal = () => setShowAddFolderModal(false);

    const handleCreateFolder = async (e) => {
      // If e.target is a DOM element (like an HTMLButtonElement), avoid including it in state
      const userEmail = localStorage.getItem('userEmail'); // Adjust if stored differently
      if (!userEmail) {
        alert('User email not found.');
        return;
      }
    
      console.log(e.target); // This could cause the circular reference issue
    
      const folderData = {
        email: userEmail,
        folderName: newFolderName
      };
      const response = await fetch('/api/auth/add-folder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(folderData)
      });
      const result = await response.json();
      console.log(result);
    };

    useEffect(() => {
      const fetchFolders = async () => {
        try {
          const response = await fetch(`/api/users/${email}/folders`);
          if (response.ok) {
            const data = await response.json();
            setFolders(data.folder);
          } else {
            console.error("Failed to fetch folder");
          }
        } catch (error) {
          console.error("Error fetching folder:", error);
        }
      };
  
      fetchFolders();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // Call this function when the profile page loads
    React.useEffect(() => {
      fetchUserFolders();
    }, []);

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
  
    return (
      <div>
        <header>
          <title>Profile</title>
          <link rel="icon" href="logo.ico" />
        </header>
        
        <div className="user-description">
          <header>
            <h1>User Profile</h1>
            <p>Welcome!</p>
          </header>
          
          <section className="bio-section">
            <h2>About Me</h2>
            <textarea
              value={bio}
              onChange={handleBioChange}
              placeholder="Tell us about yourself..."
            />
            <button id="save-bio" onClick={handleSaveBio}>Save Bio</button>
          </section>
        </div>
        
        <section className="folders-section">
          <div id="folders-container">
            {folders.map((folder, index) => (
              <div className="folder" key={index}>
                <h3>{folder.name}</h3> {/* Display the folder name */}
                <button
                  className="view-folder"
                  onClick={() => handleViewFolder(folder)} // Assuming handleViewFolder is a function to view a folder
                >
                  View Folder
                </button>
              </div>
            ))}
          </div>

          <div id="button-container">
            <button id="new-folder" onClick={handleOpenAddFolderModal}>Create new folder</button>
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

        {/* Modal for Folder */}
        {showModal && selectedFolder && (
          <Modal show={showModal} onHide={handleCloseModal} className="modal-right">
            <Modal.Header>
              <Modal.Title>{selectedFolder.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Poems in {selectedFolder.name}:</h4>
              <ul>
                {selectedFolder.poems.map((poem, index) => (
                  <li key={index} onClick={() => handlePoemClick(poem)}>{poem}</li>
                ))}
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        )}

        {/* Modal for displaying selected poem */}
        {showPoemPopup && selectedPoem && (
          <Modal show={showPoemPopup} onHide={() => setShowPoemPopup(false)} className="modal-right">
            <Modal.Header>
              <Modal.Title>Poem Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{selectedPoem}</h4>
              <p>This is where the poem content will be displayed.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowPoemPopup(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        {/* Modal for Add Folder */}
        {showAddFolderModal && (
          <Modal show={showAddFolderModal} onHide={handleCloseAddFolderModal} className="modal-right">
            <Modal.Header>
              <Modal.Title>Create a New Folder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formFolderName">
                  <Form.Label>Folder Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter folder name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddFolderModal}>
                Close
              </Button>
              <Button 
                variant="primary" 
                onClick={handleCreateFolder} 
                disabled={!newFolderName.trim()}
              >
                Create Folder
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    );
}

export default Profile;
