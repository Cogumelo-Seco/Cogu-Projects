export default (Game, type, command) => {
    let song = null

    if (command?.newSong) {
        song = new Audio()
        song.src = `sounds/${type}`
    } else song = Game.sounds[type]
    console.log(command)

    if (!song) return
    
    //if (command?.musicMenu) {
    //    if (Game.musicMenu) Game.musicMenu.pause()
    //    Game.musicMenu = song
    //}

    let volume = isNaN(Number(command?.volume)) ? 1 : Number(command?.volume)
    //volume = volume*(state.smallFunctions.getConfig('effectsVol')/100) > 100 ? 100 : volume*(state.smallFunctions.getConfig('effectsVol')/100)

    song.pause()
    song.currentTime = 0
    song.loop = command?.loop ? true : false
    song.volume = volume
    song.play()
}