import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      type: '',
      currentUser: 'Anonymous',
      oldUser: 'Anonymous',
      messagesNotifications: []
    };
    this.addMessage = this.addMessage.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.currentUserUpdate = this.currentUserUpdate.bind(this);
  }

  addMessage(event) {
    if (event.key == 'Enter') {
      this.socket.send(
        JSON.stringify({
          type: 'postMessage',
          username: this.state.currentUser,
          content: event.target.value,
        })
      );
      event.target.value = '';
    }
  }

  addNotification(event) {
    if (event.key == 'Enter') {
      const oldUser = this.state.oldUser;
      const newUser = event.target.value;
      this.socket.send(
        JSON.stringify({
          type: 'postNotification',
          content: `${oldUser} has changed their name to ${newUser}`
        })
      );
      this.setState({ oldUser: newUser });
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
      const messagesNotifications = this.state.messagesNotifications;
      const data = JSON.parse(event.data);
          this.setState(
            {
              messagesNotifications: [
                ...messagesNotifications,
                data
              ],
              type: data.type
            },
            () => {}
          );
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
          messagesNotifications={this.state.messagesNotifications}
          currentUser={this.state.currentUser}
        />
        <ChatBar
          addMessage={this.addMessage}
          addNotification={this.addNotification}
          currentUser={this.state.currentUser}
          currentUserUpdate={this.currentUserUpdate}
        />
      </div>
    );
  }
}

export default App;
