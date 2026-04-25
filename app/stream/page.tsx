import React from 'react'
import ReactPlayer from 'react-player'
import VideoPlayer from './VideoPlayer';
const page = async () => {
    const res = await fetch("http://localhost:8080/movies/stream?id=20")
    const linkPlayList : string[] = await res.json();
    const linkProxy = `/api/proxy?url=${linkPlayList[0]}`
    return (
        <VideoPlayer url={linkProxy}/>
    )
}

export default page