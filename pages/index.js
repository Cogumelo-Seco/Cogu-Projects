import data from '../public/js/data.js';
//import cookies from 'next-cookies';
import { useRouter } from 'next/router';
//import { io } from 'socket.io-client';
import React, { useEffect } from 'react';
import Head from "next/head";
import createIndex from '../public/js/Project/index.js';
import createListener from '../public/js/Project/Listener.js';
import render from '../public/js/Project/Render/index.js';

const page = (props) => {
    //const cookie = cookies(data)
    const router = useRouter()

    useEffect(() => {
        const canvas = document.getElementById('canvas')        
        const Listener = createListener();
        const index = createIndex(Listener, canvas);

        index.loading({ Listener })
        index.state.router = router
        Listener.state.index = index
        //index.start()

        render(canvas, index, Listener);
    }, [])

    return (
        <html lang="pt-BR">
            <Head>
                <title>Home</title>

                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                <link rel="stylesheet" href="/css/home/home.css" />
            </Head>
            <body id="body">
                <canvas id="canvas"/>
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