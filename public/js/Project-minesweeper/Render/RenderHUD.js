export default async (index) => {
    const playerMovementsElement = document.getElementById('playerMovements')
    playerMovementsElement.innerText = ('00'+index.state.playerMovements).slice(-2)

    const playerTimeElement = document.getElementById('playerTime')
    let time = index.state.playerTime//(+new Date()-index.state.playerTime)/1000
    let seconds = ("00" +  Math.floor(time % 60)).slice(-2)
    let minutes = ("00" +  Math.floor(time / 60)).slice(-2)
    playerTimeElement.innerText = `${minutes}:${seconds}`
    index.state.playerTimeString = `${minutes}:${seconds}`


/*
    let time = game.state.time
            time = time/1000
            let seconds = ("00" +  Math.floor(time % 60)).slice(-2)
            let minutes = ("00" +  Math.floor(time / 60) % 60).slice(-2)
            if (minutes == '00') timer.innerText = `${seconds}s`
            else timer.innerText = `${minutes}:${seconds}`
            if (time <= 0) timer.innerText = `0s`*/
}