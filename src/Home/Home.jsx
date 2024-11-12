import React from 'react';
import './Home.css';
import Popup from '../Popup';
import CreateAccountPopup from '../CreateAccountPopup';
import EmilyImage from '../images/Emily_Dickinson.png';
import HeaneyImage from "../images/Seamus_Heaney.png";
import FrostImage from "../images/frost_centenary_top.webp";
import WordsworthImage from "../images/william_wordsworth.png"; 
import YeatsImage from "../images/william-yeats.jpeg";
import AtwoodImage from "../images/margaret-atwood.webp";

const Home = ({ showLogin, showCreateAccount, hidePopups, showLoginPopup, showCreateAccountPopup, onLogin }) => {
  return (
    <div>
      <h1>Poetry Portfolio</h1>
        <button onClick={showLoginPopup}>Login</button>
        <button onClick={showCreateAccountPopup}>Create Account</button>
        <p className="intro-poem">
          Poets are the unacknowledged legislators of the 
          world, according to Percy Shelley,
          and as such, they should have a sufficient
          place to put their work.
        </p>
        <div className="long-quote">
            Read, write, revise, publish, share, discover. This is the place to unlock your inner poet. 
        </div>

        {/* Photo Gallery Component */}
        <div className="photo-gallery">
          <PhotoGallery />
        </div>

        {/* Render popups if their respective state is true */}
        {showLogin && (
          <>
            <div className="popup-overlay" onClick={hidePopups}></div>
            <Popup hidePopups={hidePopups} onLogin={onLogin} />
          </>
        )}
        
        {showCreateAccount && (
          <>
            <div className="popup-overlay" onClick={hidePopups}></div>
            <CreateAccountPopup hidePopups={hidePopups} />
          </>
          )}
      </div>
    );
  };

  const PhotoGallery = () => (
      <>
        <div className="photo">
          <img src={EmilyImage} alt="Emily Dickinson" />
          <div className="overlay">
            <p className="quote">
              "If I feel physically as if the top of my head were taken off, I know that is poetry."
              <br />
              <br />
              -Emily Dickinson
            </p>
          </div>
        </div>
        <div className="photo">
          <img src={HeaneyImage} alt="Seamus Heaney" />
          <div className="overlay">
            <p className="quote">
              “The gift of writing is to be self-forgetful, to get a surge of inner life or inner supply or unexpected sense of empowerment, to be afloat, to be out of yourself.”
              <br />
              <br />
              -Seamus Heaney
            </p>
          </div>
        </div>
        <div className="photo">
          <img src={FrostImage} alt="Robert Frost" />
          <div className="overlay">
            <p className="quote">
              “I have never started a poem yet whose end I knew. Writing a poem is discovering.”
              <br />
              <br />
              -Robert Frost
            </p>
          </div>
        </div>
        <div className="photo">
          <img src={WordsworthImage} alt="William Wordsworth" />
          <div className="overlay">
            <p className="quote">
              Poetry is “the first and last of all knowledge—it is as immortal as the heart of man.”
              <br />
              <br />
              -William Wordsworth
            </p>
          </div>
        </div>
        <div className="photo">
          <img src={YeatsImage} alt="William Butler Yeats" />
          <div className="overlay">
            <p className="quote">
              “We make out of the quarrel with others, rhetoric, but of the quarrel with ourselves, poetry.”
              <br />
              <br />
              -William Butler Yeats
            </p>
          </div>
        </div>
        <div className="photo">
          <img src={AtwoodImage} alt="Margaret Atwood" />
          <div className="overlay">
            <p className="quote">
              "I don’t think I solve problems in my poetry; I think I uncover the problems.”
              <br />
              <br />
              -Margaret Atwood
            </p>
          </div>
        </div>
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
      </>
    );

  export default Home;