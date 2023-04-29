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
                function loopTile(row, column, traceId) {
                    state.mapInfo.reload = true
                    let tile = state.mapInfo.data[row] ? state.mapInfo.data[row][column] : null
                    if (tile && tile.traceId != traceId) {
                        state.mapInfo.data[row][column].clicked = true
                        state.mapInfo.data[row][column].traceId = traceId
                        setTimeout(() => {
                            if (state.mapInfo.data[row-1] && state.mapInfo.data[row-1][column]?.number-1 <= tile.number) loopTile(row-1, column, traceId)
                            if (state.mapInfo.data[row+1] && state.mapInfo.data[row+1][column]?.number-1 <= tile.number) loopTile(row+1, column)
                            if (state.mapInfo.data[row][column-1]?.number-1 <= tile.number) loopTile(row, column-1)
                            if (state.mapInfo.data[row][column+1]?.number-1 <= tile.number) loopTile(row, column+1)
                        }, 0)
                    }
                }
                loopTile(row, column, state.mapInfo.traceId)
            }
        } else {
            state.playerMovements += 1
            tileInfo.flag = tileInfo.flag ? false : true
            state.mapInfo.reload = true
        }
    }
}