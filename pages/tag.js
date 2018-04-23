import React from 'react';
import Router from 'next/router'
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
import Menu from './components/Menu';

import * as actions from '../helpers/playeractions.js';


export default class extends React.Component {
  static async getInitialProps({ req, res }) {
    const splitUrl = req.originalUrl.split('/');
    const id = splitUrl[2];

    req.session.redirect = `tag/${id}`;
    req.session.redirecttype = 'tag';

    if (!req.user) {
      res.redirect('../createuser');
    }

    const json = await fetch(`https://${req.headers.host}/tags/${id}`, { agent: agent })
    const data = await json.json();

    return {
      id: id,
      tag: data,
      user: req.user
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      tag: props.tag,
      user: props.user,
      gamestatus: 'tagfound'
    }
  }

  componentDidMount = () => {
    if (!window.localStorage.getItem('NFCHUNT_USER')) {
      window.localStorage.setItem('NFCHUNT_USER', this.state.user.p_id);
      window.localStorage.setItem('NFCHUNT_GAME', this.state.user.p_game);
    }
    if (this.state.user.p_game == this.state.tag.game_id) {
      actions.postFoundTag(this.state.user, this.state.tag)
        .then((res) => {
          if (res.status == 201 || res.status == 200 || res.status == 304) {
            console.log('getting hint');
            actions.getHint(this.state.user.p_id)
              .then((data) => this.setState({ hint: data.hint }));
          } else if (res.status == 303) {
            this.setState({ gamestatus: 'won' })
          }
        })
    } else {
      actions.getHint(this.state.user.p_id)
        .then((data) => this.setState({ hint: data.hint }));
    }
  }

  render() {
    const tag = this.props.tag;
    return (
      <div>
        <Header />
        <h2>You found tag {tag.tag}!</h2>
        <p>from {tag.game}</p>
        {this.state.gamestatus == 'tagfound' ?
          <div>
            <div className='hint'>{this.state.hint}</div>
          </div>
          :
          <div>
            <h2>Grats! You won!</h2>
          </div>}
        <Menu user={this.props.user} />
        <Footer />
      </div>
    )
  }
}