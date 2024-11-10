import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../Popup'; // Assuming Popup is used inside Login component
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const handleLogin = (loginUserName) => {
    onAuthChange(loginUserName, AuthState.Authenticated); // Update authState to authenticated
    navigate('/Search'); // Navigate to /Search after login
  };

  return (
    <div className="login-popup-overlay">
      <div className="login-popup">
        <button className="close-btn" onClick={() => onAuthChange(userName, AuthState.Unauthenticated)}>
          &times;
        </button>
        {authState !== AuthState.Unknown && <h1>POETRY</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated
            userName={userName}
            onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)}
          />
        )}
        {authState === AuthState.Unauthenticated && (
          <button onClick={() => setShowPopup(true)}>Login</button> // Show login popup
        )}
      </div>

      {showPopup && (
        <Popup hidePopups={() => setShowPopup(false)} onLogin={handleLogin} /> // Pass handleLogin to Popup
      )}
    </div>
  );
}

export default Login;


// import React from 'react';
// import { Unauthenticated } from './unauthenticated';
// import { Authenticated } from './authenticated';
// import { AuthState } from './authState';
// import { useNavigate } from 'react-router-dom';

// export function Login({ userName, authState, onAuthChange }) {
//     const navigate = useNavigate();

//     return (
//       <div className='login-popup-overlay'>
//         <div className='login-popup'>
//           <button className='close-btn' onClick={() => onAuthChange(userName, AuthState.Unauthenticated)}>
//             &times;
//           </button>
//           {authState !== AuthState.Unknown && <h1>POETRY</h1>}
//           {authState === AuthState.Authenticated && (
//             <Authenticated
//               userName={userName}
//               onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)}
//             />
//           )}
//           {authState === AuthState.Unauthenticated && (
//             <Unauthenticated
//               userName={userName}
//               onLogin={(loginUserName) => {
//                 onAuthChange(loginUserName, AuthState.Authenticated);
//                 navigate('/Search'); // Redirect to the Search page on login
//               }}
//             />
//           )}
//         </div>
//       </div>
//     );
//   }
  
//   export default Login;