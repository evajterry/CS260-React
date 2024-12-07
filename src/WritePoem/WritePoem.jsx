import "./WritePoem.css";
import React, { useState, useEffect } from "react";

function WritePoem() {
    const [imageUrl, setImageUrl] = React.useState('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=');
    const [poem, setPoem] = useState("");
    const [error, setError] = useState("");
    const handlePoemChange = (e) => setPoem(e.target.value);

    const email = localStorage.getItem("userEmail");
    if (!email) {
      console.error("No email found. User might not be logged in.");
    }

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
      }, []);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     if (!poem) {
    //       setError("Please write a poem before submitting.");
    //       return;
    //     }
    
    //     try {
    //       const response = await axios.post(`/api/users/${email}/poems`, { poem });
    
    //       if (response.status === 200) {
    //         console.log("Poem saved successfully");
    //         setPoem(""); // Clear the input
    //         setError(""); // Clear any error
    //       } else {
    //         setError("Failed to save the poem. Please try again.");
    //       }
    //     } catch (error) {
    //       console.error("Error saving poem:", error);
    //       setError("Error saving poem. Please try again.");
    //     }
    //   };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!poem) {
          setError("Please write a poem before submitting.");
          return;
        }
    
        await handleSavePoem(); // Save the poem
        setPoem(""); // Clear the input field
        setError(""); // Clear any error
      };

    const handleSavePoem = async () => {
        
        try {
            console.log("Saving poem:", poem);
            console.log("Email:", email);
            
            const response = await fetch(`/api/users/${email}/poems`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ poem: poem }),
            });
            console.log(response);
    
            if (response.ok) {
                const data = await response.json();
                alert(data.msg || "Poem saved successfully!");
            } else {
                const errorData = await response.text();
                console.error("Server error response:", errorData);
                alert("Failed to save the poem.");
            }
        } catch (error) {
            console.error("Error saving poem:", error);
            alert("An error occurred while saving the poem.");
        }
    };
    
    return (
        <div>
            <h1>Write a New Poem</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                placeholder="Write your poem here..."
                rows="8"
                value={poem}
                onChange={handlePoemChange}
                ></textarea>

                <button type="submit">Save Poem</button>
            </form>
            <div id='picture' className='picture-box'>
                <img src={imageUrl} alt='stock background' />
            </div>
        </div>
    );
}
export default WritePoem;