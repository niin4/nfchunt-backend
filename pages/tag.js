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


export default class extends React.Component {
  static async getInitialProps({ req, res }) {
    const splitUrl = req.originalUrl.split('/');
    const id = splitUrl[2];

    req.session.redirect = `tag/${id}`;
    req.session.redirecttype= 'tag';

    if (!req.user) {
      res.redirect('../createuser');
    }
    console.log(req.user);
    
    const json = await fetch(`https://${req.headers.host}/tags/${id}`, {agent: agent})
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
      user: props.user
    }
  }

  componentDidMount = () => {
    console.log('user:');
    if (!window.localStorage.getItem('NFCHUNT_USER')) {
      window.localStorage.setItem('NFCHUNT_USER', this.state.user.p_id);
      window.localStorage.setItem('NFCHUNT_GAME', this.state.tag.game_id);
    }
  }

  render () {
    const tag = this.props.tag;
    return (
      <div>
        <Header />
        <div>
          <h2>You found {tag.tag}!</h2>
          <p>from {tag.game}</p>
        </div>
        <Menu user={this.props.user} />
        <Footer/>
      </div>
    )
  }
}