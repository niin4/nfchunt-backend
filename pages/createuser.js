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
import Labelbox from './components/Labelbox';

export default class extends React.Component {
  static async getInitialProps({ req }) {

    const splitUrl = req.session.redirect.split('/');
    const id = splitUrl[1];
    const res = await fetch(`https://${req.headers.host}/tags/${id}`, { agent: agent })
    const data = await res.json();
    return {
      tag: data
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      tag: props.tag,
      user: ''
    }
  }
  // https://stackoverflow.com/a/133997
  postForm = (path, params, method) => {
    method = method || "post"; // Set method to post by default if not specified.
    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    let form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
      }
    }
    document.body.appendChild(form);
    form.submit();
  }

  componentDidMount = () => {
    const user = window.localStorage.getItem('NFCHUNT_USER');
    const game = window.localStorage.getItem('NFCHUNT_GAME');
    if (user) {
      console.log('user exists');
      // check if user is for this game's tag, then log them in
      console.log(this.state.tag);
      console.log(game);
      if (game == this.state.tag.game_id) {
        console.log('match');
        this.postForm('/login', {id: user, game: game})
      } else {
        console.log('not match, removing local data');
        //remove from localstorage so we can create new user to this game
        window.localStorage.removeItem('NFCHUNT_USER');
        window.localStorage.removeItem('NFCHUNT_GAME');
      }
    }
  }
  //TODO: make error
  createUser = (evt) => {
    if (!this.state.user.length) {
      evt.preventDefault();
      console.log('Missing username');
    }
  }

  handleChange = (event) => {
    this.setState({ user: event.target.value });
  }

  render() {
    const tag = this.state.tag;

    return (
      <div className='container'>
        <Header />
        <div className='box'>
          <h3>Game: {tag.game}</h3>
          <p>{tag.welcometext}</p>    
          <h2>Your name:</h2>
          <form action='/signup' method='POST' onSubmit={this.createUser}>
            <input type='text' name='name' value={this.state.user} onChange={(evt) => {this.handleChange(evt)}} />
            <input type='hidden' name='game' value={tag.game_id} />
            <input type='hidden' name='tag' value={tag.tag_id} />
            <button className='button button--yellow' type='submit'>Start playing</button>
          </form>     
        </div>
        <Footer />
      </div>
    )

  }
}