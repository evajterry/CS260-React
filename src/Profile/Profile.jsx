import React, { useState } from "react";
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

    const navigate = useNavigate();
  
    const handleBioChange = (e) => setBio(e.target.value);
    const handleSaveBio = () => alert("Bio saved!");

    const handleViewFolder = (folder) => {
      setSelectedFolder(folder);
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedFolder(null);
    };

    const handleOpenAddFolderModal = () => setShowAddFolderModal(true);
    const handleCloseAddFolderModal = () => setShowAddFolderModal(false);

    const handleCreateFolder = () => {
      if (newFolderName) {
        setFolders([...folders, { name: newFolderName, poems: [] }]);
        setNewFolderName("");
        handleCloseAddFolderModal();
      } else {
        alert("Please enter a folder name.");
      }
    }
  
    return (
    
      <div>
        <header>
          <title>Profile</title>
          <link rel="icon" href="logo.ico" />
        </header>
        
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
            {folders.map((folder, index) => (
              <div className="folder" key={index}>
                <h3>{folder.name}</h3>
                <button
                className="view-folder"
                onClick={() => handleViewFolder(folder)}
                >
                  View Folder
                </button>
              </div>
            ))}
          </div>
          <div id="button-container">
            <button id="new-folder" onClick={handleOpenAddFolderModal}> Create new folder </button>
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

        {showModal && selectedFolder && (
          <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header>
            <Modal.Title>{selectedFolder.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Poems in {selectedFolder.name}:</h4>
            <ul>
              {selectedFolder.poems.map((poem, index) => (
                <li key={index}>{poem}</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          </Modal.Footer>
          </Modal>
        )}
        {showAddFolderModal && (
          <Modal show={showAddFolderModal} onHide={handleCloseAddFolderModal}>
            <Modal.Header closeButton>
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
              <Button variant="primary" onClick={handleCreateFolder}>
                Create Folder
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    );
  }
  
  export default Profile;