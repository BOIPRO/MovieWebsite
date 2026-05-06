"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useQuery } from "@tanstack/react-query";
import { Episode } from '@/types/episode';
interface Prop {
    id: string,
    slug : string
}
const ListEpsiodes = ({ id,slug }: Prop) => {
    const { data , isLoading } = useQuery({
        queryKey: [`${id}`],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/episodes?id=${id}`);
            return  await res.json();
        },
        staleTime: 1000 * 1,
    });
    return (
        <div className='px-5 w-full bg-slate-900  rounded-lg mt-5 py-5'>
            <p className='mb-5 uppercase'>Danh sach phim</p>
            <div className='grid grid-cols-5 lg:grid-cols-12 max-h-[300px]  overflow-y-auto scrollbar-custom gap-3 text-center text-[16px]'>
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
                        <div className='col-span-full'>Chua co phim thong cam nhe hihi</div>
                    ) : (
                            data?.map((e: Episode) => (
                                <Link
                                    href={`/stream/${slug}-${e.episodeSlug}`}
                                    className='px-2 py-2 rounded-sm cursor-pointer bg-slate-700 hover:bg-blue-500'
                                    key={e.episodeSlug}
                                >
                                    {e.episodeNumber}
                                </Link>
                            ))
                    )}
            </div>
        </div>
    )
}

export default ListEpsiodes