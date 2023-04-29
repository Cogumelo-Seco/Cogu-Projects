export default (state, { row, column, event, leftButton }) => {
    let tileInfo = state.mapInfo.data[row] ? state.mapInfo.data[row][column] : null

    if (tileInfo && state.gameInProgress) {
        if (leftButton) {
            if (tileInfo.id == 1) {
                state.gameInProgress = false
                alert(`Você perdeu!\nTempo perdido: ${state.playerTimeString}`)
                for (let row in state.mapInfo.data) {
                    for (let column in state.mapInfo.data[row]) {
                        state.mapInfo.data[row][column].clicked = true
                    }
                }
                state.mapInfo.reload = true
            } else if (!tileInfo.clicked) {
                state.playerMovements += 1
                state.mapInfo.traceId += 1
                function loopTile(row, column, traceId, lastTileNumber) {
                    state.mapInfo.reload = true
                    let tile = state.mapInfo.data[row] ? state.mapInfo.data[row][column] : null
                    if (tile && tile.traceId != traceId) {
                        state.mapInfo.data[row][column].clicked = true
                        state.mapInfo.data[row][column].traceId = traceId
                        setTimeout(() => {
                            if (state.mapInfo.data[row-1] && (state.mapInfo.data[row-1][column]?.number == 0 || lastTileNumber == 0)) loopTile(row-1, column, traceId, state.mapInfo.data[row-1][column]?.number)
                            if (state.mapInfo.data[row+1] && (state.mapInfo.data[row+1][column]?.number == 0 || lastTileNumber == 0)) loopTile(row+1, column, traceId, state.mapInfo.data[row+1][column]?.number)
                            if ((state.mapInfo.data[row][column-1]?.number == 0 || lastTileNumber == 0)) loopTile(row, column-1, traceId, state.mapInfo.data[row][column-1]?.number)
                            if ((state.mapInfo.data[row][column+1]?.number == 0 || lastTileNumber == 0)) loopTile(row, column+1, traceId, state.mapInfo.data[row][column+1]?.number)
                        }, 0)
                    }
                }
                loopTile(row, column, state.mapInfo.traceId, tileInfo.number)
            }
        } else {
            state.playerMovements += 1
            tileInfo.flag = tileInfo.flag ? false : true
            state.mapInfo.reload = true
        }
    }
}