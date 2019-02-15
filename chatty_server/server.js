const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');
const PORT = 3001;

// Express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () =>
    console.log(`Listening on ${PORT}`)
  );

// WebSockets server
const wss = new SocketServer({ server });

// Send all updates to all users
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
