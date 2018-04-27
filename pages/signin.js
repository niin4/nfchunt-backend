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

    return {
      game: gameId
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      game: '',
      id: ''
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
    this.setState({ [evt.target.name]: event.target.value });
  }

  render() {
    return (
      <div className='container'>
        <Header />
        <div className='box'>
          <h3>Game 1 login</h3>
          <h2>Log in:</h2>
          <form action='/login' method='POST' onSubmit={this.createUser}>
            <label for='id'>User:</label><br/>
            <input type='text' name='id' value={this.state.id} onChange={this.handleChange} />
            <label for='game'>Game:</label><br/>
            <input type='text' name='game' value={this.state.game} onChange={this.handleChange}/>
            <button className='button button--red' type='submit'>Log in</button>
          </form>
        </div>
        <Footer />
      </div>
    )

  }
}