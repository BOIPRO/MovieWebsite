"use client"
import Image from "next/image"
import Pagination from './Pagination';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { AnimeResponeType } from '@/types/anime';

interface ListAnimeProp {
    media: AnimeResponeType[],
    totalPages: number,
    page: number,
    route: string
}
const ListAnime = ({ media, totalPages, page, route }: ListAnimeProp) => {
    const [isClicked, setIsClicked] = useState(false);
    const [mediaList, setMediaList] = useState<AnimeResponeType[]>(media);
    useEffect(() => {
        if (!media) return;
        setIsClicked(false);
        setMediaList(media);
    }, [media]);
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isClicked) {
            e.preventDefault();
            return;
        }
        setIsClicked(true);
    }
    return (
        <div id="scroll-root" className="px-2 text-white max-w-[1350px] mx-auto min-h-screen">
            <Pagination route={route} LastPage={totalPages} currentPage={page} />
            <div className=" grid grid-cols-3 md:grid-cols-4 gap-4 lg:grid-cols-6  py-2 overflow-hidden ">
                {mediaList.map((e: AnimeResponeType) => (
                    <Link prefetch={false} href={`/info/${e.slug}-${e.anilistId}`} onClick={handleClick}
                        className={` flex flex-col gap-2 cursor-pointer hover:brightness-75 group relative`} key={e.slug}>
                        <div className="relative w-full aspect-[2/3]">
                            <Image
                                src={e.anilistData.coverImage.large}
                                alt={e.title || "Movie Cover"}
                                fill
                                sizes="(max-width: 400px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
                                priority
                                className="object-cover rounded-lg"
                            />
                            <div className="absolute top-2 right-2 z-10 bg-blue-600 px-2 py-1 rounded text-white text-[16px] font-bold backdrop-blur-sm">
                                {e.currentEpisode === "Full" ? "Full" : `Tập ${e.currentEpisode} `}
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 w-full px-2 pb-2 bg-linear-to-t from-black/80 to-transparent">
                            <h3 className="text-white text-sm font-medium line-clamp-1 max-w-[90%]">
                                {e.title}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
            <Pagination route={route} LastPage={totalPages} currentPage={page} />
        </div>
    )
}

export default ListAnime