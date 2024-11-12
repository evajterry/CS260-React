import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../Popup';
import { AuthState } from './authState';
import { Authenticated } from './Authenticated';

export function Login({ userName, authState, onAuthChange }) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (loginUserName) => {
    onAuthChange(loginUserName, AuthState.Authenticated);
    navigate('/Search'); // Navigate to /Search after login
  };

  return (
    <div>
      {authState === AuthState.Authenticated && (
        <Authenticated
          userName={userName}
          onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)}
        />
      )}
      {authState === AuthState.Unauthenticated && (
        <button onClick={() => setShowPopup(true)}>Login</button> // Show login popup
      )}

      {showPopup && (
        <Popup hidePopups={() => setShowPopup(false)} onLogin={handleLogin} /> // Pass handleLogin to Popup
      )}
    </div>
  );
}

export default Login;





// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Popup from '../Popup'; // Assuming Popup is used inside Login component
// import { AuthState } from './authState';
// import { Authenticated } from './Authenticated';

// export function Login({ userName, authState, onAuthChange }) {
//   const [email, setEmail] = useState('');
//   const navigate = useNavigate();

//   const [showPopup, setShowPopup] = useState(false);

//   const handleLogin = (loginUserName) => {
//     onAuthChange(loginUserName, AuthState.Authenticated); // Update authState to authenticated
//     navigate('/Search'); // Navigate to /Search after login
//   };

//   return (
//     <div className="login-popup-overlay">
//       <div className="login-popup">
//         <button className="close-btn" onClick={() => onAuthChange(userName, AuthState.Unauthenticated)}>
//           &times;
//         </button>
//         {authState !== AuthState.Unknown && <h1>POETRY</h1>}
//         {authState === AuthState.Authenticated && (
//           <Authenticated
//             userName={userName}
//             onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)}
//           />
//         )}
//         {authState === AuthState.Unauthenticated && (
//           <button onClick={() => setShowPopup(true)}>Login</button> // Show login popup
//         )}
//       </div>

//       {showPopup && (
//         <Popup hidePopups={() => setShowPopup(false)} onLogin={handleLogin} /> // Pass handleLogin to Popup
//       )}
//     </div>
//   );
// }

// export default Login;
