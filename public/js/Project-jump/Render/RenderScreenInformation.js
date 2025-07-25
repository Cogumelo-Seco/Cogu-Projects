export default async (canvas, index, Listener, functions) => {
    const ctx = canvas.getContext('2d')

    let bestIndividual = ((Object.values(index.state.individuals).filter(i => !i.dead)).sort((a, b) => b.score-a.score))[0]

    ctx.fillStyle = '#999'
    ctx.fillRect(0, 0, canvas.width, 250)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 250, canvas.width, 5)

    if (bestIndividual) {
        let X = canvas.width*0.4+50
        let Y = 250-bestIndividual.distance
        let individualWidth = bestIndividual.width
        let individualHeight = bestIndividual.height

        let ballonsImage = index.state.images['imgs/balloons.png']
        if (bestIndividual.ballon) {
            Y = 250-55
            ctx.drawImage(ballonsImage.image, X-((individualWidth*1.5-individualWidth)/2), Y-individualHeight, individualWidth*1.5, -individualHeight*1.5)
        }

        ctx.font = 'bold 11px Arial'
        ctx.fillStyle = `hsl(${bestIndividual.color}, 100%, 50%)`
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2
        ctx.fillRect(X, Y, individualWidth, -individualHeight)
        ctx.strokeRect(X, Y, individualWidth, -individualHeight)
        functions.fillText({
            style: 'black',
            text: ('0000'+bestIndividual.id).slice(-4),
            x: X+(individualWidth/2-ctx.measureText(('0000'+bestIndividual.id).slice(-4)).width/2),
            y: Y-(individualHeight/2)+5,
        })

        let neuronSize = 8
        let neuralX = canvas.width*0.75
        let neuralY = 0
        ctx.lineWidth = 1
        
        for (let i in bestIndividual.dataValue1) {
            neuralY += 250/(Object.values(bestIndividual.dataValue1).length+1)
            let nextNeuralY = 0

            for (let i in bestIndividual.dataValue2) {
                nextNeuralY += 250/(Object.keys(bestIndividual.dataValue2).length+1)

                ctx.strokeStyle = 'hsl(220, 0%, 10%)'
                ctx.beginPath();
                ctx.moveTo(neuralX+(neuronSize/2), neuralY+(neuronSize/2));
                ctx.lineTo(canvas.width*0.88+(neuronSize/2), nextNeuralY+(neuronSize/2));
                ctx.stroke();
            }

            ctx.fillStyle = 'hsl(220, 0%, 0%)'
            ctx.beginPath();
            ctx.arc(neuralX+(neuronSize/2), neuralY+(neuronSize/2), neuronSize, 0, 2 * Math.PI)
            ctx.fill();

            ctx.font = `bold 13px Arial`
            functions.fillText({
                text: `[${bestIndividual.dataValue1[i].type}] ${(bestIndividual.dataValue1[i].value || 0)?.toFixed(2)}`,
                x: neuralX-ctx.measureText(`[${bestIndividual.dataValue1[i].type}] ${(bestIndividual.dataValue1[i].value || 0)?.toFixed(2)}`).width-8,
                y: neuralY+8,
                add: 1
            })
        }

        neuralX = canvas.width*0.88
        neuralY = 0
        let neuronCount = 0
        for (let i in bestIndividual.dataValue2) {
            neuralY += 250/(Object.keys(bestIndividual.dataValue2).length+1)
            let neuronValue = bestIndividual.dataValue2[i]//?.toFixed(2)
            let nextNeuralY = 0
            neuronCount += 1

            ctx.strokeStyle = neuronValue <= 0 ? 'hsl(220, 0%, 10%)' : `hsl(${(Number(neuronCount)/Object.keys(bestIndividual.dataValue2).length)*360}, 100%, 50%)`
            ctx.fillStyle = neuronValue <= 0 ? 'hsl(220, 0%, 10%)' : `hsl(${(Number(neuronCount)/Object.keys(bestIndividual.dataValue2).length)*360}, 100%, 50%)`

            for (let a in bestIndividual.dataValue3) {
                nextNeuralY += 250/(Object.keys(bestIndividual.dataValue3).length+1)
                
                if (Number(a) == Number(i.split(`-`)[0])) {
                    ctx.beginPath();
                    ctx.moveTo(neuralX+(neuronSize/2), neuralY+(neuronSize/2));
                    ctx.lineTo(canvas.width*0.93+(neuronSize/2), nextNeuralY+(neuronSize/2));
                    ctx.stroke();
                }
            }

            ctx.beginPath();
            ctx.arc(neuralX+(neuronSize/2), neuralY+(neuronSize/2), neuronSize, 0, 2 * Math.PI)
            ctx.fill();

            ctx.font = `bold 13px Arial`
            functions.fillText({
                text: neuronValue,
                x: neuralX-ctx.measureText(neuronValue).width-8,
                y: neuralY+8,
                style: Number(neuronValue) <= 0 ? '#F99' : 'white',
                add: 1
            })
        }

        neuralX = canvas.width*0.93
        neuralY = 0
        for (let i in bestIndividual.dataValue3) {
            neuralY += 250/(Object.keys(bestIndividual.dataValue3).length+1)
            let neuron = bestIndividual.dataValue3[i]
            
            ctx.fillStyle = neuron.value <= 0 ? 'hsl(220, 100%, 0%)' : 'hsl(130, 100%, 50%)'
            ctx.beginPath();
            ctx.arc(neuralX+(neuronSize/2), neuralY+(neuronSize/2), neuronSize, 0, 2 * Math.PI)
            ctx.fill();

            functions.fillText({
                text: `[${neuron.type}] ${neuron.value}`,
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
            y: 120,
            add: 2
        })
        functions.fillText({
            style: 'white',
            text: `Pontuação: ${bestIndividual.score}`,
            x: canvas.width*0.4+140,
            y: 150,
            add: 2
        })
        functions.fillText({
            style: 'white',
            text: `Pulos: ${bestIndividual.jumpCount}`,
            x: canvas.width*0.4+140,
            y: 170,
            add: 2
        })
        functions.fillText({
            style: 'white',
            text: `Balões: ${bestIndividual.ballonCount}`,
            x: canvas.width*0.4+140,
            y: 190,
            add: 2
        })
        functions.fillText({
            style: 'white',
            text: `Abaixadas: ${bestIndividual.downCount}`,
            x: canvas.width*0.4+140,
            y: 210,
            add: 2
        })
    }

    let initialInfosTextY = canvas.height-canvas.height*0.15

    ctx.font = `bold 18px Arial`
    functions.fillText({
        style: 'rgb(40, 130, 240)',
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
/*
    functions.fillText({
        style: 'rgb(100, 100, 150)',
        text: `Tempo de teste: ${new Date((+new Date() - index.state.testTimeStart)-75600000).toLocaleTimeString()}`,
        x: canvas.width-ctx.measureText(`Tempo de teste: ${new Date((+new Date() - index.state.testTimeStart)-75600000).toLocaleTimeString()}`).width-5,
        y: initialInfosTextY+20,
        add: 2
    })/*


    /* -------- */

    let graphicWidth = canvas.width*0.4
    let graphicHeight = 250
    let graphicX = 2
    let graphicY = 2

    ctx.strokeStyle = 'black'
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

        ctx.lineWidth = 4
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