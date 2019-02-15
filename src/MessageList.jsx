import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {this.props.messagesNotifications.map((item) => {
          if(item.type === 'incomingMessage') {
            return <Message key={item.id} message={item} />
          }
          return <Notification key={item.id} notification={item} />
        })}
      </main>
    );
  }
}

export default MessageList;