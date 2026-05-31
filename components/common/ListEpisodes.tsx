"use client"
import { useEffect, useRef, useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useQuery } from "@tanstack/react-query";
import { Episode } from '@/types/episode';
import { usePathname } from "next/navigation";
import WatchNow from "@/app/(pages)/info/[slug]/WatchNow";
interface Prop {
    id: string,
    slug: string,
    episodeNumber?: string
}
const ListEpsiodes = ({ id, slug, episodeNumber }: Prop) => {
    const [isCalling, setIsCalling] = useState(false);
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
    const { data, isLoading } = useQuery({
        queryKey: [`${id}`],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/episodes?id=${id}`);
            return await res.json();
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false // ko cache khi user bam quay lai tab/browser
    });
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
    const handleEpisode = (url: string) => {
        if(isCalling) return;
        setIsCalling(true);
        router.push(url);
    }
    return (
        <>
            {
                data && data.length > 0 && pathname.includes("/info") ? <WatchNow firstEpisodeUrl={`/stream/${slug}-${data[0].episodeSlug}`} /> : null
            }
            <div className='px-5 w-full bg-slate-900  rounded-lg mt-5 py-5 text-white'>
                <p className='mb-5 uppercase'>Danh sách tập</p>
                <div ref={scrollRef} onScroll={handleScroll} className='grid grid-cols-5 lg:grid-cols-12 max-h-[300px]  overflow-y-auto scrollbar-custom gap-3 text-center text-[16px]'>
                    {isLoading ?
                        Array.from({ length: 24 }).map((_, index) => (
                            <div
                                key={index}
                                className="px-2 py-2 rounded-sm bg-slate-700 animate-pulse"
                            >
                                <div className="h-full w-full bg-slate-600 rounded-sm"></div>
                            </div>
                        ))
                        :
                        (!data || data.length === 0) ? (
                            <div className='col-span-full'>Chưa có tập phim nào</div>
                        ) : (
                            data?.sort((a: Episode, b: Episode) => {
                                const numA = parseInt(a.episodeNumber)
                                const numB = parseInt(b.episodeNumber)

                                return numA - numB
                            })
                                .map((e: Episode) => (
                                    <button
                                        onClick={() => handleEpisode(`/stream/${slug}-${e.episodeSlug}`)}
                                        className={episodeNumber ? `${formatEpisodeNumber(e.episodeNumber) === formatEpisodeNumber(episodeNumber) ? 'bg-blue-500 cursor-not-allowed pointer-events-none' : "bg-slate-700"} px-2 py-2 rounded-sm cursor-pointer my-auto  hover:bg-blue-500` :
                                            "bg-slate-700 px-2 py-2 rounded-sm cursor-pointer my-auto  hover:bg-blue-500"}
                                        key={e.episodeSlug}
                                    >
                                        {e.episodeNumber}
                                    </button>
                                ))
                        )}
                </div>
            </div>
        </>

    )
}

export default ListEpsiodes