import React, { Component } from 'react';
import './App.css';

class Tweet extends Component {

  sendId = (event) => {
    event.preventDefault();
    let id = this.props.obj.id;
    this.props.delete(id);
    //alert('Sended ' + id);
  }

  render() {
    const { user_name, avatar, description, created_at } = this.props.obj;
    
    return(
      <li className="tweet row">
        <div>
          <img
            alt={user_name + "'s avatar"}
            className="small-avatar"
            src={avatar}
          />
        </div>
        <div className="column tweet-content">
          <div className="row">
            <p className="user-name">{user_name}</p>
            <span className="timestamp">{created_at}</span>
          </div>
          <div className="tweet-info">{description}</div>
        </div>
        <button onClick={this.sendId}>Delete</button>
      </li>
    )
  }
}

export default Tweet;
