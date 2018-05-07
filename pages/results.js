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
import Leaderboard from './components/Leaderboard';

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
    console.log(this.state.leaderboard);
    if (!window.localStorage.getItem('NFCHUNT_USER') || window.localStorage.getItem('NFCHUNT_USER') !== this.state.user.p_id) {
      window.localStorage.setItem('NFCHUNT_USER', this.state.user.p_id);
      window.localStorage.setItem('NFCHUNT_GAME', this.state.user.p_game);
    }
  }


  render() {
    const leaderboard = this.props.leaderboard;
    return (
      <div className='container'>
        <Header />
        <div className='box'>
          <h2>Leaderboard</h2>
         <Leaderboard results={leaderboard}/>
        </div>
        <Menu user={this.props.user} />
        <Footer />
      </div>
    )
  }
}