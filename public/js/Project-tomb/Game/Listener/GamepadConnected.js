export default async(Listener, event) => {
    console.log(
        "Gamepad connected at index %d: %s. %d buttons, %d axes.",
        event.gamepad.index,
        event.gamepad.id,
        event.gamepad.buttons.length,
        event.gamepad.axes.length
    );

    const replaces = (b) => {
        switch(b) {
            case '0':
                return 'Enter'
            case '1':
                return 'Escape'
            case '9':
                return 'Enter'
            case '12':
                return 'ArrowUp'
            case '13':
                return 'ArrowDown'
            case '14':
                return 'ArrowLeft'
            case '15':
                return 'ArrowRight'
        }
        return b
    }

    const verifyButtonPressed  = (b) => typeof b === "object" ? b.pressed : b === 1.0
    const gamepadLoop = () => {
        const gamepads = navigator.getGamepads().filter((g) => g);
        if (!gamepads || !gamepads[0]) return Listener.gamepad.loop = false
        Listener.gamepad.loop = true
        let gamepad = gamepads[0]

        if (gamepad.axes[0] < -0.5) Listener.handleKeys({ event: { code: replaces('14') }, on: true })
        if (gamepad.axes[0] > 0.5) Listener.handleKeys({ event: { code: replaces('15') }, on: true })
        if (gamepad.axes[1] < -0.5) Listener.handleKeys({ event: { code: replaces('12') }, on: true })
        if (gamepad.axes[1] > 0.5) Listener.handleKeys({ event: { code: replaces('13') }, on: true })

        if (gamepad.axes[2] < -0.5) Listener.handleKeys({ event: { code: 'ArrowLeft1' }, on: true })
        if (gamepad.axes[2] > 0.5) Listener.handleKeys({ event: { code: 'ArrowRight1' }, on: true })
        if (gamepad.axes[3] < -0.5) Listener.handleKeys({ event: { code: 'ArrowUp1' }, on: true })
        if (gamepad.axes[3] > 0.5) Listener.handleKeys({ event: { code: 'ArrowDown1' }, on: true })

        for (let i in gamepad.buttons) {
            let buttonId = i
            let buttonPressed = verifyButtonPressed(gamepad.buttons[i])
            if (Listener.gamepad.buttons[buttonId] == undefined) Listener.gamepad.buttons[buttonId] = {
                pressed: 0,
                count: 0
            }

            if (+new Date()-Listener.gamepad.buttons[buttonId].pressed >= 150 && buttonPressed || Listener.gamepad.buttons[buttonId].pressed && !buttonPressed) {
                Listener.gamepad.buttons[buttonId].pressed = buttonPressed ? +new Date() : 0
                Listener.gamepad.buttons[buttonId].count = buttonPressed ? Listener.gamepad.buttons[buttonId].count+1 : 1
                Listener.handleKeys({ event: { code: replaces(i), repeat: Listener.gamepad.buttons[buttonId].count >= 3 }, on: buttonPressed })
            }
        }

        window.requestAnimationFrame(gamepadLoop)
    }
    if (!Listener.gamepad.loop) gamepadLoop()
}