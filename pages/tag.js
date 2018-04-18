import React from 'react';
import Router from 'next/router'
import fetch from 'isomorphic-unfetch';
require('es6-promise').polyfill();

import Header from './components/Header';
import Footer from './components/Footer';


export default class extends React.Component {
  static async getInitialProps({ req, res }) {
    const splitUrl = req.originalUrl.split('/');
    const id = splitUrl[2];
    console.log('rendering tag');

    if (!req.user) {
      req.session.redirect = `tag/${id}`;
      req.session.redirecttype= 'tag';
      res.redirect('../createuser');
    }
    
    const json = await fetch(`https://${req.headers.host}/tags/${id}`)
    const data = await json.json();

    return {
      tag: data
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      tag: props.tag
    }
  }
  
  render () {
    const tag = this.props.tag;
    return (
      <div>
        <Header />
        <div>
          <h2>You found {tag.name}!</h2>
          <p>{tag.game}</p>
        </div>
        <Footer/>
      </div>
    )
  }
}