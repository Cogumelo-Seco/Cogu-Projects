export class ListenerClass {
    constructor(gametate) {
        this.gameState = null
        this.renderState = null

        this.buttons = {},
        this.keys = {},
        this.gamepad = {
            loop: false,
            buttons: {}
        },
        this.mouseInfo = {
            x: NaN,
            y: NaN,
            mouseOnHover: false,
            lastMoveTime: 0
        }

        this.handleKeys = (event) => require('./HandleKeys.js').default(this, event)
        this.mouseClick = (event) => require('./MouseClick.js').default(this, event)
        this.onMouseMove = (event) => require('./OnMouseMove.js').default(this, event)
        this.onWheel = (event) => require('./OnWheel.js').default(this, event)
        this.gamepadConnected = (event) => require('./GamepadConnected.js').default(this, event)
        this.gamepadDisconnected = (event) => require('./GamepadDisconnected.js').default(this, event)

        this.start()
    }

    start() {
        document.onmousemove = (event) => this.onMouseMove(event)

        document.addEventListener('keydown', (event) => this.handleKeys({ event, on: true }))
        document.addEventListener('keyup', (event) => this.handleKeys({ event, on: false }))

        document.addEventListener('click', (event) => this.mouseClick(event))
        document.getElementById('body').onwheel = (event) => this.onWheel(event)

        window.addEventListener("gamepadconnected", (event) => this.gamepadConnected(event))

        window.addEventListener("gamepaddisconnected", (event) => this.gamepadDisconnected(event))
    }
}