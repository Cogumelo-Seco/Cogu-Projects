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
        numberOfIndividuals: 700,
        individuals: {},
        bestIndividual: null,
        mapObjects: []
    }

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

            if (state.score >= 10 && state.score%(Math.floor(25/*-(state.speed)*/)) == 0) {
                let type = Math.floor(Math.random()*4)

                switch(type) {
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
                    variantX: Math.floor(Math.random()*100)-50,
                    size: 25,
                    score: 0,
                    dead: false,
                    jumpForce: 4.2,
                    jumpCount: 0,
                    time: +new Date(),
                    distance: 0,
                    v: 0,
                    dataValue1: {},
                    dataValue2: {},
                    dataValue3: {},
                    data: [
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
                            type: 'Altitude',
                            value: Math.floor(Math.random()*2000)-1000,
                        }
                    ]
                }
            } else if (!individual.dead) {
                let a = 15 * (10 ** (-2))
                let getNewDistance = (S0, v, t) => S0 + v*t + 0.5 * (a*t)**2

                let timeGap = 1//+new Date()-individual.time
                individual.time = +new Date()
                individual.distance = Math.max(getNewDistance(individual.distance, individual.v, timeGap), 0)
                //individual.distance = individual.distance >= 100 ? 100 : individual.distance

                if (individual.distance <= 0) {
                    individual.v = 0//individual.v > -0.2 ? 0 : (individual.v * -1) //* (1-200/200)
                } else individual.v = individual.v - (a * timeGap)
                //console.log(timeGap, individual.v, individual.distance)

                let object = state.mapObjects.find(o => 
                    o.X <= individual.X+individual.size && o.X+o.width >= individual.X &&
                    o.Y-o.height <= individual.Y && o.Y >= individual.Y-individual.size
                )
                if (object) {
                    individual.dead = true
                }

                individual.dataValue3[0] = false
                for (let a in individual.data) {
                    //individual.dataValue1[a] = individual.data[a].value
                    let dataValue = 0
                    let object = (state.mapObjects.filter(o => o.X >= individual.X+individual.size)).sort((a, b) => a.X-b.X)[0]

                    if (object) {
                        for (let b in individual.data) {
                            if (b == 0) {
                                individual.dataValue2[b] = individual.data[b].value*Math.abs(object.X-individual.X)
                                dataValue += individual.dataValue2[b]
                            }
                            if (b == 1) {
                                individual.dataValue2[b] = individual.data[b].value*state.speed
                                dataValue += individual.dataValue2[b]
                            }
                            if (b == 2) {
                                individual.dataValue2[b] = individual.data[b].value*object.height
                                dataValue += individual.dataValue2[b]
                            }
                            if (b == 3) {
                                individual.dataValue2[b] = individual.data[b].value*object.altitude
                                dataValue += individual.dataValue2[b]
                            }
                        }

                        if (dataValue > 0) individual.dataValue3[0] = true
                        if (dataValue > 0 && Math.abs(individual.v) == 0) {
                           /* if (!object.detected) {
                                individual.score = state.score+(canvas.width-object.X)*5
                                object.detected = true
                            }// else individual.score = state.score//+(canvas.width-object.X)*1.5
                            individual.jumpCount += 1
                            individual.score = state.score-(individual.jumpCount*10)
                            individual.v = individual.jumpForce*/
                            individual.jumpCount += 1
                            individual.score = state.score-(individual.jumpCount*10)
                            individual.v = individual.jumpForce
                        }
                    }
                }
                /*for (let a in individual.data) {
                    let dataValue = 0
                    let object = (state.mapObjects.filter(o => o.X >= individual.X+individual.size)).sort((a, b) => a.X-b.X)[0]
                    
                    if (object) {
                        for (let b in individual.data[a]) {
                            if (b == 0) {
                                individual.dataValue1[b] = individual.data[a][b]*Math.abs(object.X-individual.X)
                                dataValue += individual.dataValue1[b]
                            }
                            if (b == 1) {
                                individual.dataValue1[b] = individual.data[a][b]*state.speed
                                dataValue += individual.dataValue1[b]
                            }
                            if (b == 2) {
                                individual.dataValue1[b] = individual.data[a][b]*object.height
                                dataValue += individual.dataValue1[b]
                            }
                            if (b == 3) {
                                individual.dataValue1[b] = individual.data[a][b]*object.altitude
                                dataValue += individual.dataValue1[b]
                            }
                        }

                        individual.dataValue2[a] = dataValue
                        if (dataValue > 0) individual.dataValue3[0] = true
                        if (dataValue > 0 && Math.abs(individual.v) == 0) {
                           /* if (!object.detected) {
                                individual.score = state.score+(canvas.width-object.X)*5
                                object.detected = true
                            }// else individual.score = state.score//+(canvas.width-object.X)*1.5
                            individual.jumpCount += 1
                            individual.score = state.score-(individual.jumpCount*10)
                            individual.v = individual.jumpForce
                            individual.jumpCount += 1
                            individual.score = state.score-(individual.jumpCount*10)
                            individual.v = individual.jumpForce
                        }
                    }
                }*/
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

                        for (let a in state.individuals[i].data) {
                            state.individuals[i].data[a].value = bestIndividual.data[a].value+(Number(i) != 0 ? Math.random()*(2000*(Number(i)/state.numberOfIndividuals))-(1000*(Number(i)/state.numberOfIndividuals)) : 0)
                            state.individuals[i].data[a].value = state.individuals[i].data[a].value <= -1000 ? -1000 : state.individuals[i].data[a].value >= 1000 ? 1000 : state.individuals[i].data[a].value
                        }
                        /*for (let a in state.individuals[i].data) {
                            for (let b in state.individuals[i].data[a]) {
                                state.individuals[i].data[a][b] = bestIndividual.data[a][b]+(Number(i) != 0 ? Math.random()*(2000*(Number(i)/state.numberOfIndividuals))-(1000*(Number(i)/state.numberOfIndividuals)) : 0)
                                state.individuals[i].data[a][b] = state.individuals[i].data[a][b] <= -1000 ? -1000 : state.individuals[i].data[a][b] >= 1000 ? 1000 : state.individuals[i].data[a][b]
                            }
                        }*/
                    }
                }
            }, 500)
        }
    }

    async function loading(command) {
    }
    
    return {
        Loop,
        loading,
        state,
    }
}

export default create