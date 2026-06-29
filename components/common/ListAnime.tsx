"use client"
import { Media, pageAnime } from '@/types/anilist'
import Image from "next/image"
import Pagination from './Pagination';
import { useState } from 'react';
import Link from 'next/link'
interface ListAnimeProp {
    listMedia: Media[];
    totalPages: number,
    typeURL: string,
    limit: number,
    page: number
}
const ListAnime = ({ listMedia, totalPages, typeURL, limit, page }: ListAnimeProp) => {
    const [listanime, Setlistanime] = useState(listMedia);
    const [currentPage, SetcurrentPage] = useState(page);
    const [isClicked, setIsClicked] = useState(false);
    const [isClickPage, setIsClickPage] = useState(false);
    const onPageChange = async (pageNumber: number) => {
        if (isClickPage) return;
        // chan click ho den khi chay xong
        setIsClickPage(true);
        const url = `${typeURL}page=${pageNumber}&limit=${limit}`
        const res = await fetch(url, {
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
        // Cho click button hoat dong lai
        setIsClickPage(false);
    }
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isClicked) {
            e.preventDefault();
            return;
        }
        setIsClicked(true);
    }
    return (
        <div id="scroll-root" className="px-2 text-white min-h-screen">
            <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 lg:grid-cols-6  py-2 overflow-hidden ">
                {listanime.map((e: Media) => (
                    <Link prefetch={false} href={`/info/${e.slug}-${e.anilistId}`} onClick={handleClick}
                        className={` flex flex-col gap-2 cursor-pointer hover:brightness-75 group relative`} key={e.slug}>
                        <div className="relative w-full aspect-[2/3]">
                            <Image
                                src={e.anilistData.coverImage.large}
                                alt={e.mappings[0].title || "Movie Cover"}
                                fill
                                sizes="(max-width: 400px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
                                priority
                                className="object-cover rounded-lg"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 w-full px-2 pb-2 bg-linear-to-t from-black/80 to-transparent">
                            <h3 className="text-white text-sm font-medium line-clamp-1 max-w-[90%]">
                                {e.mappings[0].title}
                            </h3>

                            <span
                                className="text-gray-300 text-xs line-clamp-1 mt-1 max-w-[90%]"
                            > {e.mappings[0].description?.replace(/<[^>]*>?/gm, '')}</span>
                        </div>
                    </Link>
                ))}
            </div>
            {/* <Pagination LastPage={totalPages} onPageChange={onPageChange} currentPage={currentPage} /> */}
        </div>
    )
}

export default ListAnime