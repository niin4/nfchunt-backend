fetch('http://nfchunt.jelastic.metropolia.fi/games/Player1')
.then((res) => { return res.json() })
.then((data) => {
    console.log(data);
    const container = document.getElementById('main');
    data.forEach(element => {
        const game = document.createElement('div');
        const text = document.createElement('p');
        text.appendChild(document.createTextNode(
            `Game: ${element.g_name}, 
            ${element.g_user}, 
            ${element.g_welcometext}, 
            ${element.g_completedtext}`));
        game.appendChild(text);
        container.appendChild(game);
    });
})