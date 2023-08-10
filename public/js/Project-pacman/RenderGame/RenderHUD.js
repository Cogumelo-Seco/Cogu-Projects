export default async (canvas, game, Listener,) => {
    const levelHUD = document.getElementById('level')
    const codesHUD = document.getElementById('codesUsed')
    const scoreHUD = document.getElementById('score')
    const highScoreHUD = document.getElementById('highScore')
    const highScoreTitle = document.getElementById('highScoreTitle')

    scoreHUD.style.color = game.state.darkTheme ? 'white' : 'black'
    highScoreHUD.style.color = game.state.darkTheme ? 'white' : 'black'
    highScoreTitle.style.color = game.state.darkTheme ? 'white' : 'black'
    levelHUD.style.color = game.state.darkTheme ? 'white' : 'black'

    scoreHUD.innerText = game.state.score
    highScoreHUD.innerText = game.state.highScore
    if (game.state.codes) codesHUD.style.display = 'block'
    else codesHUD.style.display = 'none'
    codesHUD.innerText = `Codes ${game.state.codes}`
    levelHUD.innerText = `Level ${game.state.level}`

    const lifesHUD = document.getElementById('lifes')
    lifesHUD.innerHTML = ''

    let pacmanLifeX = 20
    for (let i = 0; i < game.state.lifes; i++) {
        let pacmanLife = new Image()
        pacmanLife.src = `/imgs/pac-man/PacMan/PacMan-Open.png`
        pacmanLife.className = 'pacmanLife'        
        pacmanLife.style = `
            left: ${pacmanLifeX}px;
            -webkit-transform: scaleX(-1);
            transform: scaleX(-1);
        `
        lifesHUD.appendChild(pacmanLife)
        pacmanLifeX += 25
    }
}