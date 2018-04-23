import React from 'react';
import fetch from 'isomorphic-unfetch';
require('es6-promise').polyfill();
const https = require('https');
const agentOptions = {
  host: 'localhost',
  port: '8080',
  path: '/',
  rejectUnauthorized: false
};

const agent = new https.Agent(agentOptions);

import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';

const LeaderboardList = (leaderboard) => (
  leaderboard.map((item) => {
    <li>{item.player} {item.count}</li>
  })
)

export default class extends React.Component {
  static async getInitialProps({ req, res }) {
    let id = 1;
    if (!req.user) {
      req.session.redirect = `game`;
      res.redirect('../createuser');
    } else {
      id = req.user.p_game;
    }

    const json = await fetch(`https://${req.headers.host}/leaderboard/${id}}`, { agent: agent })
    const data = await json.json();

    return {
      user: req.user,
      leaderboard: data
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      leaderboard: props.leaderboard
    }
  }
  componentDidMount = () => {
    console.log('user:');
    if (!window.localStorage.getItem('NFCHUNT_USER') || window.localStorage.getItem('NFCHUNT_USER') !== this.state.user.p_id) {
      window.localStorage.setItem('NFCHUNT_USER', this.state.user.p_id);
      window.localStorage.setItem('NFCHUNT_GAME', this.state.user.p_game);
    }
  }


  render() {
    const leaderboard = this.props.leaderboard;
    return (
      <div>
        <Header />
        <h2>Leaderboard</h2>
        {leaderboard.map((item) => 
          <li key={item.player}>{item.player} {item.count}</li>
        )}
        <Menu user={this.props.user} />
        <Footer />
      </div>
    )
  }
}