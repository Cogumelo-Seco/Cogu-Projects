

export class GameClass {
    constructor() {
        this.gameStage = 'game',
        this.animations = [],

        this.sounds = require('./addSounds.js').default(this)
        this.images = require('./addImages.js').default(this)

        this.currentMap = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,2,1,2,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,2,9,2,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,2,9,2,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,2,9,2,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,2,2,2,2,9,2,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,2,7,9,9,9,2,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,2,9,0,2,2,2,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,2,9,0,2,2,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,2,9,9,9,2,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,2,2,2,9,2,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,2,9,2,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,2,9,2,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,2,2,2,9,2,2,2,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,2,9,9,9,9,9,2,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,2,9,0,9,2,8,2,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,2,9,0,9,2,9,2,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,2,9,9,7,2,9,2,0,0,0,0,0,0],
            [0,0,0,0,2,2,2,2,2,2,2,2,9,2,0,0,0,0,0,0],
            [0,0,0,0,2,9,9,9,9,2,0,2,9,2,0,0,0,0,0,0],
            [0,0,0,0,2,9,2,2,9,2,2,2,9,2,0,0,0,0,0,0],
            [0,0,0,0,2,9,2,2,9,8,9,9,9,2,0,0,0,0,0,0],
            [0,2,2,2,2,9,2,2,2,2,2,2,2,2,2,2,2,2,0,0],
            [0,2,9,9,9,9,9,9,9,9,9,2,2,7,9,8,9,2,0,0],
            [0,2,9,0,0,8,2,2,2,2,9,9,9,9,0,0,9,2,0,0],
            [0,2,9,0,0,9,2,0,0,2,2,2,2,2,0,0,9,2,0,0],
            [0,2,9,9,9,9,2,0,0,0,2,0,0,0,0,0,9,2,0,0],
            [0,2,2,2,2,2,2,0,0,0,2,0,0,0,0,0,9,2,0,0],
            [0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,9,2,0,0],
            [0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ]

        this.playerInfo = {
            posX: 14,
            posY: 29,
            inMovement: false
        }

        require('./Loading.js').default(this)

        this.PlaySong = (...event) => require('./PlaySong.js').default(this, ...event)
        this.PlayerMoveAndCollision = (event) => require('./PlayerMoveAndCollision.js').default(this, event)
        this.GameLoop = require('./GameLoop.js').default(this)
        this.AnimationSystem = require('./AnimationSystem.js').default(this)
    }
}



/*function createGame(Listener, canvas) {
    const state = {
        debug: false,
        fps: '0-0',
        gameStage: 'game',
        animations: [],
        playerInfo: {
            posX: 0,
            posY: 0
        }
    }

    state.Listener = Listener
    state.canvas = canvas

    const GameLoop = require('./GameLoop').default//(command)
    const Loading = require('./Loading').default//(command)
    const playSong = require('./playSong').default//(type, command, state)

    //const addImages = (command) => require('./addImages').default(state)
    //const addSounds = (command) => require('./addSounds').default(state)
    //const playSong = (type, command) => require('./playSong').default(type, command, state)

   

    /*
    async function start() {
    }

    async function gameLoop(command) {

        /* !!!!!!! FPS LIMITADO !!!!!!! 

        if (state.gameLoopFPSControlTime+25 <= +new Date()) {
            state.gameLoopFPSControlTime = +new Date()

            if (state.music?.currentTime > 0 && state.music?.currentTime < state.music?.duration && !state.music.paused) state.musicEventListener('gameLoop', { listenerState: Listener.state }, state)

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

    async function loading() {
        return;

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
            if (state.gameStage == 'loading') {
                let interval = setInterval(() => {
                    state.animations.loadingLogo.paused = false

                    if (state.animations.loadingLogo.frame >= state.animations.loadingLogo.endFrame) {
                        clearInterval(interval)
                        state.animations.loadingLogo.paused = true
                        state.smallFunctions.redirectGameStage('menu')
                    }
                }, 1000)
            }
        }

        const load = async({ dir, animationConfigDir, local }) => {
            let loaded = false

            setTimeout(() => {
                if (!loaded) newLoad('[ERROR File failed to load] '+dir)
            }, 10000)

            if ([ 'ogg', 'mp3' ].includes(dir.split('.')[dir.split('.').length-1])) {
                let link = state.filesURL+dir

                let sound = new Audio()
                sound.addEventListener('loadeddata', (e) => {
                    loaded = true
                    newLoad(dir)
                })
                sound.addEventListener('error', (e) => newLoad('[ERROR] '+dir))
                sound.src = dir.split('/')[0] == 'Sounds' ? `/${dir}` : link
                sound.preload = 'auto'
                state.sounds[dir] = sound
            } else {
                let link = local ? '/'+dir : state.filesURL+'imgs/'+dir
                let animationConfig = animationConfigDir ? JSON.parse(await fetch(state.filesURL+'imgs/'+animationConfigDir).then(r => r.text())) : null

                let img = new Image()
                img.addEventListener('load', (e) => {
                    loaded = true
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

        load(toLoad[0])
    }
    
    return {
        //start,
        GameLoop,
        Loading,
        state
        //playSong,
        //state
    }
}

export default createGame*/