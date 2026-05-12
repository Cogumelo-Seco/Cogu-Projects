export default async(Listener, { event, on }) => {
    let keys = {
        /*KeyUp: state.game?.state.smallFunctions.getConfig('KeyUp'),
        KeyDown: state.game?.state.smallFunctions.getConfig('KeyDown'),
        KeyLeft: state.game?.state.smallFunctions.getConfig('KeyLeft'),
        KeyRight: state.game?.state.smallFunctions.getConfig('KeyRight'),
        KeyEnter: state.game?.state.smallFunctions.getConfig('KeyEnter'),
        KeyExit: state.game?.state.smallFunctions.getConfig('KeyExit')*/
    }

    let keyPressed = event.code
    let lastClick = Listener.keys[keyPressed]
    let hold = !Listener.keys[keyPressed] || +new Date()-Listener.keys[keyPressed]?.time <= 50
    Listener.keys[keyPressed] = {
        key: event.key || '',
        code: keyPressed || '',
        hold,
        clicked: on,
        time: +new Date(),
        lastClickTime: lastClick?.time || null
    }
    let keyInfo = Listener.keys[keyPressed]

    Listener.gameState.PlayerMoveAndCollision(keyInfo)

    if (keyInfo.code == "WheelUp" && keyInfo.clicked && Listener.renderState.gameZoom < 2) Listener.renderState.gameZoom += 0.1
    if (keyInfo.code == "WheelDown" && keyInfo.clicked && Listener.renderState.gameZoom > 0.2) Listener.renderState.gameZoom -= 0.1
}