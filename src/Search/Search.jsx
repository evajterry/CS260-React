import React from "react";
import { Link } from "react-router-dom";
import "./Search.css";

function Search() {
  const handleSearch = () => {
    // Add functionality to handle search
    alert("Search functionality coming soon!");
  };

  const handleTagClick = (tag) => {
    // Add functionality for each tag button
    alert(`Showing poems with tag: ${tag}`);
  };

  return (
    <div>
      <header>
        <title>Search Page</title>
        <link rel="icon" href="logo.ico" />
        <nav>
          <ul>
            <li>
              <Link to="/index.html">Log out</Link>
            </li>
            {/* <li><Link to="/createAccount.html">Create Account</Link></li> */}
            <li>
              <Link to="/profile.html">Profile</Link>
            </li>
            <li>
              <Link to="/about.html">About</Link>
            </li>
          </ul>
        </nav>
        <h1>Poetry Exploration</h1>
      </header>

      <main>
        <div className="search-container">
          <input
            type="text"
            className="search-box"
            placeholder="Search for tags, poems, or poets..."
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="button-container">
          <button className="square-button" onClick={() => handleTagClick("tag 1")}>
            Poems with tag 1
          </button>
          <button className="square-button" onClick={() => handleTagClick("tag 2")}>
            Poems with tag 2
          </button>
          <button className="square-button" onClick={() => handleTagClick("tag 3")}>
            Poems with tag 3
          </button>
          <button className="square-button" onClick={() => handleTagClick("tag 4")}>
            Poems with tag 4
          </button>
        </div>
      </main>

      <footer>
        <span className="text-reset">Designed by Eva Terry</span>
        <br />
        <button
          onClick={() =>
            (window.location.href = "https://github.com/evajterry/CS260-React")
          }
        >
          GitHub
        </button>
      </footer>
    </div>
  );
}

export default Search;
