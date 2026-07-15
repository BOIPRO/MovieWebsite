"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { BannerType } from "@/types/banner";
import { faStar, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VideoPlayer from "../common/BannerPlayer";
import WatchNow from "../common/WatchNow";

interface Props {
    banner: BannerType,
    isActive: boolean
}

export default function BannerItem({ banner, isActive }: Props) {
    const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);

    useEffect(() => {
        if (!isActive || !banner.anilistData?.trailer?.id) {
            setIsPlayingTrailer(false);
            return;
        }

        const timer = setTimeout(() => {
            setIsPlayingTrailer(true);
        }, 4000);

        return () => {
            clearTimeout(timer);
            setIsPlayingTrailer(false);
        };
    }, [isActive, banner]);

    let embedUrl = '';
    const trailer = banner.anilistData?.trailer;
    if (trailer?.id) {
        if (trailer.site.toLowerCase() === 'youtube') {
            embedUrl = `https://www.youtube.com/embed/${trailer.id}?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=${trailer.id}&ui-start-screen-info=false&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=0`;
        } else if (trailer.site.toLowerCase() === 'dailymotion') {
            embedUrl = `https://www.dailymotion.com/embed/video/${trailer.id}?autoplay=1&mute=1&ui-start-screen-info=false`;
        }
    }

    const bannerImg = banner.anilistData?.bannerImage || '/fallback.jpg';
    return (
        <section className="relative w-full h-full  overflow-hidden text-white bg-black z-0">
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                {isPlayingTrailer && embedUrl ? (

                    <VideoPlayer url={embedUrl} />

                ) : (
                    <div className="relative w-full h-full">
                        <Image
                            src={bannerImg}
                            alt={banner.title}
                            fill
                            priority={isActive}
                            className="object-cover object-center  brightness-[1.05]"
                        />
                    </div>
                )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent xl:bg-gradient-to-r xl:from-[#0c151abc] xl:via-[#0c151a13]/60 xl:to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0b1317] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 max-w-[1350px] mx-auto px-4 flex flex-col justify-end pb-6 xl:justify-center xl:pb-0 z-20 ">

                <div className="flex flex-col items-center xl:items-start text-center xl:text-left w-full">
                    <h1 className="text-xl md:text-4xl xl:text-5xl font-black max-w-[650px]  tracking-wide line-clamp-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] px-2 xl:px-0">
                        {banner.title}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center xl:justify-start gap-2 mt-2 text-[12px] md:text-[15px] font-medium text-zinc-300">
                        <span className="bg-blue-600 px-1.5 py-0.5 rounded font-black text-white flex items-center gap-1 scale-95 origin-center">
                            <FontAwesomeIcon icon={faStar} className="text-amber-400 w-3 h-3" />
                            {banner.anilistData?.averageScore}
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[11px] md:text-[14px] bg-zinc-900/90 border border-zinc-700/80 font-bold text-white">
                            FULL HD
                        </span>
                        <span>•</span>
                        <span>{banner.anilistData?.seasonYear}</span>
                        <span>•</span>
                        <span>Nhật Bản</span>
                    </div>
                    <div className="flex items-center justify-center xl:justify-start mt-4 z-100">
                        {/* <a
                            href={`/stream/${banner.slug}-${banner.anilistId}-${banner.firstEpisode}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 hover:bg-blue-100 text-white font-bold px-6 py-2 md:px-8 md:py-3 rounded-full flex items-center gap-2 transition transform active:scale-95 xl:hover:scale-105 shadow-md shadow-blue-600/20 cursor-pointer text-[14px] md:text-[16px]"
                        >
                            <FontAwesomeIcon icon={faPlay} className="w-3 h-3 md:w-4 md:h-4" />
                            Xem ngay
                        </a> */}

                        <WatchNow firstEpisodeUrl={`/stream/${banner.slug}-${banner.anilistId}-${banner.firstEpisode}`} />
                    </div>
                </div>
            </div>
        </section>
    );
}