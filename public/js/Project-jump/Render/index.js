export default async function render(canvas, index, Listener) {
    if (+new Date()-index.state.fps.split('-')[1] > 1000) {
        index.state.changeRenderTypeCount += 1
        index.state.fpsDisplay = index.state.fps.split('-')[0]
        index.state.fps = `0-${+new Date()}`
    }
    index.state.fps = `${Number(index.state.fps.split('-')[0]) + 1}-${index.state.fps.split('-')[1]}`

    canvas.style.filter = index.state.screenFilter
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.backgroundImage = 'none'
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const functions = require('./functions').default(canvas, index, Listener)

    require('./RenderMap').default(canvas, index, Listener, functions)
    require('./RenderScreenInformation').default(canvas, index, Listener, functions)

    index.Loop()

    window.requestAnimationFrame(() => render(canvas, index, Listener))
}