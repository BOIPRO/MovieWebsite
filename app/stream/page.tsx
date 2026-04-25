import React from 'react'
import ReactPlayer from 'react-player'
import VideoPlayer from './VideoPlayer';
const page = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/stream?epsisodeId=Jujutsu-Kaisen-a-ep-22`)
    const linkPlayList = await res.json();
    const url = `/api/proxy?url=${linkPlayList[0]}`
    return (
        <VideoPlayer url={url}/>
    )
}

export default page