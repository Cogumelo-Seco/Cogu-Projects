function createGame(Listener) {
    const state = {
        fps: '0-0',
        lifes: 2,
        highScore: 0,
        score: 0,
        gameStage: 'loading',
        pacManStyle: 'default',
        pacManKills: 0,
        gameGlitched: false,
        gameGlitchedStage: 1,
        pauseMovement: true,
        darkTheme: true,
        rainbowMode: false,
        rainbowColor: 0,
        lowMode: false,
        gameLoopFPSControlTime: 0,
        images: [],
        sounds: [],
        loading: {
            loaded: 0,
            total: 0,
            msg: 'Loading...'
        },
        canvas: {
            width: 1050,
            height: 1100,
            tileSize: 50
        },
        morePoints: {
            oldPoints: 100,
            points: 0,
            time: 0,
            lineX: 0,
            lineY: 0
        },
        animations: {
            pacMan: {
                frame: 0,
                startFrame: 0,
                endFrame: 3,
                totalDalay: 80,
                dalay: 0,
                loop: true
            },
            Ghost: {
                frame: 0,
                startFrame: 0,
                endFrame: 1,
                totalDalay: 250,
                dalay: 0,
                loop: true
            },
            menuAnimation: {
                frame: 0,
                startFrame: 0,
                endFrame: Infinity,
                totalDalay: 0,
                dalay: 0
            },
            specialDots: {
                frame: 0,
                startFrame: 0,
                endFrame: 1,
                totalDalay: 170,
                dalay: 0,
                loop: true,
            },
            walls: {
                frame: 0,
                startFrame: 0,
                endFrame: 1,
                totalDalay: 200,
                dalay: 0,
                loop: true,
            }
        },
        pacMan: {
            defaultPacManSpeed: 185,
            pacManSpeed: 185,
            pacManSpeedCounter: 0,
            withoutPacMan: 0,
            oldTile: 3,
            dalay: 0
        },
        ghosts: [
            {
                color: 'red',
                animDirection: 'up',
                activeAnimation: true,
                scared: false,
                placeOfDeath: {
                    x: 0,
                    y: 0
                },
                defaultSpeed: 175,
                speed: 175,
                speedCounter: 0,
                death: false,
                locked: 0,
                oldTile: 3,
                dalay: 0,
                intelligencePercent: 95,
                id: 5
            },
            {
                color: 'pink',
                animDirection: 'up',
                activeAnimation: true,
                scared: false,
                placeOfDeath: {
                    x: 0,
                    y: 0
                },
                defaultSpeed: 180,
                speed: 180,
                speedCounter: 0,
                death: false,
                locked: 0,
                oldTile: 3,
                dalay: 0,
                intelligencePercent: 25,
                id: 6
            },
            {
                color: 'orange',
                animDirection: 'up',
                activeAnimation: true,
                scared: false,
                placeOfDeath: {
                    x: 0,
                    y: 0
                },
                defaultSpeed: 190,
                speed: 190,
                speedCounter: 0,
                death: false,
                locked: 0,
                oldTile: 3,
                dalay: 0,
                intelligencePercent: 75,
                id: 7
            },
            {
                color: 'cyan',
                animDirection: 'up',
                activeAnimation: true,
                scared: false,
                placeOfDeath: {
                    x: 0,
                    y: 0
                },
                defaultSpeed: 180,
                speed: 180,
                speedCounter: 0,
                death: false,
                locked: 0,
                oldTile: 3,
                dalay: 0,
                intelligencePercent: 50,
                id: 8
            }
        ],
        defaultMap: [
            [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ],
            [ 1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1 ],
            [ 1,2,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,2,1 ],
            [ 1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1 ],
            [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1 ],
            [ 1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1 ],
            [ 1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1 ],
            [ 1,1,1,1,1,0,1,1,1,3,1,3,1,1,1,0,1,1,1,1,1 ],
            [ 3,3,3,3,1,0,1,3,3,3,3,3,3,3,1,0,1,3,3,3,3 ],
            [ 1,1,1,1,1,0,1,3,1,1,5,1,1,3,1,0,1,1,1,1,1 ],
            [ 3,3,3,3,3,0,3,3,1,8,7,6,1,3,3,0,3,3,3,3,3 ],
            //[ 3,3,3,3,3,0,3,3,1,0,0,0,1,3,3,0,3,3,3,3,3 ],
            [ 1,1,1,1,1,0,1,3,1,1,1,1,1,3,1,0,1,1,1,1,1 ],
            [ 3,3,3,3,1,0,1,3,3,3,3,3,3,3,1,0,1,3,3,3,3 ],
            [ 1,1,1,1,1,0,1,3,1,1,1,1,1,3,1,0,1,1,1,1,1 ],
            [ 1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1 ],
            [ 1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1 ],
            [ 1,2,0,0,1,0,0,0,0,0,9,0,0,0,0,0,1,0,0,2,1 ],
            [ 1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1 ],
            [ 1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1 ],
            [ 1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1 ],
            [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1 ],
            [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ],
        ],
        map: [],
        mapInfo: {
            traceId: 0,
            traceCenterId: 0
        }
    }

    const addImages = (command) => require('./GameFunctions/addImages').default(state)
    const addSounds = (command) => require('./GameFunctions/addSounds').default(state)

    const playSongEffect = (type, command) => require('./GameFunctions/playSongEffect').default(type, command, state)
    const playSong = (type, command) => require('./GameFunctions/playSong').default(type, command, state)
    state.playSongEffect = playSongEffect
    state.playSong = playSong

    const addGhost = (command) => require('./GameFunctions/addGhost').default(state, Listener, command)
    const resetGame = (command) => require('./GameFunctions/resetGame').default(state, Listener, command)
    const checkPacManDeath = (command) => require('./GameFunctions/checkPacManDeath').default(state, addPoints, resetGame, command)
    const movePacMan = (command) => require('./GameFunctions/movePacMan').default(state, checkCollision, command)
    const moveGhosts = () => require('./GameFunctions/moveGhosts').default(state, checkPacManDeath)
    const checkCollision = (command) => require('./GameFunctions/checkCollision').default(state, checkPacManDeath, addPoints, command)
    const codes = require('./GameFunctions/codes').default(state, checkPacManDeath, addGhost)
    state.Listener = Listener
    state.start = start

    async function start(command) {
        if (command == 'reset') {
            let defaultMapData = JSON.parse(JSON.stringify(state.defaultMap))
            state.map = []
            for (let i in defaultMapData) {
                state.map.push([])
                for (let a in defaultMapData[i]) {
                    state.map[i].push({ type: defaultMapData[i][a], distance: 0, distanceOfCenter: 0 })
                }
            }

            function loopTile(row, column, traceCenterId, lastTileNumber) {
                let tile = state.map[row] ? state.map[row][column] : null
                if (tile && tile.type != 1 && tile.traceCenterId != traceCenterId) {
                    setTimeout(() => {
                        state.map[row][column].distanceOfCenter = lastTileNumber+1
                        state.map[row][column].traceCenterId = traceCenterId
                        if (state.map[row-1] && !isNaN(Number(state.map[row-1][column]?.distanceOfCenter))) loopTile(row-1, column, traceCenterId, state.map[row][column]?.distanceOfCenter)
                        if (state.map[row+1] && !isNaN(Number(state.map[row+1][column]?.distanceOfCenter))) loopTile(row+1, column, traceCenterId, state.map[row][column]?.distanceOfCenter)
                        if (!isNaN(Number(state.map[row][column-1]?.distanceOfCenter))) loopTile(row, column-1, traceCenterId, state.map[row][column]?.distanceOfCenter)
                        if (!isNaN(Number(state.map[row][column+1]?.distanceOfCenter))) loopTile(row, column+1, traceCenterId, state.map[row][column]?.distanceOfCenter)
                    })
                }
            }
        
            state.mapInfo.traceCenterId += 1
            loopTile(10, 10, state.mapInfo.traceCenterId, 0)
        }

        if (command?.startGame) {
            state.gameStage = 'game'
            state.pauseMovement = false

            playSong('music2.mp3', { loop: true, volume: 0.3 })
        }
    }

    function gameLoop() {
        let dots = 0
        for (let y in state.map) {
            for (let x in state.map[y]) {
                if (state.map[y][x].type == 0 || state.map[y][x].type == 2) dots += 1
            }
        }
        dots += state.ghosts.filter(g => g.oldMap == 0).length

        if (dots <= 0 && state.gameStage != 'levelWon') {
            state.song?.pause()
            state.pauseMovement = true
            state.gameStage = 'levelWon'
            setTimeout(() => resetGame([ true ]), 4000)                
        }
        
        if (!state.pauseMovement && state.gameStage != 'pause') {
            if (state.pacMan.pacManSpeedCounter <= +new Date()) {
                state.pacMan.pacManSpeedCounter = +new Date()+state.pacMan.pacManSpeed
                movePacMan({
                    Listener: Listener,
                    direction: Listener.state.direction,
                    oldDirection: Listener.state.oldDirection
                })
            }
            moveGhosts()
        }

        for (let i in codes) {
            if (Listener.state.codeText.toLowerCase().includes(i)) {
                let codeMessage = document.getElementById('codeMessage')                    
                Listener.state.codeText = ''
                let code = codes[i]()
                let time = 0
                if (code != undefined) {
                    if (code == true) codeMessage.innerText = 'Cheat activated'
                    if (code == false) codeMessage.innerText = 'Cheat disabled'
                    if (typeof code == 'string') codeMessage.innerText = code
                    codeMessage.style.display = 'block'
                    time = codeMessage.innerText.length*200
                    if (state.codesTimeout) clearTimeout(state.codesTimeout)
                    state.codesTimeout = setTimeout(() => codeMessage.style.display = 'none', time)
                }
            }
        }

        if (Listener.state.keys.escape && state.gameStage == 'game') {
            state.gameStage = 'pause'
            state.song.pause()
            state.scaredPauseTime = state.pacManKills-+new Date()
            Listener.state.keys.escape = false
        } else if (Listener.state.keys.escape && state.gameStage == 'pause') {
            state.gameStage = 'game'
            state.song.play()
            state.pacManKills = +new Date()+state.scaredPauseTime
            Listener.state.keys.escape = false
        } else if (state.gameStage == 'pause') state.pacManKills += 1000

        if (state.gameGlitched && state.gameStage != 'pause' && state.gameStage != 'home') {
            let percent = Math.floor(Math.random()*100)
            if (percent >= 100-state.gameGlitchedStage) {
                let x = Math.floor(Math.random()*state.map.length)
                let y = Math.floor(Math.random()*state.map[x].length)
                state.map[x][y] = Math.floor(Math.random()*20)
                state.gameGlitchedStage += 0.15
            }
        }

        if (state.gameLoopFPSControlTime+25 <= +new Date()) {
            state.gameLoopFPSControlTime = +new Date()

            for (let ghost of state.ghosts) {
                if (ghost.dalay > 0) ghost.dalay -= state.canvas.tileSize/ghost.speed*(state.canvas.tileSize/2-2)
            }
            if (state.pacMan.dalay > 0) state.pacMan.dalay -= state.canvas.tileSize/(state.pacMan.pacManSpeed)*(state.canvas.tileSize/2-2)

            for (let i in state.animations) {
                let animation = state.animations[i]

                if (animation.dalay <= +new Date() && !animation.paused) {
                    animation.frame += animation.boomerang ? animation.boomerangForward ? 1 : -1 : 1
                    if (animation.frame > animation.endFrame) {
                        if (!animation.boomerang) animation.frame = animation.loop ? animation.startFrame : animation.endFrame
                        else animation.boomerangForward = animation.boomerangForward ? false : true
                    } else if (animation.frame < animation.startFrame) {
                        animation.boomerangForward = animation.boomerangForward ? false : true
                        animation.frame = animation.startFrame
                    }
                    animation.dalay = +new Date()+animation.totalDalay
                }
            }

            state.rainbowColor += 1
        }
    }

    async function loading(command) {
        let loadingImagesTotal = await addImages()
        let loadingSoundsTotal = await addSounds()
        state.loading.total = loadingImagesTotal
        state.loading.total += loadingSoundsTotal

        let toLoad = state.images.concat(state.sounds)

        const newLoad = (msg) => {
            state.loading.loaded += 1
            state.loading.msg = `(${state.loading.loaded}/${state.loading.total}) - ${msg}`

            if (state.loading.loaded >= state.loading.total) completeLoading()
            else load(toLoad[state.loading.loaded])
        }

        const completeLoading = () => {
            state.loading.msg = `(${state.loading.loaded}/${state.loading.total}) 100% - Complete loading`
            setTimeout(() => state.gameStage = 'home', 1000)
        }

        const load = async ({ dir, animationConfigDir}) => {
            let loaded = false

            setTimeout(() => {
                if (!loaded) newLoad('[ERROR File failed to load] '+dir)
            }, 10000)

            if ([ 'ogg', 'mp3' ].includes(dir.split('.')[dir.split('.').length-1])) {
                let sound = new Audio()
                sound.addEventListener('loadeddata', (e) => {
                    loaded = true
                    newLoad(dir)
                })
                sound.addEventListener('error', (e) => newLoad('[ERROR] '+dir))
                sound.src = `/sounds/pac-man/${dir}`
                state.sounds[dir] = sound
            } else {
                let animationConfig = animationConfigDir ? JSON.parse(JSON.stringify(require('../../imgs/pac-man/'+animationConfigDir))) : null

                let img = new Image()
                img.addEventListener('load', (e) => {
                    loaded = true
                    newLoad(dir)
                })
                img.addEventListener('error',(e) => newLoad('[ERROR] '+dir))
                img.src = `/imgs/pac-man/${dir}`
                img.id = dir
                state.images[dir] = {
                    image: img,
                    animationConfig
                }
            }
        }

        load(toLoad[0])
    }

    function addPoints(points) {
        let maxScore = 1000000000000000
        if (state.score < maxScore) state.score += points
        else state.score = maxScore
        if (state.highScore < maxScore && state.score >= state.highScore) state.highScore = state.score
        else if (state.highScore > maxScore) state.highScore = maxScore
    }
    
    return {
        gameLoop,
        start,
        loading,
		movePacMan,
        playSongEffect,
        playSong,
        state
    }
}

export default createGame