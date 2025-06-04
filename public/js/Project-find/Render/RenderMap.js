export default async (canvas, index, Listener, functions) => {
    const ctx = canvas.getContext('2d')

    let mapWidthTiles = index.state.mapInfo.width
    let mapHeightTiles = index.state.mapInfo.height
    let mapWidth = canvas.height < canvas.width ? canvas.height : canvas.width
    let mapHeight = canvas.height < canvas.width ? canvas.height : canvas.width
    let tileSize = mapWidth/mapWidthTiles
    let initialX = canvas.width/2-mapWidth/2
    let initialY = canvas.height/2-mapHeight/2

    ctx.fillStyle = 'black'
    ctx.fillRect(initialX, initialY, mapWidth, mapHeight)

    for (let Xpos = 0;Xpos < mapWidthTiles;Xpos++) {
        for (let Ypos = 0;Ypos < mapHeightTiles;Ypos++) {
            let X = Xpos*tileSize+initialX
            let Y = Ypos*tileSize+initialY

            if (index.state.mapInfo.endObject.X == Xpos && index.state.mapInfo.endObject.Y == Ypos) {
                ctx.fillStyle = 'yellow'
                functions.fillTile(X, Y, tileSize, tileSize)
            } else /*if (index.state.mapInfo.startObject.X == Xpos && index.state.mapInfo.startObject.Y == Ypos) {
                ctx.fillStyle = 'red'
                functions.fillTile(X, Y, tileSize, tileSize)
            } else*/ {
                let tileInfo = null
                try { tileInfo = index.state.mapInfo.mapData[Ypos][Xpos] } catch {}

                if (tileInfo && tileInfo.type == 'air') {
                    let distanceValue = Number(tileInfo.distanceValue)

                    if (!isNaN(distanceValue)) {
                        ctx.fillStyle = `hsl(275, 100%, ${50-(distanceValue*1.7)}%)`
                        //ctx.fillStyle = tileInfo.traced ? `hsl(${245+(tileInfo.distanceValue/index.state.mapInfo.distanceValue*25)}, 100%, 40%)` /*'rgb(150, 120, 50)'*/ : '#AAA'
                        functions.fillTile(X, Y, tileSize, tileSize)

                        ctx.font = `bold ${tileSize*0.4}px Arial`
                        ctx.fillStyle = tileInfo.traced ? `hsl(${360-(245+(tileInfo.distanceValue/index.state.mapInfo.distanceValue*25))}, 100%, 40%)` : 'rgb(150, 150, 150)'
                        //ctx.fillText(isNaN(distanceValue) ? '??' : distanceValue, X+tileSize/2-ctx.measureText(isNaN(distanceValue) ? '??' : distanceValue).width/2, Y+tileSize/2+5);
                    }
                } else if (tileInfo && tileInfo.type == 'wall') {
                    ctx.fillStyle = 'rgba(40, 40, 40)'
                    functions.fillTile(X, Y, tileSize, tileSize)
                } else {
                    ctx.fillStyle = 'purple'//'#'+Math.floor(Math.random()*16777215).toString(16);
                    functions.fillTile(X, Y, tileSize, tileSize)
                }
            }
        }
    }

    
    let individual = index.state.mapInfo.individual

    for (let traceData of individual.trace) {
        ctx.fillStyle = 'rgba(255, 100, 0, 0.5)'
        functions.fillTile(traceData.X*tileSize+initialX, traceData.Y*tileSize+initialY, tileSize, tileSize);
    }

    ctx.fillStyle = individual.color || 'red'
    functions.fillTile(individual.X*tileSize+initialX, individual.Y*tileSize+initialY, tileSize, tileSize);

    ctx.strokeStyle = 'rgb(96, 0, 183)'
    ctx.lineWidth = 5
    ctx.strokeRect(initialX, initialY, mapWidth, mapHeight)
}