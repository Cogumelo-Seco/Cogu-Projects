import data from '../public/js/data.js';
import cookies from 'next-cookies';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Head from "next/head";
import { GameClass } from '../public/js/Project-tomb/Game/Game/index.js';
import { ListenerClass } from '../public/js/Project-tomb/Game/Listener/index.js';
import { RenderClass } from '../public/js/Project-tomb/Game/Render/index.js';

const pageIndex = (props) => {
    const cookie = cookies(data)
    const router = useRouter()

    useEffect(() => {
        const Game = new GameClass()
        const Listener = new ListenerClass()
        const Render = new RenderClass()

        Game.listenerState = Listener
        Game.renderState = Render

        Listener.gameState = Game
        Listener.renderState = Render

        Render.gameState = Game
        Render.listenerState = Listener
    }, [])

    return (
        <html lang="pt-BR">
            <Head>
                <title>Game</title>

                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                <link rel="stylesheet" href="/css/tomb/fonts.css" />
                <link rel="stylesheet" href="/css/tomb/animations.css" />
                <link rel="stylesheet" href="/css/tomb/game.css" />
                <link rel="stylesheet" href="/css/tomb/resizable.css" />
            </Head>
            <body id="body">
                <canvas id="gameCanvas"/>
            </body>
        </html>
    )
}

export async function getStaticProps() {
    const SERVER = "null"//process.env.SERVER

    return {
        props: {
            SERVER
        },
        revalidate: 1800
    }
}

export default pageIndex