export default async(Render, event) => {
    Render.ctx.font = `bold 11px Arial`
    Render.fillText({
        style: `hsl(${Render.rainbowColor}, 100%, 40%)`,
        style2: `hsl(${Render.rainbowColor+180}, 100%, 40%)`,
        text: 'Created by: Cogu',
        font: 'bold 11px Arial',
        x: Render.canvas.width-Render.ctx.measureText('Created by: Cogu').width-5,
        y: Render.canvas.height-5,
        add: 1
    })

    Render.fillText({
        style: `hsl(${Render.rainbowColor}, 100%, 40%)`,
        style2: `hsl(${Render.rainbowColor+180}, 100%, 40%)`,
        text: Render.fpsDisplay+'FPS',
        font: 'bold 11px Arial',
        x: Render.canvas.width-Render.ctx.measureText(Render.fpsDisplay+'FPS').width-5,
        y: 15,
        add: 1
    })
}