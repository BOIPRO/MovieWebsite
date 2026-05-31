"use client"

import { useRouter } from "next/dist/client/components/navigation";
import { useState } from "react";


interface Prop {
    firstEpisodeUrl : string
}
export default function WatchNow({firstEpisodeUrl} : Prop) {
    const router = useRouter();
    const [isClicked, setIsClicked] = useState(false);
     const handleWatchNow = () => {
        if (isClicked) return;
        setIsClicked(true);
        router.push(firstEpisodeUrl);
    }
    return (
        <div className="flex items-center justify-center md:justify-start px-2 py-4 text-white">
            {/* <Link className="border px-2 py-2 rounded-lg bg-blue-950 border-blue-900" href="/watch">Xem Ngay</Link> */}
            <button onClick={handleWatchNow} className="relative inline-flex items-center justify-center px-8 py-3.5 text-[16px] font-bold text-white transition-all duration-300 transform rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] animate-pulse-slow">
                <svg className="w-5 h-5 mr-2 -ml-1 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                </svg>
                Xem Ngay
            </button>
        </div>
    )
}