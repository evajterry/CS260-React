import "./WritePoem.css";
import React, { useState } from "react";
import axios from "axios";

function WritePoem() {
    const [poem, setPoem] = useState("");
    const [title, setTitle] = useState("");
    const [rhymeWord, setRhymeWord] = useState("");
    const [rhymes, setRhymes] = useState([]);
    const [error, setError] = useState("");

    const handlePoemChange = (e) => setPoem(e.target.value);
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleRhymeWordChange = (e) => setRhymeWord(e.target.value);

    const API_URL = '/api/api.html';

    const handleSubmit = (e) => {e.preventDefault();
        // Handle form submission logic here (e.g., save poem, send to server, etc.)
        console.log("Poem submitted:", title, poem);
    }
    // Function to fetch rhymes from RhymeBrain
    const fetchRhymes = async () => {
        if (!rhymeWord) {
            setError("Please enter a word to rhyme.");
            return;
        }

        setError("");  // Clear any previous error

        try {
            // Fetch rhymes from RhymeBrain API
            window.RhymeBrainMaxResults = 50;

            window.RhymeBrainSubmit = () => {
                const rhymesList = window.RhymeBrainResults;
                if (rhymesList && rhymesList.length > 0) {
                    setRhymes(rhymesList);
                    setError("");  // Clear error if rhymes are found
                } else {
                    setError("No rhymes found.");
                }
            };

            // Trigger the rhyme search using the external script
            window.RhymeBrainInput = rhymeWord;
            window.RhymeBrainSubmit();
        } catch (error) {
            console.error("Error fetching rhymes:", error);
            setError("Error fetching rhymes.");
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
                <button type="submit"> Submit Poem</button>
            </form>
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

            {/* Include the external RhymeBrain script */}
            <script
                type="text/javascript"
                src="https://rhymebrain.com/external.js"
                async
            ></script>
        </div>
    );
}
export default WritePoem;