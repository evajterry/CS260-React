import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div>
      <header>
        <title>About</title>
        <link rel="icon" href="logo.ico" />
      </header>

      <h1>
        Poetry Portfolio<sup>®</sup>
      </h1>

      <main>
        <div id="picture" className="picture-box">
          <img width="400px" src="images/yosemite.png" alt="Yosemite" />
        </div>
        <div id="picture1" className="picture-box1">
          <img width="400px" src="images/zion.png" alt="Zion" />
        </div>
        <p>
          Poetry is as immortal as the heart of man (@Wordsworth), and honestly,
          people don't read it like they used to. For me, poetry helps me feel in
          my heart that places like the ones in these pictures exist even when I'm
          not there. <br />
          <br />
          To try and help poetry be more accessible, I built this website. Here you
          can share and keep track of everything you write. Whether it's all breakup
          poetry or all haikus, it's welcome here. So please enjoy.
        </p>
      </main>

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

export default About;