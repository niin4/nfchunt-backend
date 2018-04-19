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

const Game = (props) => (
  <div>
    <h2>{props.game.name}</h2>
    <h4>Players: {props.game.players}</h4>
    <h4>Tags: {props.game.tags}</h4>
    <p>{props.game.welcometext}</p>
  </div>
)

export default class extends React.Component {
  static async getInitialProps({ req, res }) {
    console.log(req.user);
    let id = 1;
    if (!req.user) {
      req.session.redirect = `game`;
      req.session.redirecttype= 'tag';
      res.redirect('../createuser');
    } else {
      id = req.user.p_game;
    }
    
    const json = await fetch(`https://${req.headers.host}/games/${id}}`, {agent: agent})
    const data = await json.json();

    return {
      user: req.user,
      game: data
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      game: props.game
    }
  }
  componentDidMount = () => {
    console.log('user:');
    if (!window.localStorage.getItem('NFCHUNT_USER')) {
      window.localStorage.setItem('NFCHUNT_USER', this.state.user.p_id);
      window.localStorage.setItem('NFCHUNT_GAME', this.state.game.id);
    }
  }


  render() {
    const game = this.props.game;
    return (
      <div>
        <Header/>
        <Game game={game}/>
        <Menu user={this.props.user} />
        <Footer/>
      </div>
    )
  }
}