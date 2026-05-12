export default async(Listener, event) => {
    if (event.deltaY < 0) Listener.handleKeys({ event: { code: 'WheelUp' }, on: true })
    else Listener.handleKeys({ event: { code: 'WheelDown' }, on: true })
}