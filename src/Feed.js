import React, { Component } from 'react';
import './App.css';
import Tweet from './Tweet';

function EmptyState(props) {
  return (
    <div className="dummy-tweet row">
      Loading...
    </div>
  )
}

class Feed extends Component {
  delete = (id) => {
    //console.log("Id in feed is: " + id);
    this.props.handleDelete(id);
  }

  render() {
    return(
      <ul className="feed">
        {/* CONDITIONAL RENDERING */}
        {!this.props.isLoaded && <EmptyState />}

        {
          this.props.tweets.map((tweet) => (
            <Tweet 
              delete={this.delete}
              key={tweet.id}
              obj={tweet}
              // user={tweet.user_name}
              // userPic={tweet.avatar}
              // content={tweet.description}
              // createdAt={tweet.created_at}
            />
          ))
        }
      </ul>
    )
  }
}

export default Feed;
