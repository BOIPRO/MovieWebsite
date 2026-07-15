"use client";
import { useEffect, useState } from "react";
interface Prop {
  url: string
}
export default function VideoPlayer({ url }: Prop) {
  return (
    <div className="relative flex justify-center aspect-video">
         <div className="flex justify-center aspect-video">
          <iframe
            src={`${url}`}
            allowFullScreen
            loading="lazy"
            className={` absolute inset-0 w-full h-full transition-all duration-500 ease-in-out`}
            allow="autoplay; encrypted-media"
            sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-presentation allow-popups "
          ></iframe>
        </div>
    </div>
    )
}