export default function createListener() {
    const state = {
        buttons: {},
        keys: {},
        arrows: {},
        pauseGameKeys: false,
        codeText: '',
        messageContent: '',
        writingPosition: Infinity,
        writingPositionOld: -1,
        mouseInfo: {
            x: NaN,
            y: NaN,
            mouseOnHover: false,
            mouseInfoType: 'percent',
            lastMoveTime: 0
        }
    }

    require('./ListenerFunctions/addButtons').default(state, handleKeys)

    document.onmousemove = (event) => {
        state.mouseInfo.lastMoveTime = +new Date()
        state.mouseInfo.x = event.pageX/window.innerWidth
        state.mouseInfo.y = event.pageY/window.window.innerHeight

        let X = Math.floor(event.pageX/window.innerWidth*1000)
        let Y = Math.floor(event.pageY/window.window.innerHeight*1000)
        
        let onAButton = false
        if (state.index) for (let i in state.buttons) {
            let button = state.buttons[i]
            if (
                button.gameStage && button.gameStage.includes(state.game.state.gameStage) && X > button.minX && X < button.maxX && Y > button.minY && Y < button.maxY ||
                !button.gameStage && X > button.minX && X < button.maxX && Y > button.minY && Y < button.maxY
            ) {
                if (!button.over && button.onOver) button.onOver()
                button.over = true
                if (button.pointer) {
                    onAButton = true                    
                    state.mouseInfo.mouseOnHover = true
                }
            } else button.over = false
        }
        if (!onAButton) state.mouseInfo.mouseOnHover = false
    }

    document.addEventListener('click', (event) => {
        if (event.target?.id == 'canvas') {
            handleKeys({ event: { code: 'MouseClick' }, on: true })

            let X = Math.floor(event.pageX/window.innerWidth*1000)
            let Y = Math.floor(event.pageY/window.window.innerHeight*1000)

            if (state.index && !state.onChangeKeyBind) for (let i in state.buttons) {
                let button = state.buttons[i]
                if (
                    button.gameStage && button.gameStage.includes(state.game.state.gameStage) && X > button.minX && X < button.maxX && Y > button.minY && Y < button.maxY && button.onClick ||
                    !button.gameStage && X > button.minX && X < button.maxX && Y > button.minY && Y < button.maxY && button.onClick
                ) {
                    if (button.songClick) {
                        state.game.playSong(button.songClick)
                    }
                    button.onClick()
                }
            }
        }
    })

    document.getElementById('body').onwheel = (event) => {
        if (event.deltaY < 0) handleKeys({ event: { code: 'WheelUp' }, on: true })
        else handleKeys({ event: { code: 'WheelDown' }, on: true })
    }

    document.addEventListener('keydown', (event) => handleKeys({ event, on: true }))
    document.addEventListener('keyup', (event) => handleKeys({ event, on: false }))
    
    function handleKeys({ event, on }) {
        let keyPressed = event.code
        let lastClick = state.keys[keyPressed]
        let hold = !state.keys[keyPressed] || +new Date()-state.keys[keyPressed]?.time <= 20
        state.keys[keyPressed] = {
            key: event.key || '',
            code: keyPressed || '',
            hold,
            clicked: on,
            time: +new Date(),
            lastClickTime: lastClick?.time || null
        }
        

    }

    return {
        state,
        handleKeys
    }
}