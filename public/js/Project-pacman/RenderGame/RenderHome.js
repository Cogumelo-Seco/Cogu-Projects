export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let tileSize = 55    

    ctx.font = 'bold 150px pacfont'
    ctx.fillStyle = game.state.rainbowMode ? `hsl(${game.state.rainbowColor}, 100%, 40%)` : 'rgb(255, 202, 24)'
    ctx.fillText('pac man', canvas.width/2-(ctx.measureText('pac man').width/2), 150);

    ctx.fillStyle = 'black'
    ctx.fillText('PAC MAN', canvas.width/2-(ctx.measureText('PAC MAN').width/2), 150);

    ctx.font = 'bold 50px game'
    ctx.fillStyle = game.state.rainbowMode ? `hsl(${game.state.rainbowColor}, 100%, 40%)` : game.state.darkTheme ? 'white' : 'black'
    ctx.fillText('START GAME', canvas.width/2-(ctx.measureText('START GAME').width/2), canvas.height/1.5);

    let menuAnimationX = game.state.animations.menuAnimation.frame*10-(tileSize*2)
    if (menuAnimationX >= canvas.width+(game.state.ghosts.length*tileSize)) game.state.animations.menuAnimation.frame = 0

    let pacManImageConfig = game.state.images[`PacMan/${game.state.pacManStyle}/PacMan.png`]
    let pacManImagePos = pacManImageConfig.animationConfig[game.state.animations.pacMan.frame]

    ctx.fillStyle = 'rgb(255, 202, 24)'
    if (game.state.lowMode) ctx.fillRect(menuAnimationX, game.state.gameGlitched ? canvas.height*Math.random()*0.1+canvas.height/3 : canvas.height/2.5, tileSize, tileSize);
    else if (pacManImageConfig?.image) ctx.drawImage(pacManImageConfig?.image, pacManImagePos.x, pacManImagePos.y, pacManImagePos.width, pacManImagePos.height, menuAnimationX, game.state.gameGlitched ? canvas.height*Math.random()*0.1+canvas.height/3 : canvas.height/2.5, tileSize, tileSize);

    for (let ghost of game.state.ghosts) {
        menuAnimationX -= game.state.gameGlitched ? tileSize*Math.random()*2 : tileSize

        let ghostImageConfig = game.state.images[`ghosts/${ghost.color}/Ghost.png`]
        let ghostImagePos = ghostImageConfig?.animationConfig['right'][game.state.animations.Ghost.frame]

        ctx.fillStyle = 'purple'
        ctx.fillStyle = ghost.color
        if (game.state.lowMode) ctx.fillRect(menuAnimationX, game.state.gameGlitched ? canvas.height*Math.random()*0.1+canvas.height/3 : canvas.height/2.5, tileSize, tileSize)
        else if (ghostImageConfig?.image) ctx.drawImage(ghostImageConfig?.image, ghostImagePos.x, ghostImagePos.y, ghostImagePos.width, ghostImagePos.height, menuAnimationX, game.state.gameGlitched ? canvas.height*Math.random()*0.1+canvas.height/3 : canvas.height/2.5, tileSize, tileSize);
    }
}