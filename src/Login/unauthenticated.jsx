import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export async function loginOrCreate(endpoint, userData, setError) {

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (response?.status === 200) {
      localStorage.setItem('userName', userData.email);
      return { success: true }
    } else {
      const body = await response.json();
      setError(`⚠ Error: ${body.msg}`);
      return { success: false }
    } 
  } catch (error) {
    setError(`⚠ Error: could not reach the server.`);
    return { success: false }
  }
}

export function Unauthenticated(props) { // not sure if props should be here
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null); 
  const [isCreatingAccount, setIsCreatingAccount] = React.useState(false);

  return {
    userName,
    setUserName,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    displayError,
    setDisplayError,
    isCreatingAccount,
    setIsCreatingAccount,
  };
}

//   return (
//     <>
//       <div>
//         <div className='input-group mb-3'>
//           <span className='input-group-text'>@</span>
//           <input className='form-control' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='your@email.com' />
//         </div>
//         <div className='input-group mb-3'>
//           <span className='input-group-text'>🔒</span>
//           <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} placeholder='password' />
//         </div>
//         <Button variant='primary' onClick={() => loginOrCreate()} disabled={!userName || !password}>
//           Login
//         </Button>
//         <Button variant='secondary' onClick={() => loginOrCreate()} disabled={!userName || !password}>
//           Create
//         </Button>
//       </div>

//       <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
//     </>
//   );
// }
