export default async (canvas, index, Listener, functions) => {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(100, 100, 100, 0.5)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i in index.state.individuals) {
        let individual = index.state.individuals[i]
        individual.X = canvas.width*0.15+individual.variantX
        individual.Y = canvas.height-canvas.height*0.2-individual.distance

        if (!individual.dead) {
            let ballonsImage = index.state.images['imgs/balloons.png']
            if (individual.ballon) {
                individual.Y = canvas.height-canvas.height*0.2-55
                ctx.drawImage(ballonsImage.image, individual.X-((individual.size*1.5-individual.size)/2), individual.Y-individual.size, individual.size*1.5, -individual.size*1.5)
            }

            ctx.fillStyle = individual.color || 'red'
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 2
            ctx.fillRect(individual.X, individual.Y, individual.size, -individual.size)
            ctx.strokeRect(individual.X, individual.Y, individual.size, -individual.size)
        }
    }

    for (let i in index.state.mapObjects) {
        let object = index.state.mapObjects[i]

        if (object.X >= -object.width) {
            object.Y = canvas.height-canvas.height*0.2-object.altitude

            ctx.fillStyle = object.color || 'green'
            ctx.strokeStyle = 'rgb(50, 50, 50)'
            ctx.lineWidth = 2
            ctx.fillRect(object.X, object.Y, object.width, -object.height)
            ctx.strokeRect(object.X, object.Y, object.width, -object.height)
        }
    }

    ctx.fillStyle = '#777'
    ctx.fillRect(0, canvas.height-canvas.height*0.2+4, canvas.width, canvas.height*0.2)

    ctx.fillStyle = 'black'
    ctx.fillRect(0, canvas.height-canvas.height*0.2, canvas.width, 5)
}