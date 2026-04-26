import React from 'react'
import ReactPlayer from 'react-player'
import VideoPlayer from './VideoPlayer';
const page = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/stream?epsisodeId=Shigatsu-wa-Kimi-no-Uso-ep-5`)
    const linkPlayList = await res.json();
    const url = `/api/proxy?url=${linkPlayList[0]}`
    return (
        <VideoPlayer url={url}/>
    )
}

export default page