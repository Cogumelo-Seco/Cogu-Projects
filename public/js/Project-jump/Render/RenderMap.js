export default async (canvas, index, Listener, functions) => {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(100, 100, 100, 0.5)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let baseY = canvas.height-canvas.height*0.15

    let count = 0
    let bestIndividuals = ((Object.values(index.state.individuals).filter(i => i.dead === false)).sort((a, b) => b.score-a.score))
    let individuals = bestIndividuals.slice(0, 100)
    for (let i in individuals) {
        let individual = individuals[i]
        individual.X = canvas.width*0.15+individual.variantX
        individual.Y = baseY-individual.distance

        count += 1

        let individualWidth = individual.width
        let individualHeight = individual.height

        let ballonsImage = index.state.images['imgs/balloons.png']
        if (individual.ballon) {
            individual.Y = baseY-55
            ctx.drawImage(ballonsImage.image, individual.X-((individualWidth*1.5-individualWidth)/2), individual.Y-individualHeight, individualWidth*1.5, -individualHeight*1.5)
        }

        ctx.font = 'bold 11px Arial'
        ctx.fillStyle = `hsl(${individual.color}, 100%, 50%)`
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2
        ctx.fillRect(individual.X, individual.Y, individualWidth, -individualHeight)
        ctx.strokeRect(individual.X, individual.Y, individualWidth, -individualHeight)
        functions.fillText({
            style: 'black',
            text: ('0000'+individual.id).slice(-4),
            x: individual.X+(individualWidth/2-ctx.measureText(('0000'+individual.id).slice(-4)).width/2),
            y: individual.Y-(individualHeight/2)+5,
        })
    }

    for (let i in index.state.mapObjects) {
        let object = index.state.mapObjects[i]

        if (object.X >= -object.width) {
            object.Y = baseY-object.altitude

            ctx.fillStyle = object.color || 'green'
            ctx.strokeStyle = 'red'
            ctx.lineWidth = 2
            ctx.fillRect(object.X, object.Y, object.width, -object.height)
            ctx.strokeRect(object.X, object.Y, object.width, -object.height)
        }
    }

    ctx.fillStyle = '#777'
    ctx.fillRect(0, baseY+4, canvas.width, canvas.height*0.23)

    ctx.fillStyle = 'black'
    ctx.fillRect(0, baseY, canvas.width, 5)
}