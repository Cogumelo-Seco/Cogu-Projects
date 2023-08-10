export default (state, addPoints, resetGame, [ ghostId, lineY, lineX ]) => {
    let ghost = state.ghosts.find(g => g.id == ghostId)

    if (ghostId != true && ghost.scared) {
        if (!ghost.death) {
            state.pauseMovement = true

            state.morePoints.points = Math.floor(state.morePoints.oldPoints < 10000 ? state.morePoints.oldPoints*2 : state.morePoints.oldPoints)
            state.morePoints.oldPoints = state.morePoints.points
            addPoints(state.morePoints.points)

            state.morePoints.time = +new Date()+2500
            state.morePoints.lineX = lineX
            state.morePoints.lineY = lineY

            setTimeout(() => state.pauseMovement = false, 1000)
            state.pacManKills += 1000

            state.playSong('deathGhost.mp3')
            
            if (state.playeMusic2Timeout) clearTimeout(state.playeMusic2Timeout)
            state.playeMusic2Timeout = setTimeout(() => {
                if (state.gameStage == 'game') {
                    state.playSong('music2.mp3', { loop: true, volume: 0.3 })
                }
            }, 5000)
        }

        let ghostLineY = null
        let ghostLineX = null
        for (let y in state.map) {
            if (state.map[y].find(t => t?.type == ghostId)) {
                ghostLineY = Number(y)
                ghostLineX = state.map[y].indexOf(state.map[y].find(t => t?.type == ghostId))
            }
        }

        if (ghost) {
            ghost.speed = ghost.defaultSpeed/2
            ghost.death = true
            let addGhost = () => {
                if ([ 0, 2, 3 ].includes(state.map[ghostLineY] ? state.map[ghostLineY][ghostLineX]?.type : null)) state.map[ghostLineY][ghostLineX].type = ghostId
                else setTimeout(addGhost, 1000/20)
            }
            addGhost()
        }
    } else {
        state.pauseMovement = true

        state.playSong('death.mp3')

        state.pacMan.animate = false
        state.lifes -= 1
        state.gameStage = 'pacManDeath'
        
        if (state.lifes > -1) {
            setTimeout(() => resetGame([]), 2000)
        } else {
            state.gameStage = 'gameOver'
            setTimeout(() => {
                state.song.pause()
                state.pauseMovement = true
                state.gameStage = 'home'
                state.highScore = 0
                state.level = 1
                state.gameGlitchedStage = 1
                resetGame([ true, true ])

                document.getElementById('score').style.display = 'none'
                document.getElementById('highScoreTitle').style.display = 'none'
                document.getElementById('highScore').style.display = 'none'
                document.getElementById('level').style.display = 'none'
            }, 5000)
        }
    }
}