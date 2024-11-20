import React, { useState } from "react";
import Popup from './Popup';
import { AuthState } from "./Login/authState.js";
import CreateAccountPopup from './CreateAccountPopup'; 
import Home from './Home/Home';
// import { Header } from './Header';  // I don't know if I should have curly brackets around Header
import About from './About/About.jsx';
import Profile from './Profile/Profile';
import Search from './Search/Search';
import WritePoem from "./WritePoem/WritePoem.jsx";
// import { Login } from './Login/login';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, NavLink, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

const App = () => {
  const [userName, setUserName] = useState('');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = useState(currentAuthState);
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const hidePopups = () => {
    setShowLogin(false);
    setShowCreateAccount(false);
  };

  const showLoginPopup = (event) => {
    event.preventDefault();
    setShowLogin(true);
  };

  const showCreateAccountPopup = (event) => {
    event.preventDefault();
    setShowCreateAccount(true);
  };

  const handleAuthChange = (userName, authState) => {
    setUserName(userName);
    setAuthState(authState);
    setShowLogin(false);
  };

  const onLogin = (email) => {
    setUserEmail(email);
    setAuthState(AuthState.Authenticated);
    hidePopups();
  };

  const onAccountCreated = (userName) => {
    setUserName(userName);
    setAuthState(AuthState.Authenticated);
    hidePopups();
  };


  return (
    <BrowserRouter>
      <div className='body bg-dark text-light'>
        <header className='container-fluid'>
          <nav className='navbar fixed-top navbar-dark'>
            <div className='navbar-brand'>
              Poetry Portfolios<sup>&reg;</sup>
            </div>
            <menu className='navbar-nav'>
              {authState === AuthState.Authenticated ? ( 
                <>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='/Search'>
                    Search
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='/Profile'>
                    Profile
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink
                      className='nav-link'
                      to='/'
                      onClick={() => {
                        setAuthState(AuthState.Unauthenticated);
                        setUserName('');
                      }}
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className='nav-item'>
                  <a href="#" className='nav-link' onClick={showLoginPopup}>
                    Login
                  </a>
                </li>
              )}
              <li className='nav-item'>
                <NavLink className='nav-link' to='/About'>
                  About
                </NavLink>
              </li>
            </menu>
          </nav>
        </header>
        {showLogin && <Popup onLogin={onLogin} hidePopups={hidePopups} />}
        {showCreateAccount && <CreateAccountPopup hidePopups={hidePopups} accountCreation={onAccountCreated} />}
        <Routes>
          <Route path="/" element={<Home showLogin={showLogin} showCreateAccount={showCreateAccount} hidePopups={hidePopups} showLoginPopup={showLoginPopup} showCreateAccountPopup={showCreateAccountPopup} onLogin={onLogin} onAccountCreated={onAccountCreated} />} /> {/* Pass props to Home */}
          <Route path='/Search' element={<Search />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/About' element={<About />} />
          <Route path='/WritePoem' element={<WritePoem />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
