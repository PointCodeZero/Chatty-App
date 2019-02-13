import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: 'Anonymous',
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    this.onKeyPress = this.onKeyPress.bind(this);
    this.currentUserUpdate = this.currentUserUpdate.bind(this);
  }

  onKeyPress(event) {
    if (event.key == 'Enter') {
      const id = this.state.messages.length + 1;
      const allMessages = this.state.messages;
      allMessages.push({ id: id, username: this.state.currentUser, content: event.target.value });
      this.setState({ messages: allMessages });
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
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Andreia", content: "Mike is the best!"};
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 3000);
    //Websockets connection
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = () => {
      console.log('Connected to 3001');
      // this.socket.send("Here's some text that the server is urgently awaiting!");
    };
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
