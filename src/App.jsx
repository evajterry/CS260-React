import React, { useState } from "react";
import Popup from './Popup';
import { AuthState } from "./Login/authState.js";
import CreateAccountPopup from './CreateAccountPopup'; 

// import { Header } from './Header';  // I don't know if I should have curly brackets around Header
import About from './About/About.jsx';
import Profile from './Profile/Profile';
import Search from './Search/Search';
import { Login } from './Login/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import EmilyImage from './images/Emily_Dickinson.png';
import HeaneyImage from "./images/Seamus_Heaney.png";
import FrostImage from "./images/frost_centenary_top.webp";
import WordsworthImage from "./images/william_wordsworth.png"; 
import YeatsImage from "./images/william-yeats.jpeg";
import AtwoodImage from "./images/margaret-atwood.webp";

// import Search from './pages/Search'; 
import { BrowserRouter as Router, Route, Routes, BrowserRouter, NavLink, Navigate, useNavigate } from 'react-router-dom';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  // need to define AuthState
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  // const navigate = useNavigate(); // Add useNavigate

  // const toggleLoginPopup = () => setShowLogin(!showLogin);

  const hidePopups = () => {
    setShowLogin(false);
    setShowCreateAccount(false);
  };

  const showLoginPopup = (event) => {
    event.preventDefault(); // Prevent default action
    setShowLogin(true);
  };

  const showCreateAccountPopup = (event) => {
    event.preventDefault(); // Prevent default action
    setShowCreateAccount(true);
  };

  const handleAuthChange = (userName, authState) => {
    setUserName(userName);
    setAuthState(authState);
    setShowLogin(false);
    // navigate('/Search'); // Redirect to the Search page
  };

  return (
    <BrowserRouter>
      {showLogin && (
        <Login
          userName={userName}
          authState={authState}
          onAuthChange={(userName, authState) => {
            setAuthState(authState);
            setUserName(userName);
            setShowLogin(false); // Close popup on successful login/logout
          }}
        />
      )}
      <div>
        <h1>Poetry Portfolio</h1>
        <div className="button-container">
          <button onClick={showLoginPopup}>Login</button>
          <button onClick={showCreateAccountPopup}>Create Account</button>
        </div>
        <div className="card">
          {/* Any additional content for the card can go here */}
        </div>
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
            <Popup hidePopups={hidePopups} />
          </>
        )}
        
        {showCreateAccount && (
          <>
            <div className="popup-overlay" onClick={hidePopups}></div>
            <CreateAccountPopup hidePopups={hidePopups} />
          </>
        )}
        <div>
          <Routes>
          <Route // change this to being a popup instead of a new page
            path='/'
            element={authState === AuthState.Authenticated ? <Navigate to="/Profile" /> : <Login userName={userName} authState={authState} onAuthChange={handleAuthChange} />}
          />
            <Route path='/Search' element={<Search />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/About' element={<About />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

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
  </>
);

export default App;

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export function LoginComponent({ userName, authState, onAuthChange }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate authentication logic
    const updatedUserName = "John Doe";  // Replace with actual user input
    onAuthChange(updatedUserName, AuthState.Authenticated);
    navigate('./Search');  // Redirect to the Search page after login
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
}