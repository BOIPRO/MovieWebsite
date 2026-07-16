"use client";
import { useEffect, useRef } from "react";
import Link from 'next/link';
import { Episode } from '@/types/episode';
import { usePathname } from "next/navigation";
import WatchNow from "@/components/common/WatchNow";

interface Prop {
    listEpisode: Episode[],
    slug: string,
    episodeNumberClicked?: string
}

const ListEpsiodes = ({ listEpisode, slug, episodeNumberClicked }: Prop) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (pathname.includes("/info") && scrollRef.current) {
            scrollRef.current.scrollTop = 0;
            sessionStorage.setItem(`scroll_${slug}`, "0");
            return;
        }
        if (!slug) return;
        const savedScrollTop = sessionStorage.getItem(`scroll_${slug}`);
        if (savedScrollTop && scrollRef.current) {
            scrollRef.current.scrollTop = parseInt(savedScrollTop, 10);
        }
    }, [slug, pathname]);

    const formatEpisodeNumber = (num: string) => num.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    const handleScroll = () => {
        if (scrollRef.current) {
            sessionStorage.setItem(`scroll_${slug}`, scrollRef.current.scrollTop.toString());
        }
    };

    return (
        <>
            {listEpisode && listEpisode.length > 0 && pathname.includes("/info") && (
                <WatchNow firstEpisodeUrl={`/stream/${slug}-${listEpisode[0].episodeSlug}`} />
            )}
            
            <div className='xl:h-full flex-1 px-5 py-4 bg-neutral-950/60 backdrop-blur-md  rounded-2xl z-10 text-white'>
                <p className='text-[16px] font-semibold mb-4 text-neutral-300'>Danh sách tập</p>
                
                <div 
                    ref={scrollRef} 
                    onScroll={handleScroll} 
                    className={`max-h-[450px]  grid gap-2.5 pr-2 overflow-y-auto scrollbar-custom
                    ${pathname.includes("/info") ? "grid-cols-5 lg:grid-cols-8 xl:grid-cols-12" : "grid-cols-5"}`}
                >
                    {(!listEpisode || listEpisode.length === 0) ? (
                        <div className='col-span-full py-10 text-center text-white'>Chưa có tập phim nào</div>
                    ) : (
                        listEpisode?.sort((a, b) => parseInt(a.episodeNumber) - parseInt(b.episodeNumber))
                            .map((e: Episode) => {
                                const isActive = episodeNumberClicked && formatEpisodeNumber(episodeNumberClicked) === formatEpisodeNumber(e.episodeNumber);
                                return (
                                    <Link
                                        prefetch={false}
                                        href={`/stream/${slug}-${e.episodeSlug}`}
                                        key={e.episodeSlug}
                                        className={`flex items-center justify-center py-2.5 rounded-lg text-sm font-medium transition-all duration-200 
                                        ${isActive 
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 cursor-default' 
                                            : 'bg-neutral-900 text-white  hover:bg-neutral-800 hover:text-white border border-white/5 hover:border-blue-500/50'
                                        }`}
                                    >
                                        {e.episodeNumber}
                                    </Link>
                                );
                            })
                    )}
                </div>
            </div>
        </>
    );
}

export default ListEpsiodes;