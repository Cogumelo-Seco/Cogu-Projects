export default async(Listener, event) => {
    Listener.handleKeys({ event: { code: 'MouseClick' }, on: true })

    let X = Math.floor(event.pageX/window.innerWidth*1000)
    let Y = Math.floor(event.pageY/window.window.innerHeight*1000)

    if (Listener.game && !Listener.onChangeKeyBind) for (let i in Listener.buttons) {
        let button = Listener.buttons[i]
        if (
            button.gameStage && button.gameStage.includes(Listener.gameState.gameStage) && X > button.minX && X < button.maxX && Y > button.minY && Y < button.maxY && button.onClick ||
            !button.gameStage && X > button.minX && X < button.maxX && Y > button.minY && Y < button.maxY && button.onClick
        ) {
            if (button.songClick) {
                Listener.game.playSong(button.songClick)
            }
            button.onClick()
        }
    }
}