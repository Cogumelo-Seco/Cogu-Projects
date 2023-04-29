import data from '../public/js/data.js';
//import cookies from 'next-cookies';
import { useRouter } from 'next/router';
//import { io } from 'socket.io-client';
import React, { useEffect } from 'react';
import Head from "next/head";
import createIndex from '../public/js/Project-minesweeper/index.js';
import createListener from '../public/js/Project-minesweeper/Listener.js';
import render from '../public/js/Project-minesweeper/Render/index.js';

const page = (props) => {
    //const cookie = cookies(data)
    const router = useRouter()

    useEffect(async() => {
        const gameSizeSelectElement = document.getElementById('gameSizeSelect')
        const gameDificultySelectElement = document.getElementById('gameDificultySelect')
        const gameStartButtonElement = document.getElementById('gameStartButton')

        let minGameSize = 5
        let maxGameSize = 20
        for (let i = minGameSize;i <= maxGameSize;i++) {
            const optionElement = document.createElement('option')
            optionElement.innerText = i
            optionElement.value = i
            gameSizeSelectElement.appendChild(optionElement)
        }

        const index = createIndex();

        gameStartButtonElement.onclick = () => {
            let gameSize = Number(gameSizeSelectElement.value) || 10
            let gameDificulty = Number(gameDificultySelectElement.value) || 0.3

            index.state.gameDificulty = document.getElementById(gameDificulty)?.innerText
            index.state.gameSize = gameSize
            index.state.playerMovements = 0
            index.state.playerTime = 0
            index.state.gameInProgress = true
            index.state.mapInfo.data = []
            for (let i = 0;i < gameSize;i++) {
                index.state.mapInfo.data[i] = []
                for (let a = 0;a < gameSize;a++) {
                    index.state.mapInfo.data[i][a] = {
                        id: 0, 
                        clicked: false, 
                        traceId: 0
                    }
                }
            }
            for (let b = 0;b <= (gameSize*gameSize)*gameDificulty;b++) {
                function loopTile(row, column) {
                    index.state.mapInfo.reload = true
                    if (index.state.mapInfo.data[row][column].id == 1) loopTile(Math.floor(Math.random()*gameSize), Math.floor(Math.random()*gameSize))
                    else index.state.mapInfo.data[row][column].id = 1
                }
                loopTile(Math.floor(Math.random()*gameSize), Math.floor(Math.random()*gameSize))
            }
            index.state.mapInfo.reload = true
        }

        index.loading()
        index.state.router = router

        render(index);

        /*const playerModeElement = document.getElementById('playerMode')
        playerModeElement.onclick = () => {
            index.state.mode = index.state.mode == 'Bomb' ? 'Flag' : 'Bomb'
            playerModeElement.style.backgroundImage = `url(/imgs/Minesweeper/${index.state.mode}.png)`
        }
        /*const canvas = document.getElementById('canvas')        
        const Listener = createListener();
        const index = createIndex(Listener, canvas);

        index.loading({ Listener })
        index.state.router = router
        Listener.state.index = index
        //index.start()

        render(canvas, index, Listener);*/
    }, [])

    return (
        <html lang="pt-BR">
            <Head>
                <title>Home</title>

                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                <link rel="stylesheet" href="/css/minesweeper/minesweeper.css" />
            </Head>
            <body id="body">
                <div id="gameOptionsContent">
                    <span>Tamanho: </span>
                    <select id="gameSizeSelect" />
                    <div />
                    <span>Dificuldade: </span>
                    <select id="gameDificultySelect">
                        <option value="0.1" id="0.1">Fácil</option>
                        <option value="0.2" id="0.2">Normal</option>
                        <option value="0.3" id="0.3">Difícil</option>
                    </select>
                    <div />
                    <button id="gameStartButton">Novo Jogo</button>
                </div>
                <div id="minesweeperContent">
                    <div id="minesweeperHeader">
                        <span id="playerMovements" className="number">00</span>
                        <span id="playerTime" className="number">00:00</span>
                    </div>
                    <table id="minesweeperTable"></table>
                </div>
                <div id="FPS">??FPS</div>
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