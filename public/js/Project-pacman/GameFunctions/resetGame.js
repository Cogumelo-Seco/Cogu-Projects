export default (state, Listener, [ resetAll, gameOver ]) => {
    for (let i in state.ghosts) {
        let ghostId = state.ghosts[i].id
        let lineX = null
        let lineY = null

        for (let y in state.map) {
            if (state.map[y].find(t => t?.type == ghostId)) {
                //state.map[y] = state.map[y].filter(t => Number(t.type) >= 0 && Number(t.type) <= 20)
                lineY = Number(y)
                lineX = state.map[y].indexOf(state.map[y].find(t => t?.type == ghostId))
            }
        }

        if (!state.scaredAlways) state.ghosts[i].scared = false
        state.ghosts[i].speed = state.ghosts[i].defaultSpeed
        state.ghosts[i].death = false
        if (lineX != null && lineY != null) state.map[lineY][lineX].type = state.ghosts[i].oldTile
    }

    let removePacManCount = 0
    let removePacManinterval = setInterval(() => {
        let pacManLineX = null
        let pacManLineY = null
        for (let y in state.map) {
            if (state.map[y].find(t => t?.type == 9)) {
                pacManLineY = Number(y)
                pacManLineX = state.map[y].indexOf(state.map[y].find(t => t?.type == 9))
            }
        }

        if (pacManLineY != null && pacManLineX != null) {
            state.map[pacManLineY][pacManLineX].type = 3
            state.map[16][10].type = 9
            clearInterval(removePacManinterval)
        }
        else {
            removePacManCount += 1
            if (removePacManCount >= 50) clearInterval(removePacManinterval)
        }
    }, 100)

    state.map[9][10].type = 5
    state.map[10][9].type = 8
    state.map[10][10].type = 7
    state.map[10][11].type = 6

    for (let i in state.ghosts) {
        let ghost = state.ghosts[i]
        ghost.animDirection = 'up'
        ghost.death = false
        ghost.locked = 0
        ghost.oldTile = 3
        ghost.dalay = 0
    }

    state.morePoints = {
        oldPoints: 100,
        points: 0,
        time: 0,
        lineX: 0,
        lineY: 0
    }

    if (resetAll) {
        //state.map = JSON.parse(JSON.stringify(state.defaultMap))
        state.start('reset')

        state.lifes = 3
    }

    state.pacMan.animate = false
    state.pacMan.animDirection = 'right'
    Listener.state.direction = 'left'
    Listener.state.oldDirection = 'up'    

    if (!gameOver) {
        state.song.pause()
        state.song = state.sounds['music1.mp3']
        state.song.loop = false
        state.song.volume = 1
        state.song.play()
        state.gameStage = 'initial'

        setTimeout(() => {
            state.gameStage = 'game'
            state.pauseMovement = false

            state.song = state.sounds['music2.mp3']
            state.song.loop = true
            state.song.volume = 0.3
            state.song.play()
        }, 4500)
    }
}