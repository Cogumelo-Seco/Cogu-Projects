export default async (state) => {
    state.images = [
        { dir: 'PacMan/default/PacMan.png', animationConfigDir: 'PacMan/default/PacMan.json' },
        { dir: 'PacMan/guto/PacMan.png', animationConfigDir: 'PacMan/guto/PacMan.json' },
        { dir: 'PacMan/mario/PacMan.png', animationConfigDir: 'PacMan/mario/PacMan.json' },
        { dir: 'PacMan/seika/PacMan.png', animationConfigDir: 'PacMan/seika/PacMan.json' },


        { dir: 'Ghosts/red/Ghost.png', animationConfigDir: 'Ghosts/red/Ghost.json' },
        { dir: 'Ghosts/pink/Ghost.png', animationConfigDir: 'Ghosts/pink/Ghost.json' },
        { dir: 'Ghosts/orange/Ghost.png', animationConfigDir: 'Ghosts/orange/Ghost.json' },
        { dir: 'Ghosts/cyan/Ghost.png', animationConfigDir: 'Ghosts/cyan/Ghost.json' },

        { dir: 'Ghosts/kita/Ghost.png', animationConfigDir: 'Ghosts/kita/Ghost.json' },
        { dir: 'Ghosts/bocchi/Ghost.png', animationConfigDir: 'Ghosts/bocchi/Ghost.json' },
        { dir: 'Ghosts/nijika/Ghost.png', animationConfigDir: 'Ghosts/nijika/Ghost.json' },
        { dir: 'Ghosts/ryo/Ghost.png', animationConfigDir: 'Ghosts/ryo/Ghost.json' },

        { dir: 'Ghosts/frog/Ghost.png', animationConfigDir: 'Ghosts/frog/Ghost.json' },
        { dir: 'Ghosts/cogu/Ghost.png', animationConfigDir: 'Ghosts/cogu/Ghost.json' },
        { dir: 'Ghosts/apple-cat/Ghost.png', animationConfigDir: 'Ghosts/apple-cat/Ghost.json' },

        { dir: 'Fruits/0.png' },
        { dir: 'Fruits/1.png' },
        { dir: 'Fruits/2.png' },
        { dir: 'Fruits/3.png' },
        { dir: 'Fruits/4.png' },
        { dir: 'Fruits/5.png' },
        { dir: 'Fruits/6.png' },
        { dir: 'Fruits/7.png' },
    ]
    
    return state.images.length
}