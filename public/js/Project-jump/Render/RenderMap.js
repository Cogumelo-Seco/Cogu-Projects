export default async (canvas, index, Listener, functions) => {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(100, 100, 100, 0.5)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let baseY = canvas.height-canvas.height*0.23

    let count = 0
    for (let i in index.state.individuals) {
        let individual = index.state.individuals[i]
        individual.X = canvas.width*0.15+individual.variantX
        individual.Y = baseY-individual.distance

        if (!individual.dead && count <= 100) {
            count += 1
            let ballonsImage = index.state.images['imgs/balloons.png']
            if (individual.ballon) {
                individual.Y = baseY-55
                ctx.drawImage(ballonsImage.image, individual.X-((individual.size*1.5-individual.size)/2), individual.Y-individual.size, individual.size*1.5, -individual.size*1.5)
            }

            ctx.font = 'bold 11px Arial'
            ctx.fillStyle = `hsl(${individual.color}, 100%, 50%)`
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 2
            ctx.fillRect(individual.X, individual.Y, individual.size, -individual.size)
            ctx.strokeRect(individual.X, individual.Y, individual.size, -individual.size)
            functions.fillText({
                style: 'black',
                text: ('0000'+individual.id).slice(-4),
                x: individual.X+(individual.size/2-ctx.measureText(('0000'+individual.id).slice(-4)).width/2),
                y: individual.Y-(individual.size/2)+5,
            })
        }
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