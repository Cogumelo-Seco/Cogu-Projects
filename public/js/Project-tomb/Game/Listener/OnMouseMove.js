export default async(Listener, event) => {
    Listener.mouseInfo.lastMoveTime = +new Date()
    Listener.mouseInfo.x = event.pageX/window.innerWidth
    Listener.mouseInfo.y = event.pageY/window.window.innerHeight

    let X = Math.floor(event.pageX/window.innerWidth*1000)
    let Y = Math.floor(event.pageY/window.window.innerHeight*1000)
    
    /* let onAButton = false
    if (this.state.game) for (let i in this.state.buttons) {
        let button = this.state.buttons[i]
        if (
            button.gameStage && button.gameStage.includes(this.gameState.gameStage) && X > button.minX && X < button.maxX && Y > button.minY && Y < button.maxY ||
            !button.gameStage && X > button.minX && X < button.maxX && Y > button.minY && Y < button.maxY
        ) {
            if (!button.over && button.onOver) button.onOver()
            button.over = true
            if (button.pointer) {
                onAButton = true                    
                this.state.mouseInfo.mouseOnHover = true
            }
        } else button.over = false
    }
    if (!onAButton) this.state.mouseInfo.mouseOnHover = false */
}