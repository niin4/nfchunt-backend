'use strict';

exports.getTag = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`https://${window.location.host}/tags/${id}`)
    .then((res) => {return res.json()})
    .then((data) => resolve(data))
    .catch((err) => reject(err));
  })
}

exports.getHint = (playerId) => {
  return new Promise((resolve, reject) => {
    fetch(`https://${window.location.host}/hint/${playerId}`)
    .then((res) => {return res.json()})
    .then((data) => resolve(data))
    .catch((err) => reject(err));
  })
}

exports.postFoundTag = (p, t) => {
  return new Promise((resolve, reject) => {
    fetch(`https://${window.location.host}/tagsfound`, {
      body: JSON.stringify({
        tag: t.tag_id,
        player: p.p_id,
        game: t.game_id,
        current: p.p_current
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => resolve(res))
    .catch((err) => reject(err));
  })
}