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

import * as actions from '../helpers/playeractions.js';

export default class extends React.Component {
  static async getInitialProps({ req, res }) {
    let id = 1;
    let game = 1;
    if (!req.user) {
      req.session.redirect = `game`;
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
    if (!window.localStorage.getItem('NFCHUNT_USER') || window.localStorage.getItem('NFCHUNT_USER') !== this.state.user.p_id) {
      window.localStorage.setItem('NFCHUNT_USER', this.state.user.p_id);
      window.localStorage.setItem('NFCHUNT_GAME', this.state.user.p_game);
    }
    actions.getHint(this.state.user.p_id)
      .then((data) => this.setState({ hint: data.hint }));
  }


  render() {
    const hints = this.props.hints;
    return (
      <div className='container'>
        <Header />
        <div className='box'>
          <h2>Current hint:</h2>
          <p>{this.state.hint}</p>
        </div>
        {!hints.status ?
          <Labelbox title="Found tags">
            <ul>
              {hints.map((hint) =>
                <li key={hint.id}>
                  <h4>{hint.tag}</h4>
                  {hint.hint}
                </li>
              )}
            </ul>
          </Labelbox>
          : null}
        <Menu user={this.props.user} />
        <Footer />
      </div>
    )
  }
}