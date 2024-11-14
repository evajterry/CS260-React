import "./WritePoem.css";
import React, { useState } from "react";
import axios from "axios";

function WritePoem() {
    const [poem, setPoem] = useState("");
    const [title, setTitle] = useState("");
    const [rhymeWord, setRhymeWord] = useState("");
    const [rhymes, setRhymes] = useState([]);

    const handlePoemChange = (e) => setPoem(e.target.value);
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleRhymeWordChange = (e) => setRhymeWord(e.target.value);

    const handleSubmit = (e) => {e.preventDefault();
        // Handle form submission logic here (e.g., save poem, send to server, etc.)
        console.log("Poem submitted:", title, poem);
    }

    const fetchRhymes = async () => {
        try {
            const response = await axios.get(
                `https://wordsapiv1.p.mashape.com/words/{rhymeWord}/rhymes`
            );
            setRhymes(response.data.map((item) => item.word));
        } catch (error) {
            console.error("Error fetching rhymes:", error);
        }
    }

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
            <ul>
                {rhymes.length > 0 ? rhymes.map((word, index) => (
                    <li key={index}>{word}</li>
                )) : <p>No rhymes found.</p>}
            </ul>
        </div>
    </div>
    )
}
export default WritePoem;