import React, { useState } from "react";
import Popup from './Popup';
import { AuthState } from "./authState.js";
import CreateAccountPopup from './CreateAccountPopup'; 
import './App.css';
// import { Header } from './Header';  // I don't know if I should have curly brackets around Header
import About from './About/About.jsx';
import Profile from './Profile/Profile';
import Search from './Search/Search';
// import Search from './pages/Search'; 
import { BrowserRouter as Router, Route, Routes, BrowserRouter, NavLink } from 'react-router-dom';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  // need to define AuthState
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

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

  return (
    <BrowserRouter>
      {/* <Header showLoginPopup={showLoginPopup} showCreateAccountPopup={showCreateAccountPopup} /> */}
      {/* Need to add the header */}
      <header className='container-fluid'>
          <nav className='navbar fixed-top navbar-dark'>
            <div className='navbar-brand'>
              Poetry Portfolios<sup>&reg;</sup>
            </div>
            <menu className='navbar-nav'>
              {/* <li className='nav-item'>
                <NavLink className='nav-link' to=''>
                  Login
                </NavLink>
              </li> */}
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='Search'>
                    Search
                  </NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='Profile'>
                    Profile
                  </NavLink>
                </li>
              )}
              <li className='nav-item'>
                <NavLink className='nav-link' to='About'>
                  About
                </NavLink>
              </li>
            </menu>
          </nav>
        </header>
      {/* Define routes here */}
      <Routes>
          <Route // change this to being a popup instead of a new page
            path='/'
            // element={
            //   <Login
            //     userName={userName}
            //     authState={authState}
            //     onAuthChange={(userName, authState) => {
            //       setAuthState(authState);
            //       setUserName(userName);
            //     }}
            //   />
            // }
            exact
          />
          <Route path='/Search' element={<Search />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/About' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

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
      </div>
    </BrowserRouter>
  );
}

const PhotoGallery = () => (
  <>
    <div className="photo">
      <img src="images/Emily Dickinson.png" alt="Emily Dickinson" />
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
      <img src="images/Seamus Heaney.png" alt="Seamus Heaney" />
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
      <img src="images/frost_centenary_top.webp" alt="Robert Frost" />
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
      <img src="images/william-wordsworth.png" alt="William Wordsworth" />
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
      <img src="images/william-yeats.jpeg" alt="William Butler Yeats" />
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
      <img src="images/margaret-atwood.webp" alt="Margaret Atwood" />
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
