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
            width: 20,
            height: 20,
            mapData: { },
            endObject: {
                X: Math.floor(Math.random()*19),
                Y: Math.floor(Math.random()*19),
            },
            startObject: {
                X: Math.floor(Math.random()*19),
                Y: Math.floor(Math.random()*19),
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
                let distanceValue = NaN
                let endObjectData = state.mapInfo.endObject
                distanceValue = 0+Math.abs(endObjectData.X-x)+Math.abs(endObjectData.Y-y)

                if (!state.mapInfo.mapData[y][x]) state.mapInfo.mapData[y][x] = { distanceValue, type: 'air', X: x, Y: y }
            }
        }

        let currentMapedObject = state.mapInfo.currentMapedObject || state.mapInfo.startObject
        let tiles = [
            (state.mapInfo.mapData[currentMapedObject.Y+1] ? state.mapInfo.mapData[currentMapedObject.Y+1][currentMapedObject.X] : null),
            (state.mapInfo.mapData[currentMapedObject.Y+1] ? state.mapInfo.mapData[currentMapedObject.Y-1][currentMapedObject.X] : null),
            (state.mapInfo.mapData[currentMapedObject.Y+1] ? state.mapInfo.mapData[currentMapedObject.Y][currentMapedObject.X+1] : null),
            (state.mapInfo.mapData[currentMapedObject.Y+1] ? state.mapInfo.mapData[currentMapedObject.Y][currentMapedObject.X-1] : null)
        ]
        tiles = tiles.sort((a, b) => a?.distanceValue-b?.distanceValue)
        if (tiles[0]?.distanceValue === tiles[1]?.distanceValue) tiles[0] = tiles[Math.floor(Math.random()*2)]
        if (tiles[0] && tiles[0].distanceValue > 0) {
            tiles[0].traced = true
            state.mapInfo.currentMapedObject = tiles[0]
        }


        /* !!!!!!! FPS LIMITADO !!!!!!! */

        if (state.LoopFPSControlTime+20 <= +new Date()) {
            state.LoopFPSControlTime = +new Date()
            state.rainbowColor += 1
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