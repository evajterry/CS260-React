import React from "react";
import { Link } from "react-router-dom";
import "./About.css";
import yosemite from "../images/yosemite.png";
import zion from "../images/zion.png";

function About() {
  return (
    <div className="about-container">
      <div className="image-header-container">
        <div className="picture-box">
          <img src={zion} alt="Zion" />
        </div>
        <header className="header">
          <title>About</title>
          <link rel="icon" href="logo.ico" />
          <h1>Poetry Portfolio<sup>®</sup></h1>
        </header>
        <div className="picture-box1">
          <img src={yosemite} alt="Yosemite" />
        </div>
      </div>

      <main>
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
