export default async(Render, event) => {
    let map = Render.gameState.currentMap
    let tileSize = 80*Render.gameZoom

    let playerX = Render.gameState.playerInfo.posX
    let playerY = Render.gameState.playerInfo.posY
    let screenAnchorX = Render.canvas.width/2-tileSize/2
    let screenAnchorY = Render.canvas.height/2-tileSize/2

    for (let tileY in map) {
        for (let tileX in map[tileY]) {
            let tileID = map[tileY][tileX]

            let x = screenAnchorX+(tileX-playerX)*tileSize
            let y = screenAnchorY+(tileY-playerY)*tileSize

            switch(tileID) {
                case 9:
                    Render.ctx.fillStyle = 'gold'
                    Render.ctx.fillRect(x+tileSize/2-tileSize/2/6, y+tileSize/2-tileSize/2/6, tileSize/6, tileSize/6)
                    break
                case 8:
                    Render.ctx.fillStyle = 'lime'
                    Render.ctx.fillRect(x+tileSize/2-tileSize/2/4, y+tileSize/2-tileSize/2/4, tileSize/4, tileSize/4)
                    break
                case 7:
                    Render.ctx.fillStyle = 'gold'
                    Render.ctx.fillRect(x+tileSize/2-tileSize/2/2, y+tileSize/2-tileSize/2/2, tileSize/2, tileSize/2)
                    break
                case 1:
                    Render.ctx.fillStyle = 'black'
                    Render.ctx.fillRect(x+tileSize/2-tileSize/2, y+tileSize/2-tileSize/2, tileSize, tileSize)
                    Render.ctx.fillStyle = 'yellow'
                    Render.ctx.fillRect(x+tileSize/2-tileSize/2/1.5, y+tileSize/2-tileSize/2/1.5, tileSize/1.5, tileSize/1.5)
                    Render.ctx.fillStyle = 'black'
                    Render.ctx.fillRect(x+tileSize/2-tileSize/2/2, y+tileSize/2-tileSize/2/2, tileSize/2, tileSize/2)
                    Render.ctx.fillStyle = 'yellow'
                    Render.ctx.fillRect(x+tileSize/2-tileSize/2/4, y+tileSize/2-tileSize/2/4, tileSize/4, tileSize/4)
                    Render.ctx.fillStyle = 'black'
                    Render.ctx.fillRect(x+tileSize/2-tileSize/2/6, y+tileSize/2-tileSize/2/6, tileSize/6, tileSize/6)
                    break
                case 2:
                    Render.ctx.fillStyle = 'magenta'
                    Render.ctx.fillRect(x, y, tileSize, tileSize)
                    break
            }
            
            if (tileX == Render.gameState.playerInfo.posX && tileY == Render.gameState.playerInfo.posY) {
                Render.ctx.fillStyle = 'yellow'
                Render.ctx.fillRect(screenAnchorX, screenAnchorY, tileSize, tileSize)
            }
        }
    }
}