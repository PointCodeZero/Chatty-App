import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: 'Anonymous',
      messages: []
    };
    this.onKeyPress = this.onKeyPress.bind(this);
    this.currentUserUpdate = this.currentUserUpdate.bind(this);
  }

  onKeyPress(event) {
    if (event.key == 'Enter') {
      this.socket.send(JSON.stringify({ username: this.state.currentUser, content: event.target.value }));
      event.target.value = '';
    }
  }

  currentUserUpdate(event) {
    const newUser = event.target.value;
    newUser.length === 0 ? this.setState({ currentUser: 'Anonymous' }) : this.setState({ currentUser: newUser });
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    //Websockets connection
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = () => {
      console.log('Connected to 3001');
    };

    this.socket.onmessage = (event) => {
      const messages = this.state.messages;
      this.setState({ messages: [...messages, JSON.parse(event.data)] }, () => {
      });
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} currentUser={this.state.currentUser} />
        <ChatBar onKeyPress={this.onKeyPress} currentUser={this.state.currentUser} currentUserUpdate={this.currentUserUpdate} />
      </div>
    );
  }
}
export default App;
