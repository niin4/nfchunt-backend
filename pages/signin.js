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
import Footer from './components/Footer';

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const gameId = 1;

    req.session.redirect = `game`;
    req.session.redirecttype = 'game';

    return {
      game: gameId
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      game: props.game,
      user: ''
    }
  }

  //TODO: make error
  createUser = (evt) => {
    if (!this.state.user.length) {
      evt.preventDefault();
      console.log('Missing username');
    }
  }

  handleChange = (evt) => {
    this.setState({ user: event.target.value });
  }

  render() {
    return (
      <div className='container'>
        <Header />
        <div className='box'>
          <h3>Game 1 login</h3>
          <h2>Log in:</h2>
          <form action='/login' method='POST' onSubmit={this.createUser}>
            <input type='text' name='id' value={this.state.user} onChange={this.handleChange} />
            <input type='hidden' name='game' value={this.state.game} />
            <button className='button button--red' type='submit'>Log in</button>
          </form>
        </div>
        <p>{this.state.user}</p>
        <Footer />
      </div>
    )

  }
}