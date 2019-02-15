import React, {Component} from 'react';

class Notification extends Component {
  render() {
    return (
      <div>
        <div className="notification">
          <span className="notification-content">{this.props.notification.content}</span>
        </div>
      </div>
    );
  }
}

export default Notification;