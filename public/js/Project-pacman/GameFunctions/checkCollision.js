export default (state, checkPacManDeath, addPoints, [ tile, lineY, lineX ]) => {
    let type = tile.type
    let ghostsIds = state.ghosts.map(g => g.id)
    if (ghostsIds.includes(type)) checkPacManDeath([ type, lineY, lineX ])
    
    switch(type) {
        case 0:
            addPoints(10)
            state.playSongEffect('coin.mp3')

            let dotsPercent = state.mapInfo.dots/state.mapInfo.totalDots*100
            if (dotsPercent <= 67 && state.mapInfo.fruit == 0 || dotsPercent <= 34 && state.mapInfo.fruit == 1) {
                state.mapInfo.fruit += 1
                let fruitID = state.level-1
                if (state.level == 3 || state.level == 4) fruitID = 2
                if (state.level == 5 || state.level == 6) fruitID = 3
                if (state.level == 7 || state.level == 8) fruitID = 4
                if (state.level == 9 || state.level == 10) fruitID = 5
                if (state.level == 11 || state.level == 12) fruitID = 6
                if (state.level >= 13) fruitID = 7

                let addFruit = () => {
                    if (state.map[state.mapInfo.fruitPos.y][state.mapInfo.fruitPos.x]?.type == 3) state.map[state.mapInfo.fruitPos.y][state.mapInfo.fruitPos.x].type = 20+fruitID
                    else setTimeout(addFruit, 1000/20)
                }
                addFruit()
            }
            break
        case 2:
            addPoints(150)
            state.pacManKills = +new Date()+4700
            for (let i in state.ghosts) {
                state.ghosts[i].scared = true
            }

            state.playSong('musicSpecial.mp3')

            let interval = setInterval(() => {
                if (state.pacManKills <= +new Date()) {
                    clearInterval(interval)                
                    state.pacManKills = 0
                    state.morePoints.oldPoints = 100
                    for (let i in state.ghosts) {
                        if (!state.scaredAlways && !state.ghosts[i].death) {
                            state.ghosts[i].scared = false
                        }
                    }

                    state.playSong('music2.mp3', { loop: true, volume: 0.3 })
                }
            }, 100)
            break
        case 20:
            morePoints(100)
            state.playSongEffect('fruit.mp3')
            break
        case 21:
            morePoints(300)
            state.playSongEffect('fruit.mp3')
            break
         case 22:
            morePoints(500)
            state.playSongEffect('fruit.mp3')
            break
        case 23:
            morePoints(700)
            state.playSongEffect('fruit.mp3')
            break
        case 24:
            morePoints(1000)
            state.playSongEffect('fruit.mp3')
            break
        case 25:
            morePoints(2000)
            state.playSongEffect('fruit.mp3')
            break
        case 26:
            morePoints(3000)
            state.playSongEffect('fruit.mp3')
            break
        case 27:
            morePoints(5000)
            state.playSongEffect('fruit.mp3')
            break
    }

    function morePoints(points) {
        state.morePoints.points = points
        addPoints(points)

        state.morePoints.time = +new Date()+2500
        state.morePoints.lineX = state.mapInfo.fruitPos.x
        state.morePoints.lineY = state.mapInfo.fruitPos.y
    }
}