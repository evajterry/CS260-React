import "./WritePoem.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function WritePoem() {
    const [imageUrl, setImageUrl] = React.useState('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=');
    const [quote, setQuote] = React.useState('Loading...');
    const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

    const [poem, setPoem] = useState("");
    const [title, setTitle] = useState("");
    const [rhymeWord, setRhymeWord] = useState("");
    const [rhymes, setRhymes] = useState([]);
    const [error, setError] = useState("");
    const [folders, setFolders] = useState([]); // To store folder list
    const [selectedFolder, setSelectedFolder] = useState(""); // Selected folder

    const handlePoemChange = (e) => setPoem(e.target.value);
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleRhymeWordChange = (e) => setRhymeWord(e.target.value);
    const handleFolderChange = (e) => setSelectedFolder(e.target.value);

    React.useEffect(() => {
        const random = Math.floor(Math.random() * 1000);
        fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
          .then((response) => response.json())
          .then((data) => {
            const containerEl = document.querySelector('#picture');
    
            const width = containerEl.offsetWidth;
            const height = containerEl.offsetHeight;
            const apiUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}?grayscale`;
            setImageUrl(apiUrl);
          })
          .catch();
    
        fetch('https://quote.cs260.click')
          .then((response) => response.json())
          .then((data) => {
            setQuote(data.quote);
            setQuoteAuthor(data.author);
          })
          .catch();
      }, []);

    useEffect(() => {
        // Fetch folder list when component loads
        const fetchFolders = async () => {
            try {
                const response = await axios.get("/api/folders");
                if (response.data && response.data.folders) {
                    setFolders(response.data.folders);
                }
            } catch (error) {
                console.error("Error fetching folders:", error);
                setError("Error fetching folders. Please try again.");
            }
        };

        fetchFolders();
    }, []);

    // const API_URL = '/api/api.html';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !poem || !selectedFolder) {
            setError("Please fill in all fields and select a folder.");
            return;
        }

        try {
            const response = await axios.post("/api/poems", {
                title,
                poem,
                folder: selectedFolder,
            });

            if (response.status === 200) {
                console.log("Poem saved successfully");
                setPoem("");
                setTitle("");
                setSelectedFolder("");
                setError("");
            } else {
                setError("Failed to save the poem. Please try again.");
            }
        } catch (error) {
            console.error("Error saving poem:", error);
            setError("Error saving poem. Please try again.");
        }
    };

    const fetchRhymes = async () => {
        if (!rhymeWord) {
            setError("Please enter a word to rhyme.");
            return;
        }
    
        setError(""); // Clear any previous error
    
        try {
            // Call your backend API
            const response = await axios.get(`/api/rhymes`, {
                params: { word: rhymeWord },
            });
    
            // Update state with rhymes
            if (response.data && response.data.rhymes) {
                setRhymes(response.data.rhymes);
            } else {
                setError("No rhymes found.");
            }
        } catch (error) {
            console.error("Error fetching rhymes:", error);
            setError("Error fetching rhymes. Please try again.");
        }
    };

    return (
        <div>
            <h1>Write a New Poem</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Title"
                    rows="1"
                    value = {title}
                    onChange={handleTitleChange}
                ></textarea>

                <textarea
                    placeholder="Write your poem here..."
                    rows="8"
                    value = {poem}
                    onChange={handlePoemChange}
                ></textarea>

                <select value={selectedFolder} onChange={handleFolderChange}>
                    <option value="">Select a folder</option>
                    {folders.map((folder, index) => (
                        <option key={index} value={folder}>
                            {folder}
                        </option>
                    ))}

                </select>
                <button type="submit"> Submit Poem</button>
            </form>
            <div id='picture' className='picture-box'>
                <img src={imageUrl} alt='stock background' />
            </div>
            <div className="rhyming-tool">
                <h2>Find Rhymes</h2>
                <input
                    type="text"
                    placeholder="Enter a word to rhyme"
                    value={rhymeWord}
                    onChange={handleRhymeWordChange}
                />
                <button onClick={fetchRhymes}>Get Rhymes</button>

                {/* Display error if there is one */}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {/* Display rhymes */}
                <ul>
                    {rhymes.length > 0 ? (
                        rhymes.map((word, index) => <li key={index}>{word}</li>)
                    ) : (
                        <p>No rhymes found.</p>
                    )}
                </ul>
            </div>

        </div>
    );
}
export default WritePoem;