import React from 'react';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (

      !this.props.user ?
        <nav className='navigation'><ul>
          <li>Info</li>
        </ul>
        </nav> :

        <nav className='navigation'>
          <ul>
            <a href='/game'><li>Game</li></a>
            <a href='/hints'><li>Hints</li></a>
            <a href='/results'><li>Leaderboard</li></a>
            <a href='/'><li>Info</li></a>
          </ul>
        </nav>
    )
  }
}

