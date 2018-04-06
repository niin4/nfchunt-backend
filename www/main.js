fetch('games/Player1')
.then((res) => { return res.json() })
.then((data) => {
    console.log(data);
    const container = document.getElementById('main');
    data.forEach(element => {
        const game = document.createElement('div');
        game.innerHTML = 
            `<h3>${element.g_name}</h3> 
            <b>Created by:</b><br/>
            ${element.g_user}<br/>
            <b>Shortcode:</b><br/>
            ${element.g_shortcode}<br/>
            <b>Game welcome text:</b><br/>
            ${element.g_welcometext}<br/>
            <b>Game completed text:</b><br/>
            ${element.g_completedtext}<br/>`;
        container.appendChild(game);
    });
})