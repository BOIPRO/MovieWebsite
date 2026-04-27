"use client"
import { Epsiode } from '@/types/anilist'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useQuery } from "@tanstack/react-query";
interface Prop {
    id: string
}
const ListEpsiodes = ({ id }: Prop) => {
   const { data, isLoading } = useQuery({
    queryKey: [`${id}`],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/epsiode?id=${id}`);
      return await res.json();
    },
    staleTime: 1000 * 60 * 5,
  });
    return (
        <div className='px-5 w-full bg-slate-900  rounded-lg mt-5 py-5'>
            <p className='mb-5 uppercase'>Danh sach phim</p>
            <div className='grid grid-cols-5 grid-rows-subgrid lg:grid-cols-12 max-h-[300px]  overflow-y-auto scrollbar-custom gap-3 text-center text-[16px]'>
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
                    data.map((e: Epsiode) => (
                        <Link href={`/stream?id=/${e.id}`} className='px-2 py-2 rounded-sm cursor-pointer  bg-slate-700 hover:bg-blue-500' key={e.number}>
                            {e.number}
                        </Link>

                    ))}
            </div>
        </div>
    )
}

export default ListEpsiodes