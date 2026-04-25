import React from 'react'
import ReactPlayer from 'react-player'
import VideoPlayer from './VideoPlayer';
const page = async () => {
    const res = await fetch("http://localhost:8080/movies/stream?epsisodeId=One-Piece-Sub-ITA-a-ep-1158")
    const linkPlayList = await res.json();
    const url = `/api/proxy?url=${linkPlayList[0]}`
    return (
        <VideoPlayer url={url}/>
    )
}

export default page