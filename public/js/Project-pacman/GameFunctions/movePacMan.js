export default (state, checkCollision, command) => {
    let direction = command.direction
    let lineX = null
    let lineY = null

    for (let y in state.map) {
        if (state.map[y].find(t => t?.type == 9)) {
            for (let i = 21; i <= state.map[y].length; i++) delete state.map[y][i]
            if (lineX != null || lineY != null) state.map[Number(y)][state.map[Number(y)].indexOf(state.map[y].find(t => t?.type == 9))].type = 3
            else {
                lineY = Number(y)
                lineX = state.map[y].indexOf(state.map[y].find(t => t?.type == 9))
            }
        }
    }

    if (lineX != null || lineY != null) {
        state.pacMan.withoutPacMan = 0
        state.pacMan.animate = false

        if (direction == 'up' && state.map[lineY-1] ? state.map[lineY-1][lineX]?.type == 1 : null) direction = command.oldDirection
        if (direction == 'down' && state.map[lineY+1] ? state.map[lineY+1][lineX]?.type == 1 : null) direction = command.oldDirection
        if (direction == 'left' && state.map[lineY] ? state.map[lineY][lineX-1]?.type == 1 : null) direction = command.oldDirection
        if (direction == 'right' && state.map[lineY] ? state.map[lineY][lineX+1]?.type == 1 : null) direction = command.oldDirection

        if (direction == 'up' && state.map[lineY-1] ? state.map[lineY-1][lineX]?.type == 1 : null) direction = null
        if (direction == 'down' && state.map[lineY+1] ? state.map[lineY+1][lineX]?.type == 1 : null) direction = null
        if (direction == 'left' && state.map[lineY] ? state.map[lineY][lineX-1]?.type == 1 : null) direction = null
        if (direction == 'right' && state.map[lineY] ? state.map[lineY][lineX+1]?.type == 1 : null) direction = null

        if (!direction) return;

        let notOldTile = state.ghosts.map(g => g.id)
        notOldTile.push(0)
        notOldTile.push(2)

        if (direction == 'left' && lineX <= 0) {
            if (!notOldTile.includes(state.pacMan.oldTile)) state.map[lineY][lineX].type = state.pacMan.oldTile
            else state.map[lineY][lineX].type = 3
            lineX = 21
        } else if (direction == 'right' && lineX >= 20) {
            if (!notOldTile.includes(state.pacMan.oldTile)) state.map[lineY][lineX].type = state.pacMan.oldTile
            else state.map[lineY][lineX].type = 3
            lineX = -1
        } else if (direction == 'up' && lineY <= 0) {
            if (!notOldTile.includes(state.pacMan.oldTile)) state.map[lineY][lineX].type = state.pacMan.oldTile
            else state.map[lineY][lineX].type = 3
            lineY = 22
        } else if (direction == 'down' && lineY >= 21) {
            if (!notOldTile.includes(state.pacMan.oldTile)) state.map[lineY][lineX].type = state.pacMan.oldTile
            else state.map[lineY][lineX].type = 3
            lineY = -1
        } else {
            if (!notOldTile.includes(state.pacMan.oldTile)) state.map[lineY][lineX].type = state.pacMan.oldTile
            else state.map[lineY][lineX].type = 3
        }

        state.pacMan.animate = true
        state.pacMan.animDirection = direction
        state.pacMan.dalay = state.canvas.tileSize

        switch(direction) {
            case 'up':
                state.pacMan.oldTile = isNaN(Number(state.map[lineY-1][lineX]?.type)) ? state.pacMan.oldTile : state.map[lineY-1][lineX]?.type
                checkCollision([ state.map[lineY-1][lineX], lineY-1, lineX ])
                state.map[lineY-1][lineX].type = 9
                break
            case 'down':
                state.pacMan.oldTile = isNaN(Number(state.map[lineY+1][lineX]?.type)) ? state.pacMan.oldTile : state.map[lineY+1][lineX]?.type
                checkCollision([ state.map[lineY+1][lineX], lineY+1, lineX ])
                state.map[lineY+1][lineX].type = 9
                break
            case 'left':
                state.pacMan.oldTile = isNaN(Number(state.map[lineY][lineX-1]?.type)) ? state.pacMan.oldTile : state.map[lineY][lineX-1]?.type
                checkCollision([ state.map[lineY][lineX-1], lineY, lineX-1] )
                state.map[lineY][lineX-1].type = 9
                break
            case 'right':
                state.pacMan.oldTile = isNaN(Number(state.map[lineY][lineX+1]?.type)) ? state.pacMan.oldTile : state.map[lineY][lineX+1]?.type
                checkCollision([ state.map[lineY][lineX+1], lineY, lineX+1 ])
                state.map[lineY][lineX+1].type = 9
                break
        }
    } else {
        state.pacMan.withoutPacMan += 1
        if (state.pacMan.withoutPacMan >= 10) {
            state.pacMan.withoutPacMan = 0
            state.map[16][10].type = 9
        }
    }

    function loopTile(row, column, traceId, lastTileNumber) {
        let tile = state.map[row] ? state.map[row][column] : null
        if (tile && tile.type != 1 && tile.traceId != traceId && !state.gameGlitched) {
            setTimeout(() => {
                state.map[row][column].distance = lastTileNumber+1
                state.map[row][column].traceId = traceId
                if (state.map[row-1] && !isNaN(Number(state.map[row-1][column]?.distance))) loopTile(row-1, column, traceId, state.map[row][column]?.distance)
                if (state.map[row+1] && !isNaN(Number(state.map[row+1][column]?.distance))) loopTile(row+1, column, traceId, state.map[row][column]?.distance)
                if (!isNaN(Number(state.map[row][column-1]?.distance))) loopTile(row, column-1, traceId, state.map[row][column]?.distance)
                if (!isNaN(Number(state.map[row][column+1]?.distance))) loopTile(row, column+1, traceId, state.map[row][column]?.distance)
            })
        }
    }

    state.mapInfo.traceId += 1
    if (!state.gameGlitched) loopTile(lineY, lineX, state.mapInfo.traceId, 0)
    else for (let y in state.map) {
        for (let x in state.map[y]) state.map[y][x].distance = 0
    }
}