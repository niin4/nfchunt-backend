import React from 'react';
import fetch from 'isomorphic-unfetch';
require('es6-promise').polyfill();

import Header from './components/Header';
import Footer from './components/Footer';

export default class extends React.Component {
  static async getInitialProps({ req }) {

    const splitUrl = req.session.redirect.split('/');
    const id = splitUrl[1];
    const res = await fetch(`https://${req.headers.host}/tags/${id}`)
    const data = await res.json();
    return {
      tag: data,
      redirect: req.session.redirect
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      tag: props.tag,
      redirect: props.redirect,
      user: ''
    }
  }

  //TODO: make error
  createUser = (evt) => {
    if (!this.state.user.length) {
      evt.preventDefault();
      console.log('Missing username');
    } 
    /*else {
      
      fetch(`http://${window.location.hostname}:8080/signup`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          body: bodyData
        })
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          console.log(data)
        });*/
  }

  handleChange = (evt) => {
    this.setState({ user: event.target.value });
  }

  render() {
    const tag = this.state.tag;

    return (
      <div>
        <Header />
        <div>
          <h3>Game: {tag.game}</h3>
          <h2>Create user:</h2>
          <form action='/signup' method='POST' onSubmit={this.createUser}>
            <input type='text' name='name' value={this.state.user} onChange={this.handleChange} />
            <input type='hidden' name='game' value={tag.game_id}/>
            <button type='submit'>Create user</button>
          </form>
        </div>
        <p>{this.state.user}</p>
        <Footer />
      </div>
    )

  }
}