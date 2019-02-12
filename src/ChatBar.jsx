import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" name="username" defaultValue={this.props.currentUser} placeholder="Your Name (Optional)" />
        <input onKeyPress={this.props.onKeyPress} className="chatbar-message" name="message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;