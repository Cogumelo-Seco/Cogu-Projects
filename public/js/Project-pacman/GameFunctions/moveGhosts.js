export default (state, checkPacManDeath) => {
    let blockedPlaces = state.ghosts.map(g => g.id)
    blockedPlaces.push(1)

    function regenerateGhost(i, ghostId) {        
        state.ghosts[i].oldTile = 3
        if (state.ghosts[i].death) return
        if (state.map[10][10].type == 3) {
            state.ghosts[i].locked = 0
            state.map[10][10].type = ghostId
            return true
        }
        if (state.map[10][9].type == 3) {
            state.ghosts[i].locked = 0
            state.map[10][9].type = ghostId
            return true
        }
        if (state.map[10][11].type == 3) {
            state.ghosts[i].locked = 0
            state.map[10][11].type = ghostId
            return true
        }
        if (state.map[9][10].type == 3) {
            state.ghosts[i].locked = 0
            state.map[9][10].type = ghostId
            return true
        }
    }

    for (let i in state.ghosts) {
        let ghostId = state.ghosts[i].id
        let lineX = null
        let lineY = null

        function newDirection(blockedDirection) {
            try {
                let directions = []
        
                if (!blockedPlaces.includes(state.map[lineY-1] ? state.map[lineY-1][lineX]?.type : null) && (state.ghosts[i].scared || blockedDirection != 'up')) directions.push({ tileInfo: state.map[lineY-1][lineX], direction: 'up' })
                if (!blockedPlaces.includes(state.map[lineY+1] ? state.map[lineY+1][lineX]?.type : null) && (state.ghosts[i].scared || blockedDirection != 'down')) directions.push({ tileInfo: state.map[lineY+1][lineX], direction: 'down' })
                if (!blockedPlaces.includes(state.map[lineY] ? state.map[lineY][lineX-1]?.type : null) && (state.ghosts[i].scared || blockedDirection != 'left')) directions.push({ tileInfo: state.map[lineY][lineX-1], direction: 'left' })
                if (!blockedPlaces.includes(state.map[lineY] ? state.map[lineY][lineX+1]?.type : null) && (state.ghosts[i].scared || blockedDirection != 'right')) directions.push({ tileInfo: state.map[lineY][lineX+1], direction: 'right' })
                
                if (state.ghosts[i].death) directions = directions.sort((a, b) => a.tileInfo?.distanceOfCenter-b.tileInfo?.distanceOfCenter)
                else directions = directions.sort((a, b) => a.tileInfo?.distance-b.tileInfo?.distance)

                if (state.ghosts[i].death) return directions[0]?.direction
                else if (state.ghosts[i].scared && Math.floor(Math.random()*100) <= state.ghosts[i].intelligencePercent) return directions[directions.length-1]?.direction
                else if (Math.floor(Math.random()*100) <= state.ghosts[i].intelligencePercent) return directions[0]?.direction
                else return directions[Math.floor(Math.random() * directions.length)]?.direction
            } catch {}
        }

        if (state.ghosts[i].speedCounter <= +new Date()) {
            state.ghosts[i].speedCounter = +new Date()+state.ghosts[i].speed/(1+state.level/10)

            state.ghosts[i].animation = state.ghosts[i].animation ? false : true        

            for (let y in state.map) {
                if (state.map[y].find(t => t?.type == ghostId)) {
                    for (let i = 21; i <= state.map[y].length; i++) delete state.map[y][i]
                    state.map[y] = state.map[y].filter(t => Number(t.type) >= 0 && Number(t.type) <= 20)
                    if (lineX != null || lineY != null) state.map[Number(y)][state.map[y].indexOf(state.map[y].find(t => t?.type == ghostId))].type = 3
                    else {
                        lineY = Number(y)
                        lineX = state.map[y].indexOf(state.map[y].find(t => t?.type == ghostId))
                    }
                }
            }
/*
            for (let y in state.map) {
                if (state.map[y].find(t => t?.type == 9)) {
                    for (let i = 21; i <= state.map[y].length; i++) delete state.map[y][i]
                    if (lineX != null || lineY != null) state.map[Number(y)][state.map[Number(y)].indexOf(state.map[y].find(t => t?.type == 9))].type = 3
                    else {
                        lineY = Number(y)
                        lineX = state.map[y].indexOf(state.map[y].find(t => t?.type == 9))
                    }
                }
            }*/

            if (lineX != null || lineY != null) {
                let direction = state.ghosts[i].direction

                state.ghosts[i].direction = newDirection(
                    direction == 'up' ? 'down' :
                    direction == 'down' ? 'up' :
                    direction == 'left' ? 'right' :
                    direction == 'right' ? 'left' : null
                )
                direction = state.ghosts[i].direction
                state.ghosts[i].direction = direction
                
                if (state.map[lineY][lineX]?.distanceOfCenter <= 2 && state.ghosts[i].death) {
                    state.ghosts[i].death = false
                    state.ghosts[i].dalay = 0
                    if (!state.scaredAlways) {
                        state.ghosts[i].scared = false
                        state.ghosts[i].speed = state.ghosts[i].defaultSpeed
                    }
                }

                if (!direction) {
                    state.ghosts[i].locked += 1
                    if (state.ghosts[i].locked >= 10) {
                        let regenerateGhostVerify = regenerateGhost(i, ghostId)
                        if (regenerateGhostVerify) state.map[lineY][lineX].type = state.ghosts[i].oldTile
                    }
                } else {
                    if (direction == 'left' && lineX <= 0) {
                        state.map[lineY][lineX].type = state.map[lineY][lineX].type = state.ghosts[i].oldTile
                        lineX = 21
                    } else 
                    if (direction == 'right' && lineX >= 20) {
                        state.map[lineY][lineX].type = state.map[lineY][lineX].type = state.ghosts[i].oldTile
                        lineX = -1
                    } else if (direction == 'up' && lineY <= 0) {
                        state.map[lineY][lineX].type = state.map[lineY][lineX].type = state.ghosts[i].oldTile
                        lineY = 22
                    } else if (direction == 'down' && lineY >= 21) {
                        state.map[lineY][lineX].type = state.map[lineY][lineX].type = state.ghosts[i].oldTile
                        lineY = -1
                    } else state.map[lineY][lineX].type = state.ghosts[i].oldTile 

                    state.ghosts[i].dalay = state.canvas.tileSize
                    state.ghosts[i].animDirection = direction    
                    
                    switch(direction) {
                        case 'up':
                            state.ghosts[i].oldTile = isNaN(Number(state.map[lineY-1][lineX].type)) ? state.ghosts[i].oldTile : state.map[lineY-1][lineX].type
                            if (state.map[lineY-1][lineX].type == 9) checkPacManDeath([ ghostId, lineY-1, lineX ])
                            state.map[lineY-1][lineX].type = ghostId
                            break
                        case 'down':
                            state.ghosts[i].oldTile = isNaN(Number(state.map[lineY+1][lineX].type)) ? state.ghosts[i].oldTile : state.map[lineY+1][lineX].type
                            if (state.map[lineY+1][lineX].type == 9) checkPacManDeath([ ghostId, lineY+1, lineX ])
                            state.map[lineY+1][lineX].type = ghostId
                            break
                        case 'left':
                            state.ghosts[i].oldTile = isNaN(Number(state.map[lineY][lineX-1].type)) ? state.ghosts[i].oldTile : state.map[lineY][lineX-1].type
                            if (state.map[lineY][lineX-1].type == 9) checkPacManDeath([ ghostId, lineY, lineX-1 ])
                            state.map[lineY][lineX-1].type = ghostId
                            break
                        case 'right':
                            state.ghosts[i].oldTile = isNaN(Number(state.map[lineY][lineX+1].type)) ? state.ghosts[i].oldTile : state.map[lineY][lineX+1].type
                            if (state.map[lineY][lineX+1].type == 9) checkPacManDeath([ ghostId, lineY, lineX+1 ])
                            state.map[lineY][lineX+1].type = ghostId
                            break
                    }
                }
            } else regenerateGhost(i, ghostId)
        }
    }
}