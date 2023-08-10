import data from '../public/js/data.js';
//import cookies from 'next-cookies';
import { useRouter } from 'next/router';
//import { io } from 'socket.io-client';
import React, { useEffect } from 'react';
import Head from "next/head";
import createGame from '../public/js/Project-pacman/Game.js';
import createListener from '../public/js/Project-pacman/Listener.js';
import renderGame from '../public/js/Project-pacman/RenderGame/index.js';

const page = (props) => {
    //const cookie = cookies(data)
    const router = useRouter()

    useEffect(() => {
        const canvas = document.getElementById('gameCanvas')        
        const Listener = createListener();
        const game = createGame(Listener);

        game.loading()
        game.start('reset')

        canvas.addEventListener('click', (a) => {
            if (
                a.layerX > -84 && a.layerX < 84 && a.layerY > 25 && a.layerY < 45 && game.state.gameStage == 'home' && window.innerWidth >= 750 && game.state.loading.loaded >= game.state.loading.total||
                a.layerX > -50 && a.layerX < 50 && a.layerY > 188 && a.layerY < 200 && game.state.gameStage == 'home' && window.innerWidth <= 750 && game.state.loading.loaded >= game.state.loading.total
            ) {
                game.state.gameStage = 'initial'
                game.playSong('music1.mp3')

                document.getElementById('score').style.display = 'block'
                document.getElementById('highScoreTitle').style.display = 'block'
                document.getElementById('highScore').style.display = 'block'

                setTimeout(() => game.start({
                    Listener,
                    startGame: true
                }), 4500)
            }
        })

        renderGame(canvas, game, Listener);
    }, [])

    return (
        <html lang="pt-BR">
            <Head>
                <title>Pac-Man</title>

                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <link rel="stylesheet" href="/css/pac-man/fonts.css" />
                <link rel="stylesheet" href="/css/pac-man/animations.css" />
                <link rel="stylesheet" href="/css/pac-man/game.css" />
                <link rel="stylesheet" href="/css/pac-man/resizable.css" />
            </Head>
            <body id="body">
                <section id="section">
                    <div id="codeMessage" />
                    <div id="fpsDisplay">?FPS</div>
                    <a href="https://www.instagram.com/wellingtonfelipe_cogu/" target="_blank" id="owner">Created by: Cogu</a>
                    
                    <div id="game">
                        <ul id="gameHUD">
                            <li id="score">0</li>
                            <li id="highScoreTitle">HIGH SCORE</li>
                            <li id="highScore">0</li>
                        </ul>
                        <canvas id="gameCanvas" />
                        <ul id="gameHUD2">
                            <li id="lifes" />
                        </ul>
                    </div>

                    <div id="mobileButtonsContaner">
                        <button className="mobileButtons" id="mobileButtonUp" />
                        <div className="mobileButtonsSeparator" />
                        <button className="mobileButtons" id="mobileButtonLeft" />
                        <button className="mobileButtons" id="mobileButtonDown" />
                        <button className="mobileButtons" id="mobileButtonRight" />
                    </div>
                </section>
            </body>
        </html>
    )
}

export async function getStaticProps() {
    const SERVER = null//process.env.SERVER

    return {
        props: {
            SERVER,
        },
        revalidate: 1800
    }
}

export default page
