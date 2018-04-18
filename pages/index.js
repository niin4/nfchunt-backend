import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export default class extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <div>NFC Hunt is a game about hunting tresures and clues utilizing NFC 
          Tags. Simple to set up and players only need their mobile device to play.</div>
        <Footer/>
      </div>
    )
  }
}