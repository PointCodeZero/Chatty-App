import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div>
        <div className="message">
          <span className="message-username">
            {this.props.message.username}
          </span>
          <span className="message-content">{this.props.message.content}</span>
          <span className="message-content">
            {this.props.message.created_at}
          </span>
        </div>
      </div>
    );
  }
}

export default Message;
