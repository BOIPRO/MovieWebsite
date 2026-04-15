"use client"
import { Media, pageInfo, Animes } from '@/types/anilist'
import Image from "next/image"
import Pagination from './Pagination';
import { useState } from 'react';
interface ListAnimeProp {
    popularAnimes: Media[];
    pageInfo: pageInfo
}
const ListAnime = ({ popularAnimes, pageInfo }: ListAnimeProp) => {
    const [listanime, Setlistanime] = useState(popularAnimes);
    const [currentPage, SetcurrentPage] = useState(1);
    const onPageChange = async (pageNumber: number) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/page/${pageNumber}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const json: Animes<Media> = await res.json();
        const data = json.data;
        Setlistanime(data.list.media);
        SetcurrentPage(pageNumber);
        setTimeout(() => {
            const allElements = document.querySelectorAll('*');
            for (let el of allElements) {
                if (el.scrollTop > 0) {
                    el.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        }, 100);
    }
    return (
        <div id="scroll-root" className=" mt-5 px-2 text-white">
            <p className=" mb-5  text-[20px] font-montserrat uppercase font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-red-500 to-red-600 border-b-[0.2px] border-red-500 pb-2 inline-block">Tất cả</p>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-5 py-2 overflow-hidden ">
                {listanime.map((e: Media) => (
                    <div className="flex flex-col gap-2 cursor-pointer hover:brightness-75 group relative" key={e.id}>
                        <Image
                            src={e.coverImage.large}
                            alt="Movie Cover"
                            width={200}
                            height={300}
                            style={{ height: "auto" }}
                            loading="eager"
                            className="rounded-lg object-cover aspect-2/3"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 w-full px-2 pb-2 bg-linear-to-t from-black/80 to-transparent">
                            <h3 className="text-white text-sm font-medium line-clamp-1 max-w-[90%]">
                                {e.title.romaji}
                            </h3>

                            <div
                                className="text-gray-300 text-xs line-clamp-1 mt-1 max-w-[90%]"
                                dangerouslySetInnerHTML={{ __html: e.description }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Pagination LastPage={pageInfo.lastPage} onPageChange={onPageChange} currentPage={currentPage} />
        </div>
    )
}

export default ListAnime