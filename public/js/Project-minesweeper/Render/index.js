export default async function render(index) {
    const FPSElement = document.getElementById('FPS')
    if (+new Date()-index.state.fps.split('-')[1] > 1000) {
        index.state.changeRenderTypeCount += 1
        FPSElement.innerText = index.state.fps.split('-')[0]+'FPS'
        index.state.fps = `0-${+new Date()}`
    }
    index.state.fps = `${Number(index.state.fps.split('-')[0]) + 1}-${index.state.fps.split('-')[1]}`

    /*canvas.style.filter = index.state.screenFilter
    canvas.width = window.innerWidth//+(index.state.screenZoom/2)
    canvas.height = window.innerHeight//+(index.state.screenZoom/2)
    canvas.style.backgroundImage = 'none'
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const functions = require('./functions').default(canvas, index, Listener)

    //require('./RenderMap').default(canvas, index, Listener, functions)
    require('./RenderScreenInformation').default(canvas, index, Listener, functions)*/

    require('./RenderMap').default(index)
    require('./RenderHUD').default(index)

    index.Loop()
    //window.requestAnimationFrame(() => render(index))
    setTimeout(() => render(index), 0)
}