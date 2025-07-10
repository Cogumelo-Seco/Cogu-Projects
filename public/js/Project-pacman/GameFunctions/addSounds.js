export default async (state) => {
    state.sounds = [
        { dir: 'coin.mp3' },
        { dir: 'death.mp3' },
        { dir: 'deathGhost.mp3' },
        { dir: 'music1.mp3' },
        { dir: 'music2.mp3' },
        { dir: 'musicSpecial.mp3' },
        { dir: 'fruit.mp3' },
        { dir: 'bocchi.mp3' }
    ]

    return state.sounds.length
}