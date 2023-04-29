function create() {
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

        playerTime: 0,
        playerTimeString: '00:00',
        playerMovements: 0,
        gameInProgress: false,
        gameDificulty: 'Fácil',
        gameSize: 10,
        mapInfo: {
            traceId: 0,
            reload: true,
            data: [
                /*[{ id: 0, clicked: false, traceId: 0 },{ id: 0, clicked: false, traceId: 0 },{ id: 0, clicked: false, traceId: 0 },{ id: 0, clicked: false, traceId: 0 },{ id: 0, clicked: false, traceId: 0 }],
                [{ id: 0, clicked: false, traceId: 0 },{ id: 0, clicked: false, traceId: 0 },{ id: 0, clicked: false, traceId: 0 },{ id: 0, clicked: false, traceId: 0 },{ id: 0, clicked: false, traceId: 0 }],
                [{ id: 0, clicked: false, traceId: 0 },{ id: 0, clicked: false, traceId: 0 },{ id: 1, clicked: false, traceId: 0 },{ id: 0, clicked: false, traceId: 0 },{ id: 0, clicked: false, traceId: 0 }],
                [{ id: 0, clicked: false, traceId: 0 },{ id: 0, clicked: false, traceId: 0 },{ id: 0, clicked: false, traceId: 0 },{ id: 0, clicked: false, traceId: 0 },{ id: 0, clicked: false, traceId: 0 }],
                [{ id: 0, clicked: false, traceId: 0 },{ id: 0, clicked: false, traceId: 0 },{ id: 0, clicked: false, traceId: 0 },{ id: 1, clicked: false, traceId: 0 },{ id: 0, clicked: false, traceId: 0 }]*/
            ]
        }
    }

    const smallFunctions = require('./Functions/smallFunctions').default(state)
    state.smallFunctions = smallFunctions
    async function Loop(command) {
        document.title = `Cogu`

        let tiles = []
        for (let i in state.mapInfo.data) {
            for (let a in state.mapInfo.data[i]) tiles.push(state.mapInfo.data[i][a])
        }
        let filtredTiles = tiles.filter((t) => t.id == 1 && !t.flag)
        if (filtredTiles <= 0 && state.gameInProgress) {
            alert(`Você ganhou!\nTempo: ${state.playerTimeString}\nMovimentos: ${state.playerMovements}\nDificuldade: ${state.gameDificulty}\nTamanho: ${state.gameSize}`)
            state.gameInProgress = false
        }

        /* !!!!!!! FPS LIMITADO !!!!!!! */

        if (state.LoopFPSControlTime+1000 <= +new Date()) {
            state.LoopFPSControlTime = +new Date()
            if (state.gameInProgress) state.playerTime += 1
        }
        state.rainbowColor += 1
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