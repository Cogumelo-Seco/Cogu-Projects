function create(Listener, canvas) {
    const state = {
        debug: false,
        fps: '0-0',
        LoopFPSControlTime: 0,
        rainbowColor: 0,
        speed: 5,
        score: 0,
        highestScore: 0,
        generation: 0,
        alive: 0,
        numberOfIndividuals: 500,
        individuals: {},
        bestIndividual: null,
        mapObjects: [],
        loading: {
            loaded: 0,
            total: 0,
            msg: 'Loading...'
        },
    }

    const addImages = (command) => require('./Functions/addImages').default(state)
    const addSounds = (command) => require('./Functions/addSounds').default(state)
    const smallFunctions = require('./Functions/smallFunctions').default(state, Listener)
    state.smallFunctions = smallFunctions
    state.canvas = canvas

    async function Loop(command) {
        document.title = `Cogu`

        /* !!!!!!! FPS LIMITADO !!!!!!! */

        if (state.LoopFPSControlTime+100 <= +new Date()) {
            state.LoopFPSControlTime = +new Date()
            state.rainbowColor += 1

            state.alive = Object.values(state.individuals).filter(i => !i.dead).length
            state.score += 1
            state.highestScore = state.highestScore >= state.score ? state.highestScore : state.score
            state.speed = state.score/100+2

            if (state.score >= 100 && state.score%75 == 0 && Math.floor(Math.random()*100) > 50) {
                state.mapObjects.push({
                    type: 1,
                    color: 'yellow',
                    X: canvas.width*2-30,
                    altitude: 0,
                    width: 400,
                    height: 20
                })
            }
            if (state.score >= 10 && state.score%25 == 0) {
                let type = Math.floor(Math.random()*4)
                let object = state.mapObjects.filter(o => o.type == 1 && o.X >= -o.width)[0]

                if (!object) switch(type) {
                    case 0:
                        state.mapObjects.push({
                            color: 'green',
                            X: canvas.width*2,
                            altitude: 0,
                            width: 20,
                            height: 45
                        })
                        break
                    case 1:
                        state.mapObjects.push({
                            color: 'rgb(100, 255, 100)',
                            X: canvas.width*2,
                            altitude: 0,
                            width: 40,
                            height: 45
                        })
                        break
                    case 2:
                        state.mapObjects.push({
                            color: 'rgb(255, 100, 50)',
                            X: canvas.width*2,
                            altitude: 0,
                            width: 30,
                            height: 20
                        })
                        break
                    case 3:
                        state.mapObjects.push({
                            color: 'red',
                            X: canvas.width*2,
                            altitude: 55,
                            width: 35,
                            height: 25
                        })
                }
                
            }
        }

        let bestIndividual = ((Object.values(state.individuals).filter(i => !i.dead)).sort((a, b) => b.score-a.score))[0]
        state.bestIndividual = bestIndividual

        for (let i in state.mapObjects) {
            state.mapObjects[i].X -= state.speed
        }


        for (let i = 0;i < state.numberOfIndividuals;i++) {
            let individual = state.individuals[i]
            if (!individual) {
                state.individuals[i] = {
                    color: '#'+Math.floor(Math.random()*16777215).toString(16),
                    id: i,
                    variantX: Math.floor(Math.random()*100)-50,
                    size: 25,
                    score: 0,
                    ballon: false,
                    ballonTime: 0,
                    ballonRechargeTime: 0,
                    ballonCount: 0,
                    dead: false,
                    jumpForce: 4.4,
                    jumpCount: 0,
                    time: +new Date(),
                    distance: 0,
                    v: 0,
                    dataValue1: {},
                    dataValue2: {},
                    dataValue3: {},
                    data: [
                        [
                            {
                                type: 'Distância',
                                value: Math.floor(Math.random()*2000)-1000,
                            },
                            {
                                type: 'Velocidade',
                                value: Math.floor(Math.random()*2000)-1000,
                            },
                            {
                                type: 'Altura',
                                value: Math.floor(Math.random()*2000)-1000,
                            },
                            {
                                type: 'Largura',
                                value: Math.floor(Math.random()*2000)-1000,
                            },
                            {
                                type: 'Altitude',
                                value: Math.floor(Math.random()*2000)-1000,
                            }
                        ],
                        [
                            {
                                type: 'Distância',
                                value: Math.floor(Math.random()*2000)-1000,
                            },
                            {
                                type: 'Velocidade',
                                value: Math.floor(Math.random()*2000)-1000,
                            },
                            {
                                type: 'Altura',
                                value: Math.floor(Math.random()*2000)-1000,
                            },
                            {
                                type: 'Largura',
                                value: Math.floor(Math.random()*2000)-1000,
                            },
                            {
                                type: 'Altitude',
                                value: Math.floor(Math.random()*2000)-1000,
                            }
                        ]
                    ]
                }
            } else if (!individual.dead) {
                let a = 15 * (10 ** (-2))
                let getNewDistance = (S0, v, t) => S0 + v*t + 0.5 * (a*t)**2

                let timeGap = 1//+new Date()-individual.time
                individual.time = +new Date()
                individual.distance = Math.min(Math.max(getNewDistance(individual.distance, individual.v, timeGap), 0), 100)
                //individual.distance = individual.distance >= 150 ? 150 : individual.distance
                individual.v = individual.distance <= 0 ? 0 : individual.v - (a * timeGap)

                let object = state.mapObjects.find(o => 
                    o.X <= individual.X+individual.size && o.X+o.width >= individual.X &&
                    o.Y-o.height <= individual.Y && o.Y >= individual.Y-individual.size
                )
                if (object) {
                    individual.dead = true
                }

                if (individual.ballon) {
                    individual.ballonTime += state.speed*0.3
                    if (individual.ballonTime >= 100*(state.speed*0.3)) {
                        individual.ballon = false
                        individual.distance = 55
                        individual.v = -individual.jumpForce
                        individual.ballonRechargeTime = 300*(state.speed*0.3)
                    }
                }
                if (individual.ballonRechargeTime > 0) individual.ballonRechargeTime -= state.speed*0.5

                individual.score = state.score-(individual.jumpCount*10)
                for (let a in individual.data) {
                    if (!individual.dataValue3[a]) individual.dataValue3[a] = { type: null, value: false}
                    else individual.dataValue3[a].value = false
                    //individual.dataValue3 = {0: { type: 'Balão', value: true }}

                    let dataValue = 0
                    let object = (state.mapObjects.filter(o => o.X >= individual.X+individual.size)).sort((a, b) => a.X-b.X)[0]

                    if (object) {
                        for (let b in individual.data[a]) {
                            if (b == 0) {
                                individual.dataValue1[b] = Math.abs(object.X-individual.X)
                                //individual.dataValue2[a][b] = individual.data[a][b].value*Math.abs(object.X-individual.X)
                                dataValue += individual.data[a][b].value*Math.abs(object.X-individual.X)
                            }
                            if (b == 1) {
                                individual.dataValue1[b] = state.speed
                                //individual.dataValue2[a][b] = individual.data[a][b].value*state.speed
                                dataValue += individual.data[a][b].value*state.speed
                            }
                            if (b == 2) {
                                individual.dataValue1[b] = object.height
                                //individual.dataValue2[b] = individual.data[a][b].value*object.height
                                dataValue += individual.data[a][b].value*object.height
                            }
                            if (b == 3) {
                                individual.dataValue1[b] = object.width
                                //individual.dataValue2[b] = individual.data[a][b].value*object.width
                                dataValue += individual.data[a][b].value*object.width
                            }
                            if (b == 4) {
                                individual.dataValue1[b] = object.altitude
                                //individual.dataValue2[b] = individual.data[a][b].value*object.altitude
                                dataValue += individual.data[a][b].value*object.altitude
                            }
                        }

                        individual.dataValue2[a] = dataValue

                        individual.dataValue3[0].type = 'Pulo'
                        individual.dataValue3[1].type = 'Balão'
                        if (a == 1 && dataValue > 0 && !individual.ballon && individual.ballonRechargeTime <= 0) {
                            individual.dataValue3[1].value = true
                            individual.ballon = true
                            individual.ballonTime = 0
                            individual.ballonCount += 1
                            individual.v = 0
                        }

                        if (a == 0 && dataValue > 0 && Math.abs(individual.v) == 0 && !individual.ballon) {
                           /* if (!object.detected) {
                                individual.score = state.score+(canvas.width-object.X)*5
                                object.detected = true
                            }// else individual.score = state.score//+(canvas.width-object.X)*1.5
                            individual.jumpCount += 1
                            individual.score = state.score-(individual.jumpCount*10)
                            individual.v = individual.jumpForce*/
                            //individual.dataValue3[0] = { type: 'Pulo', value: true }
                            individual.dataValue3[0].value = true
                            individual.jumpCount += 1
                            individual.v = individual.jumpForce
                        }

                        individual.score = state.score-(individual.jumpCount*5)-(individual.ballonCount*2)
                    }
                }
            }
        }

        let end = (Object.values(state.individuals).filter(i => i.dead)).length >= state.numberOfIndividuals

        if (end && !state.inReset) {
            state.score = 0
            state.mapObjects = []
            state.inReset = true

            setTimeout(() => {
                state.generation += 1
                state.inReset = false
                let bestIndividual = (Object.values(state.individuals).sort((a, b) => b.score-a.score))[0]

                for (let i in state.individuals) {
                    let individual = state.individuals[i]
                    if (individual) {
                        individual.dead = false
                        individual.v = 0
                        individual.distance = 0
                        individual.score = 0
                        individual.jumpCount = 0
                        individual.ballonCount = 0

                        for (let a in state.individuals[i].data) {
                            for (let b in state.individuals[i].data[a]) {
                                state.individuals[i].data[a][b].value = bestIndividual.data[a][b].value+(Number(i) != 0 ? Math.random()*(2000*(Number(i)/state.numberOfIndividuals))-(1000*(Number(i)/state.numberOfIndividuals)) : 0)
                                state.individuals[i].data[a][b].value = state.individuals[i].data[a][b].value <= -1000 ? -1000 : state.individuals[i].data[a][b].value >= 1000 ? 1000 : state.individuals[i].data[a][b].value
                            }
                            //state.individuals[i].data[a].value = bestIndividual.data[a].value+(Number(i) != 0 ? Math.random()*(1000*(Number(i)/state.numberOfIndividuals))-(500*(Number(i)/state.numberOfIndividuals)) : 0)
                            //state.individuals[i].data[a].value = state.individuals[i].data[a].value <= -1000 ? -1000 : state.individuals[i].data[a].value >= 1000 ? 1000 : state.individuals[i].data[a].value
                        }
                    }
                }
            }, 500)
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
            else if (toLoad[state.loading.loaded]) load(toLoad[state.loading.loaded])
        }

        const completeLoading = () => {
            state.loading.msg = `(${state.loading.loaded}/${state.loading.total}) 100% - Complete loading`
            /*if (state.gameStage == 'loading') {
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
            }*/
        }

        const load = async({ dir, animationConfigDir}) => {
            let loaded = false

            setTimeout(() => {
                if (!loaded) newLoad('[ERROR File failed to load] '+dir)
            }, 10000)

            if ([ 'ogg', 'mp3' ].includes(dir.split('.')[dir.split('.').length-1])) {
                let link = dir

                let sound = new Audio()
                sound.addEventListener('loadeddata', (e) => {
                    loaded = true
                    //newLoad(e.path[0].src)
                    newLoad()
                })
                sound.addEventListener('error', (e) => newLoad('[ERROR] '))
                sound.src = dir.split('/')[0] == 'Sounds' ? `/${dir}` : link
                sound.preload = 'auto'
                state.sounds[dir] = sound
            } else {
                let link = dir
                let animationConfig = animationConfigDir ? JSON.parse(await fetch(animationConfigDir).then(r => r.text())) : null

                let img = new Image()
                img.addEventListener('load', (e) => {
                    loaded = true
                    //newLoad(e.path[0].src)
                    newLoad()
                })
                img.addEventListener('error',(e) => newLoad('[ERROR] '))
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
        Loop,
        loading,
        state,
    }
}

export default create