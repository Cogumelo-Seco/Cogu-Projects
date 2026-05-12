export default async function Loading(Game) {
    let toLoad = Game.images.concat(Game.sounds)


    const load = async({ dir, animationConfigDir, local }) => {
        let loaded = false

        //setTimeout(() => {
        //    if (!loaded) newLoad('[ERROR File failed to load] '+dir)
        //}, 10000)

        if ([ 'ogg', 'mp3' ].includes(dir.split('.')[dir.split('.').length-1])) {
            //let link = state.filesURL+dir

            let sound = new Audio()
            sound.addEventListener('loadeddata', (e) => {
                loaded = true
                //newLoad(dir)
            })
            //sound.addEventListener('error', (e) => newLoad('[ERROR] '+dir))
            sound.src = 'sounds/'+dir//dir.split('/')[0] == 'Sounds' ? `/${dir}` : link
            sound.preload = 'auto'
            Game.sounds[dir] = sound
        } else {
            /* let link = local ? '/'+dir : state.filesURL+'imgs/'+dir
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
            } */
        }
    }

    load(toLoad[0])
/* 
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

    load(toLoad[0]) */

}