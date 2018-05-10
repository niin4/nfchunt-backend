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
import Labelbox from './components/Labelbox';

const Game = ({game}) => (
  <div className='box'>
    <h2>{game.g_name}</h2>
    <span className="span">Players: {game.players}</span>
    <span className="span">Tags: {game.tags}</span>
    <p>{game.g_welcometext}</p>
  </div>
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
    if (!window.localStorage.getItem('NFCHUNT_USER') || window.localStorage.getItem('NFCHUNT_USER') !== this.state.user.p_id) {
      window.localStorage.setItem('NFCHUNT_USER', this.state.user.p_id);
      window.localStorage.setItem('NFCHUNT_GAME', this.state.user.p_game);
    }
  }


  render() {
    return (
      <div className='container'>
        <Header/>
        <Game game={this.props.game}/>
        <Labelbox title="Player">
          <h4>{this.state.user.p_name}</h4>
        </Labelbox>
        <Menu user={this.props.user} />
        <Footer/>
      </div>
    )
  }
}