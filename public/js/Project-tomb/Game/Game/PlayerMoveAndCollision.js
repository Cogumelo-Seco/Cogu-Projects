export default async(Game, keyInfo) => {
    if (!keyInfo.clicked) return;

    let getAroundTiles = () => {
        let playerX = Game.playerInfo.posX
        let playerY = Game.playerInfo.posY

        return {
            upTileId: Game.currentMap[playerY-1][playerX],
            downTileId: Game.currentMap[playerY+1][playerX],
            leftTileId: Game.currentMap[playerY][playerX-1],
            rightTileId: Game.currentMap[playerY][playerX+1],
            curTileId: Game.currentMap[playerY][playerX]
        }
    }

    let autoMovePlayer = (direction)  => {
        Game.playerInfo.inMovement = true

        if (direction == 'up' && getAroundTiles().upTileId != 2) {
            Game.playerInfo.posY -= 1
            setTimeout(() => autoMovePlayer(direction), 1000/30)
        } else if (direction == 'down' && getAroundTiles().downTileId != 2) {
            Game.playerInfo.posY += 1
            setTimeout(() => autoMovePlayer(direction), 1000/30)
        } else if (direction == 'left' && getAroundTiles().leftTileId != 2) {
            Game.playerInfo.posX -= 1
            setTimeout(() => autoMovePlayer(direction), 1000/30)
        } else if (direction == 'right' && getAroundTiles().rightTileId != 2) {
            Game.playerInfo.posX += 1
            setTimeout(() => autoMovePlayer(direction), 1000/30)
        } else Game.playerInfo.inMovement = false

        if (getAroundTiles().curTileId != 0) {
            let playerX = Game.playerInfo.posX
            let playerY = Game.playerInfo.posY

            if (getAroundTiles().curTileId == 9) Game.PlaySong('specialCube.mp3', { newSong: true, volume: 0.1 })
            if (getAroundTiles().curTileId == 8 || getAroundTiles().curTileId == 7) Game.PlaySong('up+.mp3', { newSong: true, volume: 0.1 })
            Game.currentMap[playerY][playerX] = 0 
        }
    }
    
    if (!Game.playerInfo.inMovement) {
        if (keyInfo.code == 'KeyW') autoMovePlayer('up')
        if (keyInfo.code == 'KeyS') autoMovePlayer('down')
        if (keyInfo.code == 'KeyA') autoMovePlayer('left')
        if (keyInfo.code == 'KeyD') autoMovePlayer('right')
    }
}