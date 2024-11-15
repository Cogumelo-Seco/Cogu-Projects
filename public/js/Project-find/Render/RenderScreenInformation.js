export default async (canvas, index, Listener, functions) => {
    const ctx = canvas.getContext('2d')

    ctx.font = `bold 11px Arial`
    functions.fillText({
        style: `hsl(${index.state.rainbowColor}, 100%, 40%)`,
        style2: `hsl(${index.state.rainbowColor+180}, 100%, 40%)`,
        text: 'Created by: Cogu',
        x: canvas.width-ctx.measureText('Created by: Cogu').width-5,
        y: canvas.height-5,
        add: 1
    })

    functions.fillText({
        style: `hsl(${index.state.rainbowColor}, 100%, 40%)`,
        style2: `hsl(${index.state.rainbowColor+180}, 100%, 40%)`,
        text: `${index.state.fpsDisplay}FPS`,
        x: (canvas.width-5)-ctx.measureText(`${index.state.fpsDisplay}FPS`).width,
        y: 15,
        add: 1
    })

    ctx.font = `bold 20px Arial`
    
    functions.fillText({
        text: `Geração: ${index.state.mapInfo.generation}`,
        x: 5,
        y: 55,
        add: 2
    })
    functions.fillText({
        text: `Geração com sucesso: ${index.state.mapInfo.endGeneration}`,
        x: 5,
        y: 85,
        add: 2
    })
    /*
    functions.fillText({
        text: `Distância: ${index.state.mapInfo.distance}`,
        x: 5,
        y: 85,
        add: 2
    })
    functions.fillText({
        text: `Mapeado: ${index.state.mapInfo.maped}/${index.state.mapInfo.width*index.state.mapInfo.height}`,
        x: 5,
        y: 115,
        add: 2
    })
    functions.fillText({
        text: `Pontos: ${index.state.mapInfo.points}`,
        x: 5,
        y: 145,
        add: 2
    })
/*
    let cursorX = window.innerWidth*Listener.state.mouseInfo.x
    let cursorY = window.innerHeight*Listener.state.mouseInfo.y

    let cursorImage = index.state.images[`imgs/cursor${Listener.state.mouseInfo.mouseOnHover ? '-hover' : ''}.png`]
    if (cursorImage && (Listener.state.mouseInfo.mouseOnHover || Listener.state.mouseInfo.lastMoveTime+3000 >= +new Date())) ctx.drawImage(cursorImage.image, cursorX, cursorY, 30, 30)

    let transitionAnimation = index.state.animations.transition

    ctx.globalAlpha = 1-transitionAnimation.frame/10
    ctx.fillStyle = `black`
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.globalAlpha = 1*/
}