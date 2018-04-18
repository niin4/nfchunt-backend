import React from 'react';
import fetch from 'isomorphic-unfetch';

import Header from './components/Header';
import Footer from './components/Footer';

const Game = (props) => (
  <div>
    <h2>{props.game.name}</h2>
    <h4>Players: {props.game.players}</h4>
    <h4>Tags: {props.game.tags}</h4>
    <p>{props.game.welcometext}</p>
  </div>
)


export default class extends React.Component {
  static async getInitialProps({ req }) {
    const res = await fetch(`https://${req.headers.host}/games/${req.query.id}`)
    const data = await res.json();
    console.log(data)

    return {
      game: data
    }
  }

  render() {
    const game = this.props.game;
    return (
      <div>
        <Header/>
        <Game game={game}/>
        <Footer/>
      </div>
    )
  }
}