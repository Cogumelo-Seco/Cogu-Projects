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
            generation: 0,
            endGeneration: null,
            maped: 0,
            points: 0,
            render: true,
            renderId: 1,
            width: 20,
            height: 20,
            distance: 0,
            distanceDirect: 0,
            mapData: {
                //0: { 10: { distanceValue: NaN, type: 'wall', X: 10, Y: 0 } },
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
            /*endObject: {
                X: 3,//Math.floor(Math.random()*19),
                Y: 3//Math.floor(Math.random()*19)
            },*/
            numberOfIndividuals: 1000,
            individuals: {
            },
            endObject: {
                X: 3,//Math.floor(Math.random()*19),
                Y: 3//Math.floor(Math.random()*19)
            },
            currentMapedObject: null
        }
    }

    const smallFunctions = require('./Functions/smallFunctions').default(state, Listener)
    state.smallFunctions = smallFunctions
    state.canvas = canvas

    async function Loop(command) {
        document.title = `Cogu - ${state.mapInfo.points}`

        for (let y = 0;y < state.mapInfo.height;y++) {
            if (state.mapInfo.mapData[y] == undefined) state.mapInfo.mapData[y] = []
            for (let x = 0;x < state.mapInfo.width;x++) {
                if (!state.mapInfo.mapData[y][x]) state.mapInfo.mapData[y][x] = { distanceValue: NaN, type: 'air', X: x, Y: y, renderId: 0 }
            }
        }
        

        /* !!!!!!! FPS LIMITADO !!!!!!! */

        if (state.LoopFPSControlTime+0 <= +new Date()) {
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

                        //if (!isNaN(state.mapInfo.mapData[startObject.Y][startObject.X].distanceValue)) state.mapInfo.render = false
                    } catch {}
                }
            }
            loopTile(state.mapInfo.mapData[endObject.Y][endObject.X], 0)

            for (let i = 0;i <= state.mapInfo.numberOfIndividuals;i++) {
                let individual = state.mapInfo.individuals[i]
                if (!individual) {
                    state.mapInfo.individuals[i] = {
                        color: '#'+Math.floor(Math.random()*16777215).toString(16),
                        energy: state.mapInfo.width*state.mapInfo.height/4,
                        X: 18,
                        Y: 18,
                        data: [ 
                            [
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                            ],
                            [
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                            ],
                            [
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                            ],
                            [
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                                Math.floor(Math.random()*2000)-1000,
                            ],
                            /*Math.floor(Math.random()*2000)-1000,
                            Math.floor(Math.random()*2000)-1000,
                            Math.floor(Math.random()*2000)-1000,
                            Math.floor(Math.random()*2000)-1000,
                            /*Math.floor(Math.random()*2000)-1000,
                            Math.floor(Math.random()*2000)-1000,
                            Math.floor(Math.random()*2000)-1000,
                            Math.floor(Math.random()*2000)-1000,
                            Math.floor(Math.random()*2000)-1000,
                            Math.floor(Math.random()*2000)-1000,
                            Math.floor(Math.random()*2000)-1000,
                            Math.floor(Math.random()*2000)-1000,*/
                        ]
                    }
                } else {
                    let tiles = []
                    if (state.mapInfo.mapData[individual.Y+1] && state.mapInfo.mapData[individual.Y+1][individual.X]) tiles.push(state.mapInfo.mapData[individual.Y+1][individual.X])
                    if (state.mapInfo.mapData[individual.Y-1] && state.mapInfo.mapData[individual.Y-1][individual.X]) tiles.push(state.mapInfo.mapData[individual.Y-1][individual.X])
                    if (state.mapInfo.mapData[individual.Y] && state.mapInfo.mapData[individual.Y][individual.X+1]) tiles.push(state.mapInfo.mapData[individual.Y][individual.X+1])
                    if (state.mapInfo.mapData[individual.Y] && state.mapInfo.mapData[individual.Y][individual.X-1]) tiles.push(state.mapInfo.mapData[individual.Y][individual.X-1])

                    individual.energy -= 1
                    if (tiles.length == 4 && individual.energy > 0) {
                        for (let a in individual.data) {
                            let dataValue = 0
                            for (let t in tiles) {
                                if (!isNaN(tiles[t].distanceValue)) dataValue += individual.data[a][t]*tiles[t].distanceValue
                            }

                            try {
                                if (Number(a) == 0 && dataValue > 0 && state.mapInfo.mapData[individual.Y+1] && state.mapInfo.mapData[individual.Y+1][individual.X].distanceValue != Infinity) {
                                    //individual.X = tiles[0].X
                                    individual.Y += 1
                                    individual.distanceValue = state.mapInfo.mapData[individual.Y][individual.X].distanceValue
                                }
                                if (Number(a) == 1 && dataValue > 0 && state.mapInfo.mapData[individual.Y-1] && state.mapInfo.mapData[individual.Y-1][individual.X].distanceValue != Infinity) {
                                    //individual.X = tiles[1].X
                                    individual.Y -= 1
                                    individual.distanceValue = state.mapInfo.mapData[individual.Y][individual.X].distanceValue
                                }
                                if (Number(a) == 2 && dataValue > 0 && state.mapInfo.mapData[individual.Y] && state.mapInfo.mapData[individual.Y][individual.X+1].distanceValue != Infinity) {
                                    individual.X += 1
                                    //individual.Y = tiles[2].Y
                                    individual.distanceValue = state.mapInfo.mapData[individual.Y][individual.X].distanceValue
                                }
                                if (Number(a) == 3 && dataValue > 0 && state.mapInfo.mapData[individual.Y] && state.mapInfo.mapData[individual.Y][individual.X-1].distanceValue != Infinity) {
                                    individual.X -= 1
                                    //individual.Y = tiles[3].Y
                                    individual.distanceValue = state.mapInfo.mapData[individual.Y][individual.X].distanceValue
                                }
                            } catch {}
                        }
                        /*for (let n in tiles) {
                            let dataValue = 0
                            for (let a in individual.data[n]) dataValue += individual.data[n][a]*tiles[n].distanceValue
                            let move = dataValue <= 0 ? false : true
                            //individual.data[n]*n+(individual.data[n-n/2]*n) <= 0 ? false : individual.data[n]*n+(individual.data[n-n/2]*n)
                            if (isNaN(Number(tiles[n].distanceValue)) || tiles[n].distanceValue == Infinity) move = false

                            if (move) {
                                individual.X = tiles[n].X
                                individual.Y = tiles[n].Y
                                individual.distanceValue = state.mapInfo.mapData[individual.Y][individual.X].distanceValue
                                break
                            }
                        }*/
                    }
                }
            }

            let end = (Object.values(state.mapInfo.individuals).filter(i => i.energy <= 0)).length-1 >= state.mapInfo.numberOfIndividuals

            if (end) {
                let bestIndividual = (Object.values(state.mapInfo.individuals).filter(i => i.energy <= 0))//.sort((a, b) => a?.distanceValue-b?.distanceValue)[0]
                /*for (let i in bestIndividual) {
                    bestIndividual[i].distanceValue = state.mapInfo.mapData[bestIndividual[i].Y][bestIndividual[i].X].distanceValue
                }*/
                bestIndividual = bestIndividual.sort((a, b) => a.distanceValue-b.distanceValue)//[0]
                if (bestIndividual[0].distanceValue == bestIndividual[1].distanceValue) bestIndividual = bestIndividual[1]
                else bestIndividual = bestIndividual[0]
                bestIndividual.distanceValue = state.mapInfo.mapData[bestIndividual.Y][bestIndividual.X].distanceValue
                console.log(bestIndividual)
                console.log(bestIndividual.distanceValue)

                //if (!bestIndividual || isNaN(Number(bestIndividual.distanceValue))) return
                console.log(bestIndividual.data)
                if (bestIndividual.distanceValue <= 0 && state.mapInfo.endGeneration == null) state.mapInfo.endGeneration = state.mapInfo.generation
                state.mapInfo.generation += 1
                
                
                for (let i in state.mapInfo.individuals) {
                    let individual = state.mapInfo.individuals[i]
                    state.mapInfo.individuals[i].X = 18
                    state.mapInfo.individuals[i].Y = 18
                    state.mapInfo.individuals[i].color = individual.color
                    state.mapInfo.individuals[i].energy = state.mapInfo.width*state.mapInfo.height/4
                    //state.mapInfo.individuals[i].data = bestIndividual.data
                    
                    for (let a in state.mapInfo.individuals[i].data) {
                        for (let b in state.mapInfo.individuals[i].data[a]) {
                            state.mapInfo.individuals[i].data[a][b] = bestIndividual.data[a][b]+(Number(i) != 0 ? Math.floor(Math.random()*(2000*(Number(i)/state.mapInfo.numberOfIndividuals)))-(1000*(Number(i)/state.mapInfo.numberOfIndividuals)) : 0)
                            state.mapInfo.individuals[i].data[a][b] = state.mapInfo.individuals[i].data[a][b] <= -1000 ? -1000 : state.mapInfo.individuals[i].data[a][b] >= 1000 ? 1000 : state.mapInfo.individuals[i].data[a][b]
                            //if (a == 0 && b == 0) console.log(state.mapInfo.individuals[i].data[a][b])
                        }
                        /*for (let b in state.mapInfo.individuals[i].data[a]) {
                            let data = state.mapInfo.individuals[i].data[a][b]
                            state.mapInfo.individuals[i].data[a][b] = bestIndividual.data[a][b]+Math.floor(Math.random()*600)-(300)
                            state.mapInfo.individuals[i].data[a][b] = data <= -1000 ? -1000 : data >= 1000 ? 1000 : data
                        }
                        /*
                        data = bestIndividual.data[a]+Math.floor(Math.random()*600)-(300)
                        data = data <= -1000 ? -1000 : data >= 1000 ? 1000 : data*/
                    }
                    /*for (let a in state.mapInfo.individuals[i].data2) {
                        let data = state.mapInfo.individuals[i].data2[a]
                        data = bestIndividual.data[a]+Math.floor(Math.random()*600)-(300)
                        data = data <= -1000 ? -1000 : data >= 1000 ? 1000 : data
                    }*/
                    
                    //for (let a in state.mapInfo.individuals[i].data) state.mapInfo.individuals[i].data[a] = state.mapInfo.individuals[i].data[a] <= -1000 ? -1000 : state.mapInfo.individuals[i].data[a] >= 1000 ? 1000 : state.mapInfo.individuals[i].data[a]
                }

                /*function newPos() {
                    let X = Math.floor(Math.random()*(state.mapInfo.width-1))
                    let Y = Math.floor(Math.random()*(state.mapInfo.height-1)/2)
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
                newPos()*/
                /*for (let i = 0;i <= state.mapInfo.numberOfIndividuals;i++) {
                    let individual = state.mapInfo.individuals[i]
                    if (!individual) {
                        state.mapInfo.individuals[i] = {
                            color: individual.color,
                            energy: state.mapInfo.width*state.mapInfo.height,
                            X: 18,
                            Y: 18,
                            data: [ 
                                bestIndividual.data[0]+Math.floor(Math.random()*200)-100,
                                bestIndividual.data[1]+Math.floor(Math.random()*200)-100,
                                bestIndividual.data[2]+Math.floor(Math.random()*200)-100,
                                bestIndividual.data[3]+Math.floor(Math.random()*200)-100
                            ]
                        }
                    }
                }*/
            }
/*
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

            state.mapInfo.distanceDirect = Math.abs(Math.abs(startObject.X-endObject.X)+Math.abs(startObject.Y-endObject.Y))
            state.mapInfo.distance = state.mapInfo.mapData[startObject.Y][startObject.X].distanceValue

            if (state.mapInfo.distanceDirect <= 0) {
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
            }*/
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