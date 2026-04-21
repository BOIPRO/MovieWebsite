"use client"
import { Media,pageAnime} from '@/types/anilist'
import Image from "next/image"
import Pagination from '../app/(pages)/home/Pagination';
import { useState } from 'react';
interface ListAnimeProp {
    listMedia: Media[];
    totalPages: number,
    typeURL : string,
    limit : number,
    page : number
}
const ListAnime = ({ listMedia, totalPages ,typeURL,limit ,page}: ListAnimeProp) => {
    const [listanime, Setlistanime] = useState(listMedia);
    const [currentPage, SetcurrentPage] = useState(page);
    const onPageChange = async (pageNumber: number) => {
        const url = `${typeURL}page=${pageNumber}&limit=${limit}`
        const res = await fetch( url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data: pageAnime = await res.json();
        Setlistanime(data.media);
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
        <div id="scroll-root" className=" mt-5 px-2 text-white min-h-screen">
            <div className="grid grid-cols-3 gap-4 md:grid-cols-5 py-2 overflow-hidden ">
                {listanime.map((e: Media) => (
                    <div className="flex flex-col gap-2 cursor-pointer hover:brightness-75 group relative" key={e.anilistId}>
                        <Image
                            src={e.coverImage}
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
                                {e.titleRomaji}
                            </h3>

                            <div
                                className="text-gray-300 text-xs line-clamp-1 mt-1 max-w-[90%]"
                                dangerouslySetInnerHTML={{ __html: e.description }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Pagination LastPage={totalPages} onPageChange={onPageChange} currentPage={currentPage} />
        </div>
    )
}

export default ListAnime