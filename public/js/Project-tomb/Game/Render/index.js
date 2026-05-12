export class RenderClass {
    constructor() {
        this.canvas = document.getElementById('gameCanvas')
        this.ctx = this.canvas.getContext('2d')

        
        this.gameZoom = 1
        this.rainbowColor = 0
        this.fps = '0-0',
        this.fpsDisplay = 0

        let functions = require('./functions').default(this.ctx, this.canvas, this)
        for (let i in functions) this[i] = functions[i]

        this.ScreenInformation = (event) => require('./ScreenInformation.js').default(this, event)
        this.RenderMap = (event) => require('./RenderMap.js').default(this, event)

        this.loop()
    }

    loop() {
        if (+new Date()-this.fps.split('-')[1] > 1000) {
            this.fpsDisplay = this.fps.split('-')[0]
            this.fps = `0-${+new Date()}`
        }
        this.fps = `${Number(this.fps.split('-')[0]) + 1}-${this.fps.split('-')[1]}`

        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        
        if (this.gameState) {
            this.ScreenInformation()
            this.RenderMap()
        }

        window.requestAnimationFrame(() => this.loop())
    }
}

/* export default async function renderGame(canvas, game, Listener) {
    if (+new Date()-game.state.fps.split('-')[1] > 1000) {
        game.state.changeRenderTypeCount += 1
        game.state.fpsDisplay = game.state.fps.split('-')[0]
        game.state.fps = `0-${+new Date()}`
    }
    game.state.fps = `${Number(game.state.fps.split('-')[0]) + 1}-${game.state.fps.split('-')[1]}`

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
 
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    //require('./RenderScreenGame').default(ctx, canvas, game, Listener)

    ctx.fillStyle = "red"
    ctx.fillRect(game.state.playerInfo.posX, game.state.playerInfo.posY, 10, 10)

    const functions = require('./functions').default(ctx, canvas, game.state, Listener)
    switch (game.state.gameStage) {
        case 'game':
            
            break
    }

    ctx.globalAlpha = 1
    game.gameLoop()
    
    window.requestAnimationFrame(() => renderGame(canvas, game, Listener))
    //if (game.state.smallFunctions.getConfig('VSync')) window.requestAnimationFrame(() => renderGame(canvas, game, Listener))
    //else setTimeout(() => renderGame(canvas, game, Listener), 0)
} */