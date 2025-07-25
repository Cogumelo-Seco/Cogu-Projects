export default async (canvas, game, Listener, randomColor) => {
    const ctx = canvas.getContext('2d')

    let glitchedPercent = Math.floor(Math.random()*100)
    let ghostsIds = game.state.ghosts.map(g => g.id)
    let fruitsIds = [ 20, 21, 22, 23, 24, 25, 26, 27 ]
    let tileSizeW = game.state.canvas.tileSizeW
    let tileSizeH = game.state.canvas.tileSizeH
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
                    ctx.fillStyle = game.state.gameGlitched || game.state.rainbowMode || game.state.pacManStyle == 'seika' ? randomColor() : game.state.darkTheme ? '#ffb897' : 'rgb(50, 50, 50)'

                    if (game.state.lowMode) ctx.fillRect(x+(tileSizeW*0.37), y+(tileSizeH*0.37), tileSizeW*0.25, tileSizeH*0.25)
                    else {
                        ctx.beginPath();
                        ctx.arc(x+(tileSizeW/2), y+(tileSizeH/2), game.state.gameGlitched ? Math.floor(Math.random()*6) : 5, 0, 2 * Math.PI)
                        ctx.fill();
                    }
                    /*ctx.fillStyle = '#fff'
                    ctx.font = `${tileSize/2}px Arial`
                    ctx.fillText(map[lineY][lineX].distance || 0, x+tileSize/2-(ctx.measureText(map[lineY][lineX].distance || 0).width/2), y+tileSize/1.5)*/
                    break
                case 1:
                    let wallLineSize = game.state.gameGlitched ? Math.floor(Math.random()*3)+4 : 6
                    let wallColor = game.state.gameGlitched && glitchedPercent > 80 ? randomColor() : game.state.rainbowMode ? `hsl(${game.state.rainbowColor}, 100%, 40%)` : game.state.wallColor

                    if (game.state.animations.walls.frame && game.state.gameStage == 'levelWon') ctx.fillStyle = game.state.darkTheme ? 'white' : 'black'
                    else ctx.fillStyle = wallColor

                    if (game.state.lowMode) ctx.fillRect(x, y, tileSizeW, tileSizeH)
                    else {
                        if (map[lineY][lineX-1]?.type != 1) ctx.fillRect(x, y, wallLineSize, tileSizeH)
                        if (map[lineY][lineX+1]?.type != 1) ctx.fillRect(x+tileSizeW-wallLineSize, y, wallLineSize, tileSizeH)
                        if (!map[lineY-1] || map[lineY-1][lineX]?.type != 1) ctx.fillRect(x, y, tileSizeW, wallLineSize)
                        if (!map[lineY+1] || map[lineY+1][lineX]?.type != 1) ctx.fillRect(x, y+tileSizeH-wallLineSize, tileSizeW, wallLineSize)
                    }
                    break
                case 2:
                    if (game.state.animations.specialDots.frame) ctx.fillStyle = game.state.gameGlitched || game.state.rainbowMode || game.state.pacManStyle == 'seika' ? randomColor() : game.state.darkTheme ? '#ffb897' : 'rgb(50, 50, 50)'
                    else ctx.fillStyle = 'transparent'

                    if (game.state.lowMode) ctx.fillRect(x+(tileSizeW*0.25), y+(tileSizeH*0.25), tileSizeW*0.50, tileSizeH*0.50)
                    else {
                        ctx.beginPath();
                        ctx.arc(x+(tileSizeW/2), y+(tileSizeH/2), game.state.gameGlitched ? Math.floor(Math.random()*10+5) : 15, 0, 2 * Math.PI)
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
                case 4:
                    ctx.fillStyle = '#ffceff'
                    ctx.fillRect(x, y+(tileSizeW/2)-(tileSizeH/8/2), tileSizeW, tileSizeH/8)
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
                    if (game.state.lowMode) ctx.fillRect(x, y, tileSizeW, tileSizeH)
                    else {
                        ctx.save()

                        if (flipY && pacManImageConfig.image) {
                            ctx.scale(-1, 1);
                            ctx.drawImage(pacManImageConfig.image, pacManImagePos.x, pacManImagePos.y, pacManImagePos.width, pacManImagePos.height, (tileSizeW+pacManX)* -1, pacManY, tileSizeW, tileSizeH)
                        } else if (pacManImageConfig.image) {
                            ctx.setTransform(1, 0, 0, 1, pacManX+(tileSizeW/2), pacManY+(tileSizeH/2));
                            ctx.rotate(rotate*Math.PI/180);
                            ctx.drawImage(pacManImageConfig.image, pacManImagePos.x, pacManImagePos.y, pacManImagePos.width, pacManImagePos.height, -tileSizeW/2, -tileSizeH/2, tileSizeW, tileSizeH);
                        }

                        ctx.restore()
                    }
                    break
                default:
                    if (fruitsIds.includes(type)) {
                        let fruitImage = game.state.images[`Fruits/${type-20}.png`]?.image

                        ctx.fillStyle = '#AA2255'
                        if (game.state.lowMode) ctx.fillRect(x, y, tileSizeW, tileSizeH)
                        else if (fruitImage) ctx.drawImage(fruitImage, x, y, tileSizeW, tileSizeH);
                    } else if (ghostsIds.includes(type)) {
                        let ghost = game.state.ghosts.find(g => g.id == type)

                        let ghostImageConfig = game.state.images[`Ghosts/${ghost.color}/Ghost.png`]
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
                        if (game.state.lowMode) ctx.fillRect(x, y, tileSizeW, tileSizeH)
                        else if (ghostImageConfig?.image) ctx.drawImage(ghostImageConfig.image, ghostImagePos.x, ghostImagePos.y, ghostImagePos.width, ghostImagePos.height, ghostX, ghostY, tileSizeW, tileSizeH);
                    } else {
                        let randomImageData = game.state.images[game.state.images[Math.floor(Math.random()*game.state.images.length)]?.dir]
                   
                        if (randomImageData?.animationConfig) {
                            let randomImagePos = randomImageData.animationConfig[Object.keys(randomImageData.animationConfig)[Math.floor(Math.random()*Object.keys(randomImageData.animationConfig).length)]]  

                            ctx.drawImage(randomImageData.image, randomImagePos.x, randomImagePos.y, randomImagePos.width, randomImagePos.height, x, y, tileSizeW, tileSizeH);
                        } else if (randomImageData?.image) ctx.drawImage(randomImageData.image, x, y, tileSizeW, tileSizeH);
                        //ctx.fillStyle = randomColor()
                        //ctx.fillRect(x, y, tileSize, tileSize)
                    }
            }

            if (game.state.morePoints.points && game.state.morePoints.lineX == lineX && game.state.morePoints.lineY == lineY) {
                ctx.fillStyle = 'cyan'
                ctx.font = 'bold 30px game'
                ctx.fillText(game.state.morePoints.points, x+(tileSizeW/2)-(ctx.measureText(game.state.morePoints.points).width/2), y+35);
                if (game.state.morePoints.time <= +new Date()) game.state.morePoints.points = 0
            }

            x += tileSizeW
        }
        y += tileSizeH
        x = 0
    }
}