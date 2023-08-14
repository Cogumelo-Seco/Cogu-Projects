export default async (canvas, game, Listener, randomColor) => {
    const ctx = canvas.getContext('2d')

    let glitchedPercent = Math.floor(Math.random()*100)
    let ghostsIds = game.state.ghosts.map(g => g.id)
    let fruitsIds = [ 20, 21, 22, 23, 24, 25, 26, 27 ]
    let tileSize = game.state.canvas.tileSize
    let map = game.state.map
    let x = 0
    let y = 0
    
    for (let lineY in map) {
        for (let lineX in map[lineY]) {
            let type = map[lineY][lineX].type
            lineY = Number(lineY)
            lineX = Number(lineX)
            switch (type) {
                case 0:
                    ctx.fillStyle = game.state.gameGlitched || game.state.rainbowMode ? randomColor() : game.state.darkTheme ? '#ffb897' : 'rgb(50, 50, 50)'

                    if (game.state.lowMode) ctx.fillRect(x+(tileSize*0.37), y+(tileSize*0.37), tileSize*0.25, tileSize*0.25)
                    else {
                        ctx.beginPath();
                        ctx.arc(x+(tileSize/2), y+(tileSize/2), game.state.gameGlitched ? Math.floor(Math.random()*6) : 5, 0, 2 * Math.PI)
                        ctx.fill();
                    }
                    /*ctx.fillStyle = '#fff'
                    ctx.font = `${tileSize/2}px Arial`
                    ctx.fillText(map[lineY][lineX].distance || 0, x+tileSize/2-(ctx.measureText(map[lineY][lineX].distance || 0).width/2), y+tileSize/1.5)*/
                    break
                case 1:
                    let wallLineSize = game.state.gameGlitched ? Math.floor(Math.random()*3)+4 : 6
                    let wallColor = game.state.gameGlitched && glitchedPercent > 80 ? randomColor() : game.state.rainbowMode ? `hsl(${game.state.rainbowColor}, 100%, 40%)` : '#141484'

                    if (game.state.animations.walls.frame && game.state.gameStage == 'levelWon') ctx.fillStyle = game.state.darkTheme ? 'white' : 'black'
                    else ctx.fillStyle = wallColor

                    if (game.state.lowMode) ctx.fillRect(x, y, tileSize, tileSize)
                    else {
                        if (map[lineY][lineX-1]?.type != 1) ctx.fillRect(x, y, wallLineSize, tileSize)
                        if (map[lineY][lineX+1]?.type != 1) ctx.fillRect(x+tileSize-wallLineSize, y, wallLineSize, tileSize)
                        if (!map[lineY-1] || map[lineY-1][lineX]?.type != 1) ctx.fillRect(x, y, tileSize, wallLineSize)
                        if (!map[lineY+1] || map[lineY+1][lineX]?.type != 1) ctx.fillRect(x, y+tileSize-wallLineSize, tileSize, wallLineSize)
                    }
                    break
                case 2:
                    if (game.state.animations.specialDots.frame) ctx.fillStyle = game.state.gameGlitched || game.state.rainbowMode ? randomColor() : game.state.darkTheme ? '#ffb897' : 'rgb(50, 50, 50)'
                    else ctx.fillStyle = 'transparent'

                    if (game.state.lowMode) ctx.fillRect(x+(tileSize*0.25), y+(tileSize*0.25), tileSize*0.50, tileSize*0.50)
                    else {
                        ctx.beginPath();
                        ctx.arc(x+(tileSize/2), y+(tileSize/2), game.state.gameGlitched ? Math.floor(Math.random()*10+5) : 15, 0, 2 * Math.PI)
                        ctx.fill();
                    }
                    break
                case 3:
                    /*ctx.fillStyle = '#fff'
                    ctx.font = `${tileSize/2}px Arial`
                    ctx.fillText(map[lineY][lineX].distance || 0, x+tileSize/2-(ctx.measureText(map[lineY][lineX].distance || 0).width/2), y+tileSize/1.5)
                    /*ctx.fillStyle = 'transparent'
                    ctx.fillRect(x, y, tileSize, tileSize)*/
                    break
                case 9:
                    let pacManImageConfig = game.state.images[`PacMan/${game.state.pacManStyle}/PacMan.png`]
                    let pacManImagePos = pacManImageConfig.animationConfig[game.state.animations.pacMan.frame]
                    let rotate = false
                    let flipY = false
                    let pacManX = x
                    let pacManY = y

                    switch(game.state.pacMan.animDirection) {
                        case 'up':
                            rotate = -90
                            if (game.state.pacMan.dalay > 0) pacManY += game.state.pacMan.dalay
                            break
                        case 'down':
                            rotate = 90
                            if (game.state.pacMan.dalay > 0) pacManY -= game.state.pacMan.dalay
                            break
                        case 'left':
                            flipY = true
                            if (game.state.pacMan.dalay > 0) pacManX += game.state.pacMan.dalay
                            break
                        case 'right':
                            if (game.state.pacMan.dalay > 0) pacManX -= game.state.pacMan.dalay
                            break
                    }

                    if (game.state.gameGlitched) {
                        rotate = Math.floor(Math.random()*360)
                        pacManY += Math.floor(Math.random()*10)
                        pacManY -= Math.floor(Math.random()*10)
                        pacManX += Math.floor(Math.random()*10)
                        pacManX -= Math.floor(Math.random()*10)
                    }

                    ctx.fillStyle = 'yellow'
                    if (game.state.lowMode) ctx.fillRect(x, y, tileSize, tileSize)
                    else {
                        ctx.save()

                        if (flipY && pacManImageConfig.image) {
                            ctx.scale(-1, 1);
                            ctx.drawImage(pacManImageConfig.image, pacManImagePos.x, pacManImagePos.y, pacManImagePos.width, pacManImagePos.height, (tileSize+pacManX)* -1, pacManY, tileSize, tileSize)
                        } else if (pacManImageConfig.image) {
                            ctx.setTransform(1, 0, 0, 1, pacManX+(tileSize/2), pacManY+(tileSize/2));
                            ctx.rotate(rotate*Math.PI/180);
                            ctx.drawImage(pacManImageConfig.image, pacManImagePos.x, pacManImagePos.y, pacManImagePos.width, pacManImagePos.height, -tileSize/2, -tileSize/2, tileSize, tileSize);
                        }

                        ctx.restore()
                    }
                    break
                default:
                    if (fruitsIds.includes(type)) {
                        let fruitImage = game.state.images[`fruits/${type-20}.png`]?.image

                        try {
                            if (fruitImage) ctx.drawImage(fruitImage, x, y, tileSize, tileSize);
                        } catch {
                            ctx.fillStyle = 'red'
                            ctx.fillRect(x, y, tileSize, tileSize)
                        }
                    } else if (ghostsIds.includes(type)) {
                        let ghost = game.state.ghosts.find(g => g.id == type)

                        let ghostImageConfig = game.state.images[`ghosts/${ghost.color}/Ghost.png`]
                        let ghostImagePos = ghostImageConfig?.animationConfig[ghost.death ? 'eyes' : ghost.scared ? 'scared' : ghost.animDirection][ghost.death ? 0 : !ghost.scared ? game.state.animations.Ghost.frame : game.state.pacManKills-1800 <= +new Date() ? game.state.animations.Ghost.frame : 0]
        
                        let ghostY = y
                        let ghostX = x
        
                        switch(ghost.animDirection) {
                            case 'up':
                                if (ghost.dalay > 0) ghostY += ghost.dalay
                                break
                            case 'down':
                                if (ghost.dalay > 0) ghostY -= ghost.dalay
                                break
                            case 'left':
                                if (ghost.dalay > 0) ghostX += ghost.dalay
                                break
                            case 'right':
                                if (ghost.dalay > 0) ghostX -= ghost.dalay
                                break
                        }
        
                        if (game.state.gameGlitched) {
                            ghostY += Math.floor(Math.random()*10)
                            ghostY -= Math.floor(Math.random()*10)
                            ghostX += Math.floor(Math.random()*10)
                            ghostX -= Math.floor(Math.random()*10)
                        }
        
                        ctx.fillStyle = 'purple'
                        ctx.fillStyle = ghost.scared ? game.state.pacManKills-1800 <= +new Date() ? ghost.animation ? 'blue' : 'cyan' : 'blue' : ghost.color
                        if (game.state.lowMode) ctx.fillRect(x, y, tileSize, tileSize)
                        else if (ghostImageConfig?.image) ctx.drawImage(ghostImageConfig.image, ghostImagePos.x, ghostImagePos.y, ghostImagePos.width, ghostImagePos.height, ghostX, ghostY, tileSize, tileSize);
                    } else {
                        ctx.fillStyle = randomColor()
                        ctx.fillRect(x, y, tileSize, tileSize)
                    }
            }

            if (game.state.morePoints.points && game.state.morePoints.lineX == lineX && game.state.morePoints.lineY == lineY) {
                ctx.fillStyle = 'cyan'
                ctx.font = 'bold 30px game'
                ctx.fillText(game.state.morePoints.points, x+(tileSize/2)-(ctx.measureText(game.state.morePoints.points).width/2), y+35);
                if (game.state.morePoints.time <= +new Date()) game.state.morePoints.points = 0
            }

            x += tileSize
        }
        y += tileSize
        x = 0
    }
}