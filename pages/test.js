import data from '../public/js/data.js';
//import cookies from 'next-cookies';
import { useRouter } from 'next/router';
//import { io } from 'socket.io-client';
import React, { useEffect } from 'react';
import Head from "next/head";

const page = (props) => {
    //const cookie = cookies(data)
    const router = useRouter()

    useEffect(() => {

    }, [])

    return (
        <html lang="pt-BR">
            <Head>
                <title></title>

                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                <link rel="stylesheet" href="/css/test/test.css" />
            </Head>
            <body id="body">
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
