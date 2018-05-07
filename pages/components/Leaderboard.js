import React from 'react';

const Leaderboard = ({results}) => (
  <ul className="leaderboard">
    {results.map(res => 
    <li className="leaderboard__item" key={res.player}>{res.player} {res.count}</li>  
    )}
  </ul>
)

export default Leaderboard;
