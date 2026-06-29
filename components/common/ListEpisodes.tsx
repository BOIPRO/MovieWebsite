"use client"
import { useEffect, useRef, useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { Episode } from '@/types/episode';
import { usePathname } from "next/navigation";
import WatchNow from "@/app/(pages)/info/[slug]/WatchNow";
interface Prop {
    listEpisode : Episode[],
    slug : string
    episodeNumber?: string
}
const ListEpsiodes = ({ episodeNumber, listEpisode,slug}: Prop) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
        if (pathname.includes("/info") && scrollRef.current) {
            scrollRef.current.scrollTop = 0;
            sessionStorage.setItem(
                `scroll_${slug}`,
                scrollRef.current.scrollTop.toString()
            );
            return;
        }
        if (!slug) return;
        const savedScrollTop = sessionStorage.getItem(`scroll_${slug}`); // kieu string|| null
        if (savedScrollTop && scrollRef.current) {
            scrollRef.current.scrollTop = parseInt(savedScrollTop, 10); // chuyen sang number
        }
    }, [slug]);
    const formatEpisodeNumber = (num: string) => {
        return num.replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase()
    }
    const handleScroll = () => {
        if (scrollRef.current) {
            sessionStorage.setItem(
                `scroll_${slug}`,
                scrollRef.current.scrollTop.toString()
            );
        }
    };
    return (
        <>
            {
                listEpisode && listEpisode.length > 0 && pathname.includes("/info") ? <WatchNow firstEpisodeUrl={`/stream/${slug}-${listEpisode[0].episodeSlug}`} /> : null
            }
            <div className=' xl:h-full flex-1 px-5 bg-black rounded-lg text-white'>
                <p className='py-2 text-[16px] shrink-0'>Danh sách tập</p>
                <div ref={scrollRef} onScroll={handleScroll} className={` max-h-[450px]  grid grid-cols-5 lg:grid-cols-12 ${ pathname.includes("/info") ?  "xl:grid-cols-12" : "xl:grid-cols-5"} overflow-x-hidden overflow-y-auto scrollbar-custom gap-3 text-center text-[16px] `}>
                {(!listEpisode || listEpisode.length === 0) ? (
                            <div className='col-span-full'>Chưa có tập phim nào</div>
                        ) : (
                            listEpisode?.sort((a: Episode, b: Episode) => {
                                const numA = parseInt(a.episodeNumber)
                                const numB = parseInt(b.episodeNumber)

                                return numA - numB
                            })
                                .map((e: Episode) => (
                                    <Link
                                    prefetch = {false}
                                        href={`/stream/${slug}-${e.episodeSlug}`}
                                        className={episodeNumber ? `${formatEpisodeNumber(episodeNumber) === formatEpisodeNumber(e.episodeNumber) ? 'bg-blue-500 cursor-not-allowed pointer-events-none' : "bg-neutral-900"} px-2 py-2 rounded-sm cursor-pointer my-auto  hover:bg-blue-500` :
                                            "bg-neutral-900 px-2 py-2 rounded-sm cursor-pointer my-auto  hover:bg-blue-500"}
                                            key={e.episodeSlug}
                                    >
                                        {e.episodeNumber}
                                    </Link>
                                ))
                        )}
                </div>
            </div>
        </>

    )
}

export default ListEpsiodes