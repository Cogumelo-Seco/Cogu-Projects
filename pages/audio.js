import data from '../public/js/data.js';
//import cookies from 'next-cookies';
import { useRouter } from 'next/router';
//import { io } from 'socket.io-client';
import React, { useEffect } from 'react';
import Head from "next/head";

const page = (props) => {
    const router = useRouter()

    useEffect(() => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight//*0.5

        const audio = document.getElementById('audio')
        /*const audioStreams = {}
        const YTURL = document.getElementById('urlInput')
        const loadButton = document.getElementById('loadButton')*/

        let audioCtx = new AudioContext()
        let audioSource = audioCtx.createMediaElementSource(audio)
        let analyser;
        let bufferLength;
        let barWidth;
        let dataArr;

        /*loadButton.onclick = async() => {
            console.log(YTURL.value.replace('?', '?hl=en&'))
            console.log(await fetch("https://images" + ~~(Math.random() * 33) + "-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=" + encodeURIComponent(YTURL.value.replace('?', '?hl=en&'))).then(response => {
                if (response.ok) response.text().then(data => {
                    var regex = /(?:ytplayer\.config\s*=\s*|ytInitialPlayerResponse\s?=\s?)(.+?)(?:;var|;\(function|\)?;\s*if|;\s*if|;\s*ytplayer\.|;\s*<\/script)/gmsu;

                    data = data.split('window.getPageData')[0];
                    data = data.replace('ytInitialPlayerResponse = null', '');
                    data = data.replace('ytInitialPlayerResponse=window.ytInitialPlayerResponse', '');
                    data = data.replace('ytplayer.config={args:{raw_player_response:ytInitialPlayerResponse}};', '');
        
        
                    var matches = regex.exec(data);
                    var data = matches && matches.length > 1 ? JSON.parse(matches[1]) : false;

                    let streams = []
                    let result = {}

                    if (data.streamingData) {
                        if (data.streamingData.adaptiveFormats) streams = streams.concat(data.streamingData.adaptiveFormats);
                        if (data.streamingData.formats) streams = streams.concat(data.streamingData.formats);
                    } else return false

                    streams.forEach(function(stream, n) {
                        let itag = stream.itag * 1
                        let quality = false

                        console.log(stream)

                        switch (itag) {
                            case 139:
                                quality = "48kbps"
                                break
                            case 140:
                                quality = "128kbps"
                                break
                            case 141:
                                quality = "256kbps"
                                break
                            case 249:
                                quality = "webm_l"
                                break
                            case 250:
                                quality = "webm_m"
                                break
                            case 251:
                                quality = "webm_h"
                                break
                        }

                        if (quality) audioStreams[quality] = stream.url
                    });

                    console.log(data);

                    audio.play()
                })
            }).catch((e) => alert(e)))
        }*/

        let fileElement = document.getElementById('fileInput')
        fileElement.onchange = function() {
            let file = this.files[0]
            if (file) {
                audio.src = URL.createObjectURL(file)
                analyser = audioCtx.createAnalyser()
                audioSource.connect(analyser)
                analyser.connect(audioCtx.destination)
                /*analyser.fftSize = 8192  //2048
                analyser.minDecibels = -90  //-100
                analyser.maxDecibels = -35  //-30
                analyser.smoothingTimeConstant = 0.8  //0.8*/
                analyser.fftSize = 32  //2048
                analyser.minDecibels = -100  //-100
                analyser.maxDecibels = -0  //-30
                analyser.smoothingTimeConstant = 0.1  //0.8
                bufferLength = analyser.frequencyBinCount
                dataArr = new Uint8Array(bufferLength)
                barWidth = canvas.width/(bufferLength*0.6)/2

                audio.play()
            }
        }
        //audio.src = 'https://www.youtube.com/watch?v=QbBGsfY0H_I'
                /*analyser = audioCtx.createAnalyser()
                audioSource.connect(analyser)
                analyser.connect(audioCtx.destination)
                analyser.fftSize = 8192  //2048
                analyser.minDecibels = -90  //-100
                analyser.maxDecibels = -35  //-30
                analyser.smoothingTimeConstant = 0.8  //0.8
                bufferLength = analyser.frequencyBinCount
                dataArr = new Uint8Array(bufferLength)
                barWidth = canvas.width/(bufferLength*0.6)/2

                audio.play()*/

        let rainbow = 0
        let loop = () => {
            rainbow += 1
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            analyser?.getByteFrequencyData(dataArr)
            let x = 0
            for (let i = Math.floor(bufferLength*0.6);i > 0;i--) {
                let barHeight = (dataArr[i]/250)*canvas.height*0.7
                ctx.fillStyle = `hsl(${x/canvas.width*720-rainbow}, 100%, 50%)`
                ctx.fillRect(x, canvas.height-barHeight, barWidth, barHeight)
                x += barWidth
            }

            /*for (let i = 0;i <= Math.floor(bufferLength*0.6);i++) {
                let barHeight = (dataArr[i]/250)*canvas.height*0.7
                ctx.fillStyle = `hsl(${x/canvas.width*720-rainbow}, 100%, 50%)`
                ctx.fillRect(x, canvas.height-barHeight, barWidth, barHeight)
                x += barWidth
            }*/

            ctx.fillStyle = 'white'
            ctx.font = 'bold 20px Arial'

            let media1 = 0
            let media2 = 0
            let media3 = 0
            let media4 = 0
            let length = dataArr?.length/4
            for (let i = 0;i < length;i++) media1 += dataArr[Number.parseInt(i)]
            for (let i = length;i < length*2;i++) media2 += dataArr[Number.parseInt(i)]
            for (let i = length*2;i < length*3;i++) media3 += dataArr[Number.parseInt(i)]
            for (let i = length*3;i < length*4;i++) media4 += dataArr[Number.parseInt(i)]
            media1 = media1/length
            media2 = media2/length
            media3 = media3/length
            media4 = media4/length
            
            ctx.fillText(media1, canvas.width/2+50, canvas.height/2-60)
            ctx.fillText(media2, canvas.width/2+50, canvas.height/2-30)
            ctx.fillText(media3, canvas.width/2+50, canvas.height/2)
            ctx.fillText(media4, canvas.width/2+50, canvas.height/2+30)

            setTimeout(loop, 1000/10)
            //requestAnimationFrame(loop)
        }
        loop()
    }, [])

    return (
        <html lang="pt-BR">
            <Head>
                <title>Audio-Visualizer</title>

                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                <link rel="stylesheet" href="/css/audio/audio.css" />
            </Head>
            <body id="body">
                <canvas id="canvas"/>
                <input type="file" id="fileInput" />
                <audio id="audio" controls="true" />
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