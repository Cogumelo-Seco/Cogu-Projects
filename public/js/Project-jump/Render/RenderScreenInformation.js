export default async (canvas, index, Listener, functions) => {
    const ctx = canvas.getContext('2d')

    let bestIndividual = ((Object.values(index.state.individuals).filter(i => !i.dead)).sort((a, b) => b.score-a.score))[0]

    ctx.fillStyle = '#999'
    ctx.fillRect(0, 0, canvas.width, 150)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 150, canvas.width, 5)

    if (bestIndividual) {
        let size = 25
        let X = canvas.width*0.4+60
        let Y = 150-bestIndividual.distance
        let ballonsImage = index.state.images['imgs/balloons.png']
        if (bestIndividual.ballon) {
            Y = 150-55
            ctx.drawImage(ballonsImage.image, X-((size*1.5-size)/2), Y-size, size*1.5, -size*1.5)
        }

        ctx.font = 'bold 11px Arial'
        ctx.fillStyle = `hsl(${bestIndividual.color}, 100%, 50%)`
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2
        ctx.fillRect(X, Y, size, -size)
        ctx.strokeRect(X, Y, size, -size)
        functions.fillText({
            style: `hsl(${bestIndividual.color-100}, 100%, 50%)`,
            text: ('0000'+bestIndividual.id).slice(-4),
            x: X+(size/2-ctx.measureText(('0000'+bestIndividual.id).slice(-4)).width/2),
            y: Y-(size/2)+5,
        })

        let neuronSize = 8
        let neuralX = canvas.width*0.82
        let neuralY = 0
        ctx.lineWidth = 1
        
        for (let i in bestIndividual.dataValue1) {
            neuralY += 150/(Object.values(bestIndividual.dataValue1).length+1)
            let nextNeuralY = 0

            for (let i in bestIndividual.dataValue2) {
                nextNeuralY += 150/(Object.keys(bestIndividual.dataValue2).length+1)

                ctx.strokeStyle = 'hsl(220, 0%, 10%)'
                ctx.beginPath();
                ctx.moveTo(neuralX+(neuronSize/2), neuralY+(neuronSize/2));
                ctx.lineTo(canvas.width*0.9+(neuronSize/2), nextNeuralY+(neuronSize/2));
                ctx.stroke();
            }

            ctx.fillStyle = 'hsl(220, 0%, 0%)'
            ctx.beginPath();
            ctx.arc(neuralX+(neuronSize/2), neuralY+(neuronSize/2), neuronSize, 0, 2 * Math.PI)
            ctx.fill();

            ctx.font = `bold 13px Arial`
            functions.fillText({
                text: `[${bestIndividual.data[0][i].type}] ${(bestIndividual.dataValue1[i] || 0)?.toFixed(2)}`,
                x: neuralX-ctx.measureText(`[${bestIndividual.data[0][i].type}] ${(bestIndividual.dataValue1[i] || 0)?.toFixed(2)}`).width-8,
                y: neuralY+8,
                add: 1
            })
        }

        neuralX = canvas.width*0.9
        neuralY = 0
        for (let i in bestIndividual.dataValue2) {
            neuralY += 150/(Object.keys(bestIndividual.dataValue2).length+1)
            let neuronValue = bestIndividual.dataValue2[i]?.toFixed(2)
            let nextNeuralY = 0

            for (let i in bestIndividual.dataValue3) {
                nextNeuralY += 150/(Object.keys(bestIndividual.dataValue3).length+1)

                ctx.strokeStyle = neuronValue <= 0 ? 'hsl(220, 0%, 10%)' : 'hsl(220, 100%, 30%)'
                ctx.beginPath();
                ctx.moveTo(neuralX+(neuronSize/2), neuralY+(neuronSize/2));
                ctx.lineTo(canvas.width*0.93+(neuronSize/2), nextNeuralY+(neuronSize/2));
                ctx.stroke();
            }

            ctx.fillStyle = neuronValue <= 0 ? 'hsl(220, 100%, 0%)' : 'hsl(220, 100%, 50%)'
            ctx.beginPath();
            ctx.arc(neuralX+(neuronSize/2), neuralY+(neuronSize/2), neuronSize, 0, 2 * Math.PI)
            ctx.fill();

            ctx.font = `bold 13px Arial`
            functions.fillText({
                text: neuronValue,
                x: neuralX-ctx.measureText(neuronValue).width-8,
                y: neuralY+8,
                add: 1
            })
        }

        neuralX = canvas.width*0.93
        neuralY = 0
        for (let i in bestIndividual.dataValue3) {
            neuralY += 150/(Object.keys(bestIndividual.dataValue3).length+1)
            let neuron = bestIndividual.dataValue3[i]
            
            ctx.fillStyle = !neuron.value ? 'hsl(220, 100%, 0%)' : 'hsl(220, 100%, 50%)'
            ctx.beginPath();
            ctx.arc(neuralX+(neuronSize/2), neuralY+(neuronSize/2), neuronSize, 0, 2 * Math.PI)
            ctx.fill();

            functions.fillText({
                text: neuron.type,
                x: neuralX+neuronSize+8,
                y: neuralY+8,
                add: 1
            })
        }

        ctx.font = `bold 18px Arial`

        functions.fillText({
            style: 'rgb(40, 130, 240)',
            text: `Melhor indivíduo`,
            x: canvas.width*0.4+7,
            y: 20,
            add: 2
        })
        /*functions.fillText({
            style: 'rgb(40, 130, 240)',
            text: `${("0000"+bestIndividual.id).slice(-4)}-${(index.state.generation+"000").slice(0, 3)}`,
            x: canvas.width*0.4+160,
            y: 50,
            add: 2
        })*/
        functions.fillText({
            style: 'white',
            text: `Pontuação: ${bestIndividual.score}`,
            x: canvas.width*0.4+160,
            y: 70,
            add: 2
        })
        functions.fillText({
            style: 'white',
            text: `Pulos: ${bestIndividual.jumpCount}`,
            x: canvas.width*0.4+160,
            y: 90,
            add: 2
        })
        functions.fillText({
            style: 'white',
            text: `Balões: ${bestIndividual.ballonCount}`,
            x: canvas.width*0.4+160,
            y: 110,
            add: 2
        })
    }

    let initialInfosTextY = canvas.height-canvas.height*0.23

    //ctx.fillStyle = 'black'
    //ctx.fillRect(canvas.width*0.4-5, 0, 5, 150)

    ctx.font = `bold 18px Arial`
    functions.fillText({
        style: 'rgb(40, 130, 240)',//'rgb(255, 200, 40)',
        text: `Geração: ${index.state.generation}`,
        x: 5,
        y: initialInfosTextY+20,
        add: 2
    })
    functions.fillText({
        text: `Vivos: ${index.state.alive}/${index.state.numberOfIndividuals}`,
        x: 5,
        y: initialInfosTextY+40,
        add: 2
    })
    functions.fillText({
        text: `Velocidade: ${index.state.speed.toFixed(2)}`,
        x: 5,
        y: initialInfosTextY+60,
        add: 2
    })
    functions.fillText({
        text: `Pontuação: ${index.state.score}`,
        x: 5,
        y: initialInfosTextY+80,
        add: 2
    })
    functions.fillText({
        style: index.state.score >= index.state.highestScore ? 'rgb(40, 130, 240)' : 'white',
        text: `Maior pontuação: ${index.state.highestScore}`,
        x: 5,
        y: initialInfosTextY+100,
        add: 2
    })

    functions.fillText({
        style: 'rgb(100, 100, 150)',
        text: `Tempo de teste: ${new Date((+new Date() - index.state.testTimeStart)-75600000).toLocaleTimeString()}`,
        x: canvas.width-ctx.measureText(`Tempo de teste: ${new Date((+new Date() - index.state.testTimeStart)-75600000).toLocaleTimeString()}`).width-5,
        y: initialInfosTextY+20,
        add: 2
    })


    /* -------- */

    let graphicWidth = canvas.width*0.4//canvas.width/5
    let graphicHeight = 150//graphicWidth/2
    let graphicX = 2//canvas.width-(canvas.width/12)-graphicWidth
    let graphicY = 2//120+((canvas.height-120)/2-(canvas.width/4/2))

    ctx.strokeStyle = 'black'//'rgb(20, 20, 50)'
    ctx.lineWidth = 5
    ctx.beginPath();
    ctx.rect(graphicX, graphicY, graphicWidth, graphicHeight)
    ctx.stroke()

    graphicX += 10
    graphicY += 10
    graphicHeight -= 20
    graphicWidth -= 20

    function renderGraphic(graphicData, color, color2) {
        let maxValue = JSON.parse(JSON.stringify(graphicData)).sort((a, b) => b-a)[0]

        ctx.lineWidth = 2
        ctx.strokeStyle = color
        let lastGraphicInfo = { x: NaN,  y: NaN }
        if (graphicData.length <= 5000) for (let i in graphicData) {
            let percent = (graphicData[i] || 1)/maxValue
            let percentNext = (graphicData[Number(i)+1] || maxValue)/maxValue

            let x = graphicX+(graphicWidth*(i/(graphicData.length-1)))-ctx.lineWidth
            let y = graphicY+(graphicHeight-graphicHeight*(percent))
            if (isNaN(lastGraphicInfo).x) lastGraphicInfo = { x, y }

            ctx.strokeStyle = y > lastGraphicInfo.y ? color2 || color : color

            ctx.beginPath();
            ctx.moveTo(lastGraphicInfo.x, lastGraphicInfo.y);
            ctx.lineTo(x, y);
            ctx.stroke();

            lastGraphicInfo = { x, y }
        }
    }
    renderGraphic(index.state.scoresArr, 'rgb(40, 130, 240)', 'rgb(240, 40, 40)')

    /* -------- */

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
}