// Adjust the webSocket protocol to what is being used for HTTP
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

// Display that we have opened the webSocket
socket.onopen = (event) => {
  appendMsg('system', 'websocket', 'connected');
};

// Display messages we receive from our friends
socket.onmessage = async (event) => {
  const text = await event.data.text();
  const chat = JSON.parse(text);
  appendMsg('friend', chat.name, chat.msg);
};

// If the webSocket is closed then disable the interface
socket.onclose = (event) => {
  appendMsg('system', 'websocket', 'disconnected');
  document.querySelector('#name-controls').disabled = true;
  document.querySelector('#chat-controls').disabled = true;
};

// Send a message over the webSocket
function sendMessage() {
  const msgEl = document.querySelector('#new-msg');
  const msg = msgEl.value;
  if (!!msg) {
    appendMsg('me', 'me', msg);
    const name = document.querySelector('#my-name').value;
    socket.send(`{"name":"${name}", "msg":"${msg}"}`);
    msgEl.value = '';
  }
}

// Create one long list of messages
function appendMsg(cls, from, msg) {
  const chatText = document.querySelector('#chat-text');
  const chatEl = document.createElement('div');
  chatEl.innerHTML = `<span class="${cls}">${from}</span>: ${msg}</div>`;
  chatText.prepend(chatEl);
}

// Send message on enter keystroke
const input = document.querySelector('#new-msg');
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Disable chat if no name provided
const chatControls = document.querySelector('#chat-controls');
const myName = document.querySelector('#my-name');
myName.addEventListener('keyup', (e) => {
  chatControls.disabled = myName.value === '';
});



// class EventMessage {
//     constructor(from, type, value) {
//     this.from = from;
//     this.type = type;
//     this.value = value;
//     }
// }

// class ChatEventNotifier {
//     events = [];
//     handlers = [];

//     constructor() {
//         let port = window.location.port;
//         const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
//         this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
//         this.socket.onopen = (event) => {
//         this.receiveEvent(new EventMessage('Chat', GameEvent.System, { msg: 'connected' }));
//         };
//         this.socket.onclose = (event) => {
//         this.receiveEvent(new EventMessage('Chat', GameEvent.System, { msg: 'disconnected' }));
//         };
//         this.socket.onmessage = async (msg) => {
//         try {
//             const event = JSON.parse(await msg.data.text());
//             this.receiveEvent(event);
//         } catch {}
//         };
//     }

//     broadcastEvent(from, type, value) {
//         const event = new EventMessage(from, type, value);
//         this.socket.send(JSON.stringify(event));
//     }

//     addHandler(handler) {
//         this.handlers.push(handler);
//     }

//     removeHandler(handler) {
//         this.handlers.filter((h) => h !== handler);
//     }

//     receiveEvent(event) {
//         this.events.push(event);

//         this.events.forEach((e) => {
//         this.handlers.forEach((handler) => {
//             handler(e);
//         });
//         });
//     }
//     }

//     const ChatNotifier = new ChatEventNotifier();
//     export { ChatNotifier };
