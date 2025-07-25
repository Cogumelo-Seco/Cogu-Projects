export default function codesFunction(state, checkPacManDeath, addGhost) {
    return {
        wide: function () {
            state.canvas.tileSizeW = state.canvas.tileSizeW == state.canvas.tileSize*2 ? state.canvas.tileSize : state.canvas.tileSize*2;
            return state.canvas.tileSizeW == state.canvas.tileSize*2 ? true : false;
        },
        bocchi: function () {
            state.pacManStyle = state.pacManStyle == 'seika' ? 'default' : 'seika'
            state.ghosts[0].color = state.ghosts[0].color == 'red' ? 'kita' : 'red'
            state.ghosts[1].color = state.ghosts[1].color == 'pink' ? 'bocchi' : 'pink'
            state.ghosts[2].color = state.ghosts[2].color == 'orange' ? 'nijika' : 'orange'
            state.ghosts[3].color = state.ghosts[3].color == 'cyan' ? 'ryo' : 'cyan'
            state.wallColor = state.wallColor == '#141484' ? '#F269BE' : '#141484'
            state.defaultSound = state.defaultSound == 'bocchi.mp3' ? 'music2.mp3' : 'bocchi.mp3'
            if (state.gameStage == 'game') {
                state.song.pause()
                state.song = state.sounds[state.defaultSound]
                state.song.loop = true
                state.song.volume = 0.3
                state.song.play()
            }
            return state.pacManStyle == 'seika' ? true : false
        },
        cj: function () {
            state.pacManStyle = state.pacManStyle == 'cj' ? 'default' : 'cj'
            return state.pacManStyle == 'cj' ? true : false
        },
        mario: function () {
            state.pacManStyle = state.pacManStyle == 'mario' ? 'default' : 'mario'
            return state.pacManStyle == 'mario' ? true : false
        },
        guto: function () {
            state.pacManStyle = state.pacManStyle == 'guto' ? 'default' : 'guto'
            return state.pacManStyle == 'guto' ? true : false
        },
        frog: function () {            
            if (!state.ghosts.find(g => g.color == 'frog')) addGhost([ 'frog', 14, false, 170, 50 ])
            else return
            return true
        },        
        applecat: function () {
            if (!state.ghosts.find(g => g.color == 'apple-cat')) addGhost([ 'apple-cat', 15, true, 160, 100 ])
            else return 
            return true
        },
        cogu: function () {
            if (!state.ghosts.find(g => g.color == 'cogu')) addGhost([ 'cogu', 16, false, 140, 0 ])
            else return 
            return true
        },
        gspeed: function () {
            if (state.ghosts[0].speed == 100) {
                for (let ghost of state.ghosts) {
                    ghost.speed = ghost.defaultSpeed
                }
                return false
            } else {
                for (let ghost of state.ghosts) {
                    ghost.speed = 100
                }
                return true
            }
        },        
        speed: function () {
            if (state.pacMan.pacManSpeed == 100) {
                state.pacMan.pacManSpeed = state.pacMan.defaultPacManSpeed
                return false
            } else {
                state.pacMan.pacManSpeed = 100
                return true
            }
        },
        scared: function () {
            if (state.scaredAlways) {
                for (let i in state.ghosts) {
                    state.scaredAlways = false
                    state.ghosts[i].scared = false
                    state.ghosts[i].speed = state.ghosts[i].defaultSpeed
                }
                return false
            } else {
                for (let i in state.ghosts) {
                    state.scaredAlways = true
                    state.ghosts[i].scared = true
                    state.ghosts[i].speed = 400
                }
                return true
            }
        },
        win: function () {
            if (state.gameStage != 'game') return
            for (let y in state.map) {
                for (let x in state.map[y]) {
                    if (state.map[y][x].type == 0 || state.map[y][x].type == 2) state.map[y][x].type  = 3
                }
            }
            for (let ghost of state.ghosts) ghost.oldTile = 3
            return true
        },
        kill: function () {
            if (state.gameStage != 'game') return
            checkPacManDeath([ true ])
            return true
        },
        glitch: function () {
            state.gameGlitched = state.gameGlitched ? false : true
            return state.gameGlitched
        },
        lighttheme: function () {
            state.darkTheme = state.darkTheme ? false : true
            return state.darkTheme ? false : true
        },
        rainbow: function () {
            state.rainbowMode = state.rainbowMode ? false : true
            return state.rainbowMode ? true : false
        },
        lowmode: function () {
            state.lowMode = state.lowMode ? false : true
            return state.lowMode ? true : false
        },
        life: function () {
            let add = state.lifes >= 10 ? false : true
            if (add) state.lifes += 2
            return add
        },
        codes: function () {
            let codesText = ''
            let codesList = codesFunction()
            for (let i in codesList) codesText += `${i}\n`
            console.log(codesText)

            return 'Codes are in the console (F12)'
        }
    }
}