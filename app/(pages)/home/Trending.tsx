"use client"
import {Media} from "@/types/anilist"
import Image from "next/image"
import Link from "next/link";
import ScrollContainer from 'react-indiana-drag-scroll';
interface TrendingProps {
  animes : Media[];
}
const Trending = ({animes} : TrendingProps ) => {
  return (
    <div className="px-2 pb-2">
      <p className=" mb-5  text-[20px] font-montserrat uppercase font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-red-500 to-red-600 border-b-[0.2px] border-red-500 pb-2 inline-block">Anime đang thịnh thành </p>
      <ScrollContainer className="w-auto grid grid-flow-col auto-cols-[40%] sm:auto-cols-[20%] gap-4 xl:gap-0  overflow-x-auto  scrollbar-hide">
         {animes?.map((e: Media) => (
      <Link href={`/info/${e.anilistId}`} className=" flex flex-col gap-2 flex-none cursor-pointer hover:brightness-75" key={e.anilistId}>
          <Image
            src={e.coverImage}
            alt="Movie Cover"
            width={200}
            height={300}
            style={{ height: "auto" }}
           loading="eager"
            className="rounded-lg object-cover aspect-2/3"
          />
        <p className=" truncate text-white text-sm max-w-40 font-inter font-medium ">
          {e.titleRomaji}
        </p>
      </Link>
    ))}
      </ScrollContainer>
    </div>
  )
}

export default Trending