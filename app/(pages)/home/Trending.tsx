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
      <ScrollContainer className="w-auto grid grid-flow-col auto-cols-[40%] sm:auto-cols-[20%] gap-4 xl:gap-0  overflow-x-auto  scrollbar-hide">
         {animes?.map((e: Media) => (
      <Link href={`/info/${e.slug}`} className=" flex flex-col gap-2 flex-none cursor-pointer hover:brightness-75" key={e.slug}>
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