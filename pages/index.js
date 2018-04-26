import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';

import "../scss/styles.scss"

export default class extends React.Component {
  static async getInitialProps({ req, res }) {
    req.session.redirect = `tag/1`;
    req.session.redirecttype = 'tag';

    if (!req.user) {
      res.redirect('../createuser');
    }
    return {
      user: req.user
    }
  }

  render() {
    return (
      <div className='container'>
        <Header />
        <div className='box'>NFC Hunt is a game about hunting tresures and clues utilizing NFC
          Tags. Simple to set up and players only need their mobile device to play.</div>
        <Menu user={this.props.user} />
        <Footer />
      </div>
    )
  }
}