"use client";
import { useEffect, useState } from "react";
interface Prop {
  url: string
}
export default function VideoPlayer({ url }: Prop) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="relative flex justify-center aspect-video">
      {isLoading && (
                <div className=" absolute inset-0 aspect-video bg-[#0b0e14] flex flex-col justify-center items-center z-10 pointer-events-none">
          <div className="relative flex items-center justify-center">
          
            <div className="absolute w-16 h-16 bg-blue-500/20 rounded-full blur-lg animate-pulse"></div>
            
      
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-transparent via-cyan-400 to-blue-600 p-[2.5px] animate-spin">
              <div className="w-full h-full bg-[#0b0e14] rounded-full"></div>
            </div>
          </div>
          
          <p className="mt-3 text-[11px] font-medium tracking-widest text-slate-500 uppercase animate-pulse">
            Đang tải trình phát...
          </p>
        </div>
      ) }
         <div className="flex justify-center aspect-video">
          <iframe
            src={`${process.env.NEXT_PUBLIC_STREAM_URL}${url}`}
            allowFullScreen
            loading="lazy"
            className={` absolute inset-0 w-full aspect-video transition-all duration-500 ease-in-out ${
        isLoading ? 'opacity-0 invisible scale-95' : 'opacity-100 visible scale-100'
      }`}
            allow="autoplay; encrypted-media"
            sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-presentation allow-popups "
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>
    </div>
    )
}