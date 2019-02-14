import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      type: '',
      currentUser: 'Anonymous',
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
    this.currentUserUpdate = this.currentUserUpdate.bind(this);
  }

  addMessage(event) {
    if (event.key == 'Enter') {
      this.socket.send(
        JSON.stringify({
          type: 'postMessages',
          username: this.state.currentUser,
          content: event.target.value
        })
      );
      event.target.value = '';
    }
  }

  currentUserUpdate(event) {
    const newUser = event.target.value;
    newUser.length === 0
      ? this.setState({ currentUser: 'Anonymous' })
      : this.setState({ currentUser: newUser });
  }

  componentDidMount() {
    console.log('componentDidMount <App />');

    //Websockets connection
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = () => {
      console.log('Connected to 3001');
    };

    this.socket.onmessage = event => {
      const messages = this.state.messages;
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'incomingMessage':
          this.setState(
            {
              messages: [
                ...messages,
                { id: data.id, username: data.username, content: data.content }
              ]
            },
            () => {}
          );
          break;
        // case 'incomingNotification':
        //   // this.setState({ messages: [...messages, data] }, () => { });
        //   break;
        default:
          throw new Error(`Unknown event type ${data.type}`);
      }
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <MessageList
          messages={this.state.messages}
          currentUser={this.state.currentUser}
        />
        <ChatBar
          addMessage={this.addMessage}
          currentUser={this.state.currentUser}
          currentUserUpdate={this.currentUserUpdate}
        />
      </div>
    );
  }
}
export default App;
