import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <div>
        <div key={this.props.message.id} className="message">
          <span className="message-username">{ this.props.message.username }</span>
          <span className="message-content">{ this.props.message.content }</span>
        </div>
      </div>
    );
  }
}

export default Message;