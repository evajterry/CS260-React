import React, { useState, useEffect } from 'react';
import "./Search.css";

const ChatPage = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [name, setName] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    // Adjust the WebSocket protocol based on the page's protocol
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const ws = new WebSocket(`${protocol}://${window.location.host}/ws`);
    console.log('WebSocket URL:', `${protocol}://${window.location.host}/ws`);
    setSocket(ws);

    // Display that we have opened the WebSocket
    ws.onopen = (event) => {
      appendMsg('system', 'websocket', 'connected');
    };

    // Display messages received from the WebSocket
    ws.onmessage = async (event) => {
      const text = await event.data.text();
      const chat = JSON.parse(text);
      appendMsg('friend', chat.name, chat.msg);
    };

    // If the WebSocket is closed, disable the interface
    ws.onclose = (event) => {
      appendMsg('system', 'websocket', 'disconnected');
      setIsDisabled(true);
    };

    // Cleanup WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  const appendMsg = (cls, from, msg) => {
    setMessages((prevMessages) => [
      { cls, from, msg },
      ...prevMessages,
    ]);
  };

  const sendMessage = () => {
    if (socket && newMessage) {
      const message = JSON.stringify({ name, msg: newMessage });
      socket.send(message);
      appendMsg('me', 'me', newMessage);
      setNewMessage('');
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setIsDisabled(e.target.value === '');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <input
        id="my-name"
        type="text"
        placeholder="Your name"
        value={name}
        onChange={handleNameChange}
      />
      <div
        id="chat-text"
        style={{
          border: '1px solid gray',
          height: '300px',
          overflowY: 'scroll',
          margin: '10px 0',
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <span className={msg.cls}>{msg.from}</span>: {msg.msg}
          </div>
        ))}
      </div>
      <input
        id="new-msg"
        type="text"
        placeholder="Type a message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        id="chat-controls"
        disabled={isDisabled}
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default ChatPage;




// import "./Search.css";
// import React, { useState, useEffect } from 'react';
// import { ChatNotifier } from "./chatNotifier";

// const ChatPage = () => {
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [name, setName] = useState('');

//   React.useEffect(() => {
//     ChatNotifier.addHandler(handleChatEvent);

//     return () => {
//       ChatNotifier.removeHandler(handleChatEvent);
//     };
//   });

//   function handleChatEvent(event) {
//     StorageEvent([...EventSource, event]);
//   }

//   const handleChange = (event) => {
//     setNewMessage(event.target.value);
//   }

//   const sendMessage = () => {
//     ChatNotifier.broadcastEvent(name, 'message', newMessage);
//     setNewMessage('');
//   }

//   return (
//     <div>
//       <h1>Chat</h1>
//       <input
//         type="text"
//         placeholder="Your name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <div style={{ border: '1px solid gray', height: '300px', overflowY: 'scroll', margin: '10px 0' }}>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg.from}:</strong> {msg.text}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         placeholder="Type a message"
//         value={newMessage}
//         onChange={handleChange}
//         // onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default ChatPage;


