import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';

import "../scss/styles.scss"

import Winner from './components/Winner';

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
        <div className='box'>
          <h2>About NFC Hunt</h2>
          <p>NFC Hunt is a game about hunting treasures and clues utilizing NFC
          Tags. Simple to set up and players only need their mobile device to play.
          </p>
          <h3>Credits</h3>
          <p>Background: <a href='https://www.freepik.com/free-vector/purple-background-of-colorful-triangles_1095549.htm'>Freepik</a><br/>
          Icons: <a href='https://flaticon.com'>Flaticon</a></p>
        </div>
        <Menu user={this.props.user} />
        <Footer />
      </div>
    )
  }
}