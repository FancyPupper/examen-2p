import React, { Component, Fragment } from 'react';
import './App.css';
import TweetBox from './TweetBox';
import Feed from './Feed';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tweets: [],
      error: null,
      isLoaded: true
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://still-garden-88285.herokuapp.com/draft_tweets")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            tweets: result.draft_tweets
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: error
          })
        }
      )
  }

  handleDelete = (id) => {
    return fetch("https://still-garden-88285.herokuapp.com/draft_tweets", {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: id
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log("Deleted");
      },
      (error) => {
        this.setState({
          error: error
        })
      }
    )

  }

  handleSubmit(newText) {
    this.setState({isLoaded: false});

    // Static UI :(
    // let newTweet = {
    //   id: this.state.tweets.length + 1,
    //   user_name: 'Yvone',
    //   avatar: 'https://img.ifcdn.com/images/d3951bf44788590b80f69c0c65718f7a23eb33c645cb677ee335f81a6e785ee6_3.jpg',
    //   created_at: '11-03-2019',
    //   description: newText
    // };

    // let tweets = this.state.tweets.slice();

    // this.setState({ tweets: tweets.concat(newTweet) });

    // Dynamic UI !
    let newTweet = {
      user_name: 'Yvone',
      avatar: 'https://img.ifcdn.com/images/d3951bf44788590b80f69c0c65718f7a23eb33c645cb677ee335f81a6e785ee6_3.jpg',
      description: newText
    };

    let headers = {};
    headers['Content-Type'] = 'application/json';

    const options = {
      headers: headers,
      method: 'POST',
      // credentials: 'include',
      body: JSON.stringify(newTweet)
    };

    fetch("https://still-garden-88285.herokuapp.com/draft_tweets", options)
      .then(res => res.json())
      .then(
        (result) => {
          let newTweets = this.state.tweets.slice();

          this.setState({
            isLoaded: true,
            tweets: newTweets.concat(result.draft_tweet)
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, tweets } = this.state;
    let content;

    if (error) {
      content = <div>Error: {error.message}</div>;
    } else {
      return (
        content = (
          <Fragment>
            <TweetBox
              onSubmitNewTweet={this.handleSubmit}
            />
            <Feed 
              handleDelete={this.handleDelete}
              tweets={tweets}
              isLoaded={isLoaded}
            />
          </Fragment>
        )
      );
    }

    return (
      <div className="App">
        { content }
      </div>
    )
  }
}

export default App;
