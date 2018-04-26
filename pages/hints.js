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

import * as actions from '../helpers/playeractions.js';

export default class extends React.Component {
  static async getInitialProps({ req, res }) {
    console.log(req.user);
    let id = 1;
    let game = 1;
    if (!req.user) {
      req.session.redirect = `game`;
      req.session.redirecttype = 'tag';
      res.redirect('../createuser');
    } else {
      id = req.user.p_id;
      game = req.user.p_game;
    }

    const json = await fetch(`https://${req.headers.host}/tagsfound?player=${id}&game=${game}`, { agent: agent })
    const data = await json.json();

    return {
      user: req.user,
      hints: data
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    }
  }
  componentDidMount = () => {
    console.log('user:');
    if (!window.localStorage.getItem('NFCHUNT_USER') || window.localStorage.getItem('NFCHUNT_USER') !== this.state.user.p_id) {
      window.localStorage.setItem('NFCHUNT_USER', this.state.user.p_id);
      window.localStorage.setItem('NFCHUNT_GAME', this.state.user.p_game);
    }
    actions.getHint(this.state.user.p_id)
      .then((data) => this.setState({ hint: data.hint }));
  }


  render() {
    const hints = this.props.hints;
    console.log(hints);
    return (
      <div className='container'>
        <Header />
        <div className='box'>
          <h2>Current hint:</h2>
          {this.state.hint}
          {!hints.status ?
            <div>
              <h3>Found tags:</h3>
              <ul>
                {hints.map((hint) =>
                  <li key={hint.id}>
                    <h4>{hint.tag}</h4>
                    {hint.hint}
                  </li>
                )}
              </ul>
            </div> : null}
        </div>
        <Menu user={this.props.user} />
        <Footer />
      </div>
    )
  }
}