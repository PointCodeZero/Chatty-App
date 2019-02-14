import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input onChange={this.props.currentUserUpdate} className="chatbar-username" type="text" defaultValue={this.props.currentUser} placeholder="Your Name (Optional)" />
        <input onKeyPress={this.props.addMessage} className="chatbar-message" type="text" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;