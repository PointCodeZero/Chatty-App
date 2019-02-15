# Chat App Project

Chat App is an open space where users can meet together and chat anonymously or not.

A single-page application built with front-end engines such as ReactJS, native WebSocket, HTML5 & CSS, JavaScript, JSX, Webpack & Babel and back-end engines like NodeJS and Express. Unique id's were generated with UUID package.

## Functionality

- Users will be able to join a chat and start typing messages to each other
- Messages will be displayed in chronological order to everyone participating the chat
- Time messages were creates are displayed beside eache message
- Users that join the chat later will only have access to the messages history from this point foward
- By default when a user joins the chat he will be displayed as Anonymously
- Users can change their name at any time and all users will be notified
- The number os users online will be displayed in the far upper rigth corner of the screen and updated automatically

## Images

!["Screenshot of chat"](https://github.com/PointCodeZero/Chatty-App/blob/master/docs/chat.jpg?raw=true)

## Dependencies

- ReactJS
- ReactDOM
- Native WebSocket
- Node.js
- Express
- uuid
- ws
- Webpack
- [babel-loader](https://github.com/babel/babel-loader)
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

## Getting Started

1. Install all dependencies (run `npm install` command)
2. Run the Client server `./server.js` using the `npm start` command
3. Run the WebSocket server `./chatty_server/server.js` using the `node server.js` command

### Expected Usage

This program should be executed from the browser, in the following manner:

1. Go to your browser address bar and open `http://localhost/3000/`
2. Type a message and hit `Enter`
3. Type a new name and hit `Enter`
4. Open a new window browser and reapeat steps 2 and 3
