import './App.css';
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Tabs, Tab, Card, CardColumns} from 'react-bootstrap';

class TweetCard extends React.Component {
  render() {
    if (this.props.tweet.entities.media) {
      return (
        <Card style={{width: '18rem'}}className="tweetCard">
          <Card.Img variant="top" src={this.props.tweet.entities.media[0].media_url}></Card.Img>
          <Card.Body>
            {this.props.tweet.text}
            <footer>
              <small className="text-muted">
                {this.props.tweet.user.name} - <a href={`https://twitter.com/${this.props.tweet.user.screen_name}`}>@{this.props.tweet.user.screen_name}</a>
              </small>
            </footer>
          </Card.Body>
        </Card>
      );
    }
    else {
      return (
        <Card style={{width: '18rem'}}className="tweetCard">
          <Card.Body>
            {this.props.tweet.text}
  
          <footer>
            <small className="text-muted">
              {this.props.tweet.user.name} - <a href={`https://twitter.com/${this.props.tweet.user.screen_name}`}>@{this.props.tweet.user.screen_name}</a>
            </small>
          </footer>
          </Card.Body>
        </Card>
      )
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: []
    };
  }

  componentDidMount() {
    for (var i = 1; i <= 3; i++) {
      this.loadTopic(i);
    }
  }

  loadTopic(id) {
    const url = `http://saezuri-test.herokuapp.com/topics/list/${id}`
    const temp = this.state;
    var newTopic = {tweets: []}
    axios.get(url)
      .then(response =>{
        newTopic.name = response.data[0].hashtag;
        response.data.map(tweet => {
          const tweetContent = JSON.parse(tweet.json);
          return newTopic.tweets.push(tweetContent);
        })
        temp.topics.push(newTopic);
        this.setState(temp);
      })
  }

  render() {
    return (
      <div className="App">
          <nav className="navbar navbar-dark bg-dark">
            <div className="container">
              <h1 className="text-white">Saezuri</h1>
            </div>
          </nav>
          <div className="container">
            <Tabs id="uncontrolled-tab-example">
              {this.state.topics.map(topic => {
                return (
                <Tab eventKey={topic.name} title={topic.name}>
                  <CardColumns>
                  {topic.tweets.map(tweet => {
                    return <TweetCard tweet={tweet}></TweetCard>
                  })}
                  </CardColumns>
                </Tab>
                )
              })}
            </Tabs>
          </div>
          <footer id="footer" className="navbar navbar-dark bg-dark">
            <small className="text-muted">
              Site design and API by <a href="https://linkedin.com/in/jeremy-pople">Jeremy Pople.</a> Check out my <a href="https://github.com/jpople">GitHub</a>; source code for Saezuri coming Soon™.
            </small>
          </footer>
      </div>
    );
  }
}

export default App;
