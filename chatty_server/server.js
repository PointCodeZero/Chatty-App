const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

//Send all updates to all users
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', ws => {
  console.log('Client connected');

  //Broadcast user count as soon as a new user is connected
  wss.broadcast(
    JSON.stringify({
      type: 'usersConnected',
      id: uuidv4(),
      counter: wss.clients.size
    })
  );

  //Broadcast messages and notifications
  ws.on('message', handleMessage);

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

const handleMessage = data => {
  const message = JSON.parse(data);
  const uniqueID = uuidv4();
  let newObj;
  switch (message.type) {
    case 'postMessage':
      newObj = {
        type: 'incomingMessage',
        id: uniqueID,
        username: message.username,
        content: message.content,
        created_at: Date.now()
      };
      break;
    case 'postNotification':
      newObj = {
        type: 'incomingNotification',
        id: uniqueID,
        content: message.content,
        created_at: Date.now()
      };
      break;
    default:
      console.error(`Unknown event type ${message.type}`);
      break;
  }
  wss.broadcast(JSON.stringify(newObj));
};
