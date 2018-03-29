fetch('http://nfchunt.jelastic.metropolia.fi/games/Player1')
.then((res) => { return res.json() })
.then((data) => {
    console.log(data);
    const container = document.getElementById('main');
    data.forEach(element => {
        const game = document.createElement('div');
        game.innerHTML = 
            `<h3>${element.g_name}</h3> 
            ${element.g_user}<br> 
            ${element.g_welcometext}<br> 
            ${element.g_completedtext}<br>
            ${element.g_shortcode}`;
        container.appendChild(game);
    });
})