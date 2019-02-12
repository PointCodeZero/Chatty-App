import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">{this.props.messages.map((message) => {
        return <Message message={message}/>
        })}
      </main>
    );
  }

}

export default MessageList;