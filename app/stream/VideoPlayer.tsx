"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
interface Prop {
    url : string
}
export default function VideoPlayer({url} : Prop) {
    console.log(url)
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
         video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari support native HLS
      video.src = url;
    }
  }, []);

  return (
    <video
      ref={videoRef}
      controls
      style={{ width: "100%" }}
      muted
    />
  );
}