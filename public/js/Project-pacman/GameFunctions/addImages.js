export default async (state) => {
    state.images = [
        { dir: 'PacMan/default/PacMan.png', animationConfigDir: 'PacMan/default/PacMan.json' },
        { dir: 'PacMan/guto/PacMan.png', animationConfigDir: 'PacMan/guto/PacMan.json' },
        { dir: 'PacMan/mario/PacMan.png', animationConfigDir: 'PacMan/mario/PacMan.json' },


        { dir: 'ghosts/red/Ghost.png', animationConfigDir: 'ghosts/red/Ghost.json' },
        { dir: 'ghosts/pink/Ghost.png', animationConfigDir: 'ghosts/pink/Ghost.json' },
        { dir: 'ghosts/orange/Ghost.png', animationConfigDir: 'ghosts/orange/Ghost.json' },
        { dir: 'ghosts/cyan/Ghost.png', animationConfigDir: 'ghosts/cyan/Ghost.json' },

        { dir: 'ghosts/frog/Ghost.png', animationConfigDir: 'ghosts/frog/Ghost.json' },
        { dir: 'ghosts/cogu/Ghost.png', animationConfigDir: 'ghosts/cogu/Ghost.json' },
        { dir: 'ghosts/apple-cat/Ghost.png', animationConfigDir: 'ghosts/apple-cat/Ghost.json' },

        { dir: 'fruits/0.png' },
        { dir: 'fruits/1.png' },
        { dir: 'fruits/2.png' },
        { dir: 'fruits/3.png' },
        { dir: 'fruits/4.png' },
        { dir: 'fruits/5.png' },
        { dir: 'fruits/6.png' },
        { dir: 'fruits/7.png' },
    ]
    
    return state.images.length
}