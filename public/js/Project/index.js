function create(Listener, canvas,) {
    const state = {
        debug: false,
        fps: '0-0',
        loading: {
            loaded: 0,
            total: 0,
            msg: 'Loading...'
        },
        LoopFPSControlTime: 0,
        rainbowColor: 0,

        mapInfo: {
            maped: 0,
            points: 0,
            render: true,
            renderId: 1,
            width: 20,
            height: 20,
            distance: 0,
            mapData: {
                0: { 10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 } },
                1: { 10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 } },
                //2: { 10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 } },
                3: { 10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 } },
                4: { 10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 } },
                5: { 
                    0: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    1: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    2: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    3: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    4: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    5: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    6: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    7: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    8: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    9: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    //11: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    12: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    13: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    14: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 }, 
                    15: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    16: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    17: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    18: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    19: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 }
                },
                6: { 10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 } },
                //7: { 10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 } },
                8: { 10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 } },
                9: { 10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 } },
                10: { 
                    0: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    1: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    2: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    //3: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    4: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    5: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    6: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    7: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    8: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    9: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    11: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    12: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    13: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    14: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 }, 
                    15: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    16: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    //17: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    18: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    19: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 }
                },
                11: { 5: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 }, 10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 } },
                12: { 5: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 } },
                13: { 5: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 }, 10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 } },
                14: { 5: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 }, 10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 } },
                15: { 
                    0: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    1: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    //2: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    3: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    4: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    5: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    6: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    //7: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    8: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    9: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    //11: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    12: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    13: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    14: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 }, 
                    15: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    16: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    17: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    18: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 },
                    19: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 }
                },
                16: { 10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 } },
                17: { 10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 } },
                18: { 10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 } },
                19: { 10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 } },
            },
            endObject: {
                X: 3,//Math.floor(Math.random()*19),
                Y: 3//Math.floor(Math.random()*19)
            },
            startObject: {
                X: 18,//Math.floor(Math.random()*19),
                Y: 18//Math.floor(Math.random()*19)
            },
            currentMapedObject: null
        }
    }

    const addImages = (command) => require('./Functions/addImages').default(state)
    const addSounds = (command) => require('./Functions/addSounds').default(state)

    const playSong = (type, command) => require('./Functions/playSong').default(type, command, state)
    const smallFunctions = require('./Functions/smallFunctions').default(state, Listener)
    const codes = require('./Functions/codes').default(state)
    state.smallFunctions = smallFunctions
    state.playSong = playSong
    state.canvas = canvas

    async function Loop(command) {
        document.title = `Cogu`

        for (let y = 0;y < state.mapInfo.height;y++) {
            if (state.mapInfo.mapData[y] == undefined) state.mapInfo.mapData[y] = []
            for (let x = 0;x < state.mapInfo.width;x++) {
                if (!state.mapInfo.mapData[y][x]) state.mapInfo.mapData[y][x] = { distanceValue: NaN, type: 'air', X: x, Y: y, renderId: 0 }
            }
        }

        /* !!!!!!! FPS LIMITADO !!!!!!! */

        if (state.LoopFPSControlTime+50 <= +new Date()) {
            state.LoopFPSControlTime = +new Date()
            state.rainbowColor += 1

            let endObject = state.mapInfo.endObject
            let startObject = state.mapInfo.startObject
            function loopTile(tile, distance) {
                if (tile && tile.renderId != String(state.mapInfo.renderId)) {
                    tile.distanceValue = tile.type == 'air' ? distance : Infinity
                    tile.renderId = String(state.mapInfo.renderId)
                    state.mapInfo.maped += 1

                    try {
                        if (tile.type == 'air' && state.mapInfo.render) {
                            setTimeout(() => {
                                if (state.mapInfo.mapData[tile.Y+1] && tile.renderId == String(state.mapInfo.renderId)) loopTile(state.mapInfo.mapData[tile.Y+1][tile.X], distance+1)
                                if (state.mapInfo.mapData[tile.Y-1] && tile.renderId == String(state.mapInfo.renderId)) loopTile(state.mapInfo.mapData[tile.Y-1][tile.X], distance+1)
                                if (state.mapInfo.mapData[tile.Y] && tile.renderId == String(state.mapInfo.renderId)) loopTile(state.mapInfo.mapData[tile.Y][tile.X+1], distance+1)
                                if (state.mapInfo.mapData[tile.Y] && tile.renderId == String(state.mapInfo.renderId)) loopTile(state.mapInfo.mapData[tile.Y][tile.X-1], distance+1)
                            }, 0)
                        }

                        if (!isNaN(state.mapInfo.mapData[startObject.Y][startObject.X].distanceValue)) state.mapInfo.render = false
                    } catch {}
                }
            }
            loopTile(state.mapInfo.mapData[endObject.Y][endObject.X], 0)

            let tiles = []
            if (state.mapInfo.mapData[startObject.Y+1] && state.mapInfo.mapData[startObject.Y+1][startObject.X]) tiles.push(state.mapInfo.mapData[startObject.Y+1][startObject.X])
            if (state.mapInfo.mapData[startObject.Y-1] && state.mapInfo.mapData[startObject.Y-1][startObject.X]) tiles.push(state.mapInfo.mapData[startObject.Y-1][startObject.X])
            if (state.mapInfo.mapData[startObject.Y] && state.mapInfo.mapData[startObject.Y][startObject.X+1]) tiles.push(state.mapInfo.mapData[startObject.Y][startObject.X+1])
            if (state.mapInfo.mapData[startObject.Y] && state.mapInfo.mapData[startObject.Y][startObject.X-1]) tiles.push(state.mapInfo.mapData[startObject.Y][startObject.X-1])
            tiles = tiles.sort((a, b) => a?.distanceValue-b?.distanceValue)
            //if (tiles[0]?.distanceValue === tiles[1]?.distanceValue) tiles[0] = tiles[Math.floor(Math.random()*2)]
            if (tiles[0] && tiles[0].distanceValue >= 0 && tiles[0].distanceValue < state.mapInfo.mapData[startObject.Y][startObject.X].distanceValue) {
                startObject.X = tiles[0].X
                startObject.Y = tiles[0].Y
            }

            state.mapInfo.distance = Math.abs(Math.abs(startObject.X-endObject.X)+Math.abs(startObject.Y-endObject.Y))

            if (state.mapInfo.distance <= 0) {
                function newPos() {
                    let X = Math.floor(Math.random()*(state.mapInfo.width-1))
                    let Y = Math.floor(Math.random()*(state.mapInfo.height-1))
                    if (state.mapInfo.mapData[Y][X].type == 'air') {
                        for (let y = 0;y < state.mapInfo.height;y++) {
                            for (let x = 0;x < state.mapInfo.width;x++) {
                                state.mapInfo.mapData[y][x].distanceValue = NaN
                            }
                        }

                        state.mapInfo.endObject.X = X
                        state.mapInfo.endObject.Y = Y

                        state.mapInfo.maped = 0
                        state.mapInfo.points += 1
                        state.mapInfo.renderId += 1
                        state.mapInfo.render = true
                    } else setTimeout(() => newPos(), 0)
                }
                newPos()
            }
        }
    }

    async function loading(command) {
        /*state.animations = state.defaultAnimations
        let loadingImagesTotal = await addImages()
        let loadingSoundsTotal = await addSounds()
        state.loading.total = loadingImagesTotal
        state.loading.total += loadingSoundsTotal
        addMusicList()
        addDifficulties()
        addPersonalizedNotes()
        addSettings()

        let toLoad = state.images.concat(state.sounds)

        const newLoad = (msg) => {
            state.loading.loaded += 1
            state.loading.msg = `(${state.loading.loaded}/${state.loading.total}) - ${msg}`

            if (state.loading.loaded >= state.loading.total) completeLoading()
            else load(toLoad[state.loading.loaded])
        }

        const completeLoading = () => {
            state.loading.msg = `(${state.loading.loaded}/${state.loading.total}) 100% - Complete loading`
            if (state.gameStage == 'loading') {
                let interval = setInterval(() => {
                    if (!state.inLogin) {
                        state.animations.loadingLogo.paused = false

                        if (state.animations.loadingLogo.frame >= state.animations.loadingLogo.endFrame) {
                            clearInterval(interval)
                            state.animations.loadingLogo.paused = true
                            state.smallFunctions.redirectGameStage('menu')
                        }
                    }
                }, 1000)
            }
        }

        const load = async({ dir, animationConfigDir}) => {
            let loaded = false

            setTimeout(() => {
                if (!loaded) newLoad('[ERROR File failed to load] '+dir)
            }, 10000)

            if ([ 'ogg', 'mp3' ].includes(dir.split('.')[dir.split('.').length-1])) {
                let link = 'https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/'+dir

                let sound = new Audio()
                sound.addEventListener('loadeddata', (e) => {
                    loaded = true
                    //newLoad(e.path[0].src)
                    newLoad(dir)
                })
                sound.addEventListener('error', (e) => newLoad('[ERROR] '+dir))
                sound.src = dir.split('/')[0] == 'Sounds' ? `/${dir}` : link
                sound.preload = 'auto'
                state.sounds[dir] = sound
            } else {
                let link = 'https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/'+dir
                let animationConfig = animationConfigDir ? JSON.parse(await fetch('https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/'+animationConfigDir).then(r => r.text())) : null

                let img = new Image()
                img.addEventListener('load', (e) => {
                    loaded = true
                    //newLoad(e.path[0].src)
                    newLoad(dir)
                })
                img.addEventListener('error',(e) => newLoad('[ERROR] '+dir))
                img.src = link
                img.id = dir
                state.images[dir] = {
                    image: img,
                    animationConfig
                }
            }
        }

        load(toLoad[0])*/
    }
    
    return {
        Loop,
        loading,
        playSong,
        state,
    }
}

export default create