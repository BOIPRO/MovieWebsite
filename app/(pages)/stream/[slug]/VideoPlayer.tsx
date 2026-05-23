"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
interface Prop {
  url: string
}
export default function VideoPlayer({ url }: Prop) {
  // const videoRef = useRef<HTMLVideoElement | null>(null);
  // useEffect(() => {
  //   const video = videoRef.current;
  //   if (!video) return;
  //   if (!video || !url) return;
  //   let hls: Hls | null = null;
  //   const isM3U8 = url.includes(".m3u8");
  //   if (isM3U8 && Hls.isSupported()) {
  //     hls = new Hls({
  //       enableWorker: true,
  //       lowLatencyMode: true,
  //       backBufferLength: 60,
  //       maxBufferLength: 30,
  //     });
  //     hls.loadSource(url);
  //     hls.attachMedia(video);
  //     hls.on(Hls.Events.MANIFEST_PARSED, () => {
  //       video.play();
  //     });
  //   } else {
  //     video.src = url;
  //     video.load()
  //     video.play().catch((e) => console.log("Autoplay blocked:", e));
  //   }
  //   return () => {
  //     if (hls) {
  //       hls.destroy();
  //     }
  //   };
  // }, [url]);
  return (
   <div className="flex justify-center aspect-video">
      <iframe
        src= {`${process.env.NEXT_PUBLIC_STREAM_URL}${url}`}
        allowFullScreen
        loading="lazy"
        className="w-full rounded-lg shadow-lg"
        allow="autoplay; encrypted-media"
       sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-presentation allow-popups "
      ></iframe>
    </div>
  );
}