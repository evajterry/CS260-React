import React from 'react';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';
import { useNavigate } from 'react-router-dom';

export function Login({ userName, authState, onAuthChange }) {
    const navigate = useNavigate();

    return (
      <div className='login-popup-overlay'>
        <div className='login-popup'>
          <button className='close-btn' onClick={() => onAuthChange(userName, AuthState.Unauthenticated)}>
            &times;
          </button>
          {authState !== AuthState.Unknown && <h1>POETRY??????</h1>}
          {authState === AuthState.Authenticated && (
            <Authenticated
              userName={userName}
              onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)}
            />
          )}
          {authState === AuthState.Unauthenticated && (
            <Unauthenticated
              userName={userName}
              onLogin={(loginUserName) => {
                onAuthChange(loginUserName, AuthState.Authenticated);
                navigate('/Search'); // Redirect to the Search page on login
              }}
            />
          )}
        </div>
      </div>
    );
  }
  
  export default Login;