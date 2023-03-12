export default async (canvas, index, Listener, functions) => {
    const ctx = canvas.getContext('2d')

    let mapWidthTiles = index.state.mapInfo.width
    let mapHeightTiles = index.state.mapInfo.height
    let mapWidth = canvas.height//20*(canvas.width/canvas.height*10)
    let mapHeight = canvas.height//20*(canvas.width/canvas.height*10)
    let tileSize = mapWidth/mapWidthTiles
    let initialX = canvas.width/2-mapWidth/2
    let initialY = canvas.height/2-mapHeight/2

    ctx.fillStyle = 'white'
    ctx.fillRect(initialX, initialY, mapWidth, mapHeight)

    for (let Xpos = 0;Xpos < mapWidthTiles;Xpos++) {
        for (let Ypos = 0;Ypos < mapHeightTiles;Ypos++) {
            let X = Xpos*tileSize+initialX
            let Y = Ypos*tileSize+initialY

            if (index.state.mapInfo.endObject.X == Xpos && index.state.mapInfo.endObject.Y == Ypos) {
                ctx.fillStyle = 'yellow'
                ctx.fillRect(X, Y, tileSize, tileSize)
            } else if (index.state.mapInfo.startObject.X == Xpos && index.state.mapInfo.startObject.Y == Ypos) {
                ctx.fillStyle = 'green'
                ctx.fillRect(X, Y, tileSize, tileSize)
            } else {
                let tileInfo = null
                try { tileInfo = index.state.mapInfo.mapData[Ypos][Xpos] } catch {}

                if (tileInfo && tileInfo.type == 'air') {
                    let distanceValue = Number(tileInfo.distanceValue)
                    
                    //ctx.fillStyle = tileInfo.traced ? 'rgb(150, 120, 50)' : isNaN(distanceValue) ? '#AAA' : `hsl(0, 80%, ${50-(distanceValue*2) <= 5 ? 5 : 50-(distanceValue*2)}%)`
                    ctx.fillStyle = tileInfo.traced ? 'rgb(150, 120, 50)' : '#AAA'
                    ctx.fillRect(X, Y, tileSize, tileSize)

                    ctx.font = `bold ${tileSize*0.4}px Arial`
                    ctx.fillStyle = 'rgb(50, 50, 50)'
                    ctx.fillText(isNaN(distanceValue) ? '' : distanceValue, X+tileSize/2-ctx.measureText(isNaN(distanceValue) ? '' : distanceValue).width/2, Y+tileSize/2+5);
                } else {
                    ctx.fillStyle = 'purple'//'#'+Math.floor(Math.random()*16777215).toString(16);
                    ctx.fillRect(X, Y, tileSize, tileSize)
                }
            }

            ctx.strokeStyle = 'black'
            ctx.lineWidth = 2
            ctx.strokeRect(X, Y, tileSize, tileSize)
        }
    }
    /*for (let X = initialX;X <= initialX+(mapWidthTiles*tileSize);X += tileSize) {
        for (let Y = initialY;Y <= initialY+(mapWidthTiles*tileSize);Y += tileSize) {
            let Xpos = Number.parseInt((X-initialX)/tileSize)
            let Ypos = Number.parseInt((Y-initialY)/tileSize)
        
            if (index.state.mapInfo.endObject.X == Xpos && index.state.mapInfo.endObject.Y == Ypos) {
                ctx.fillStyle = 'yellow'
                ctx.fillRect(X, Y, tileSize, tileSize)
            } else if (index.state.mapInfo.startObject.X == Xpos && index.state.mapInfo.startObject.Y == Ypos) {
                ctx.fillStyle = 'green'
                ctx.fillRect(X, Y, tileSize, tileSize)
            } else {
                let tileInfo = null
                try { tileInfo = index.state.mapInfo.mapData[Ypos][Xpos] } catch {}

                if (tileInfo && tileInfo.type == 'air') {
                    let distanceValue = Number(tileInfo.distanceValue)
                    
                    //ctx.fillStyle = tileInfo.traced ? 'rgb(150, 120, 50)' : isNaN(distanceValue) ? '#AAA' : `hsl(0, 80%, ${50-(distanceValue*2) <= 5 ? 5 : 50-(distanceValue*2)}%)`
                    ctx.fillStyle = tileInfo.traced ? 'rgb(150, 120, 50)' : '#AAA'
                    ctx.fillRect(X, Y, tileSize, tileSize)

                    ctx.font = `bold ${tileSize*0.4}px Arial`
                    ctx.fillStyle = 'rgb(50, 50, 50)'
                    ctx.fillText(isNaN(distanceValue) ? '' : distanceValue, X+tileSize/2-ctx.measureText(isNaN(distanceValue) ? '' : distanceValue).width/2, Y+tileSize/2+5);
                } else {
                    ctx.fillStyle = 'purple'//'#'+Math.floor(Math.random()*16777215).toString(16);
                    ctx.fillRect(X, Y, tileSize, tileSize)
                }
            }

            ctx.strokeStyle = 'black'
            ctx.lineWidth = 2
            ctx.strokeRect(X, Y, tileSize, tileSize)
        }
    }*/

    ctx.strokeStyle = 'rgb(40, 40, 40)'
    ctx.lineWidth = 5
    ctx.strokeRect(initialX, initialY, mapWidth, mapHeight)
}