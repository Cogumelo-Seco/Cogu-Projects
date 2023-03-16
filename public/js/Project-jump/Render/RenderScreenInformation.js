export default async (canvas, index, Listener, functions) => {
    const ctx = canvas.getContext('2d')

    let bestIndividual = index.state.bestIndividual

    ctx.fillStyle = '#999'
    ctx.fillRect(0, 0, canvas.width, 150)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 150, canvas.width, 5)

    if (bestIndividual) {
        let Y = 150-bestIndividual.distance
        ctx.fillStyle = bestIndividual.color || 'red'
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2
        ctx.fillRect(canvas.width*0.4+70, Y, 25, -25)
        ctx.strokeRect(canvas.width*0.4+70, Y, 25, -25)

        let neuronSize = 10
        let neuralX = canvas.width*0.8
        let neuralY = 0
        for (let i in bestIndividual.data) {
            neuralY += 150/(bestIndividual.data.length+1)
            let neuronValue = bestIndividual.data[i].value?.toFixed(2)//bestIndividual.dataValue1[i]?.toFixed(2)
            let nextNeuralY = 0

            for (let i in bestIndividual.dataValue2) {
                nextNeuralY += 150/(Object.keys(bestIndividual.dataValue2).length+1)

                ctx.strokeStyle = neuronValue <= 0 ? 'hsl(13, 50%, 10%)' : 'hsl(115, 50%, 20%)'
                ctx.beginPath();
                ctx.moveTo(neuralX+(neuronSize/2), neuralY+(neuronSize/2));
                ctx.lineTo(canvas.width*0.9+(neuronSize/2), nextNeuralY+(neuronSize/2));
                ctx.stroke();
            }

            ctx.fillStyle = neuronValue <= 0 ? 'hsl(13, 100%, 30%)' : 'hsl(115, 100%, 25%)'
            ctx.beginPath();
            ctx.arc(neuralX+(neuronSize/2), neuralY+(neuronSize/2), neuronSize, 0, 2 * Math.PI)
            ctx.fill();

            ctx.font = `bold 13px Arial`
            functions.fillText({
                text: `[${bestIndividual.data[i].type}] ${neuronValue}`,
                x: neuralX-ctx.measureText(`[${bestIndividual.data[i].type}] ${neuronValue}`).width-8,
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

                ctx.strokeStyle = neuronValue <= 0 ? 'hsl(13, 50%, 10%)' : 'hsl(115, 50%, 20%)'
                ctx.beginPath();
                ctx.moveTo(neuralX+(neuronSize/2), neuralY+(neuronSize/2));
                ctx.lineTo(canvas.width*0.95+(neuronSize/2), nextNeuralY+(neuronSize/2));
                ctx.stroke();
            }

            ctx.fillStyle = neuronValue <= 0 ? 'hsl(13, 100%, 30%)' : 'hsl(115, 100%, 25%)'
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

        neuralX = canvas.width*0.95
        neuralY = 0
        for (let i in bestIndividual.dataValue3) {
            neuralY += 150/(Object.keys(bestIndividual.dataValue3).length+1)
            let neuronValue = bestIndividual.dataValue3[i]
            
            ctx.fillStyle = neuronValue ? 'hsl(115, 100%, 25%)' : 'hsl(13, 100%, 30%)'
            ctx.beginPath();
            ctx.arc(neuralX+(neuronSize/2), neuralY+(neuronSize/2), neuronSize, 0, 2 * Math.PI)
            ctx.fill();

            functions.fillText({
                text: 'Pulo',
                x: neuralX+neuronSize+8,
                y: neuralY+8,
                add: 1
            })
        }

        ctx.font = `bold 18px Arial`

        functions.fillText({
            style: 'rgb(255, 200, 40)',
            text: `Melhor indivíduo`,
            x: canvas.width*0.4+5,
            y: 20,
            add: 2
        })
    
        functions.fillText({
            style: 'white',
            text: `Pontuação: ${bestIndividual.score}`,
            x: canvas.width*0.4+160,
            y: 50,
            add: 2
        })
        functions.fillText({
            style: 'white',
            text: `Pulos: ${bestIndividual.jumpCount}`,
            x: canvas.width*0.4+160,
            y: 70,
            add: 2
        })
    }

    ctx.fillStyle = 'black'
    ctx.fillRect(canvas.width*0.4-5, 0, 5, 150)
    

    ctx.font = `bold 18px Arial`
    functions.fillText({
        style: 'rgb(255, 200, 40)',
        text: `Geração: ${index.state.generation}`,
        x: 5,
        y: 25,
        add: 2
    })
    functions.fillText({
        text: `Vivos: ${index.state.alive}/${index.state.numberOfIndividuals}`,
        x: 5,
        y: 50,
        add: 2
    })
    functions.fillText({
        text: `Velocidade: ${index.state.speed.toFixed(2)}`,
        x: 5,
        y: 75,
        add: 2
    })
    functions.fillText({
        text: `Pontuação: ${index.state.score}`,
        x: 5,
        y: 100,
        add: 2
    })
    functions.fillText({
        style: index.state.score >= index.state.highestScore ? 'rgb(255, 200, 40)' : 'white',
        text: `Maior pontuação: ${index.state.highestScore}`,
        x: 5,
        y: 125,
        add: 2
    })

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