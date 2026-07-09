"use client"
import Image from "next/image"
import Link from "next/link";
import ScrollContainer from 'react-indiana-drag-scroll';
import { AnimeResponeType } from "@/types/anime";
import HoverButtonInverted from "@/components/ui/HoverButton";
interface TrendingProps {
  animes: AnimeResponeType[]
  text: string,
  showMore?: boolean
  href?: string
}
const AnimeSection = ({ showMore, animes, text, href }: TrendingProps) => {
  return (
    <div className="pt-2 px-2 flex flex-col gap-3">
      <div className="flex justify-between xl:justify-normal">
        <p className=" text-[20px]  py-3 font-semibold px-3 text-white">{text} </p>
        {showMore ? <HoverButtonInverted href={href || "#"} /> : null}
      </div>

      <ScrollContainer className=" gap-5 flex flex-row  items-start overflow-x-auto  scrollbar-hide">
        {animes?.map((e: AnimeResponeType) => (
          <Link
            prefetch={false}
            href={`/info/${e.slug}-${e.anilistId}`}
            className="w-[200px] flex flex-col items-start gap-2 flex-none cursor-pointer hover:brightness-75"
            key={e.slug}
          >
            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden">
              {/* Hình ảnh */}
              <Image
                src={e.anilistData.coverImage.large}
                alt="Movie Cover"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                loading="eager"
                className="object-cover"
              />

              {/* Phần hiển thị tập phim */}
              <div className="absolute top-2 right-2 z-10 bg-blue-600 px-2 py-1 rounded text-white text-[16px] font-bold backdrop-blur-sm">
                {e.currentEpisode === "Full" ?  "Full" : `Tập ${e.currentEpisode} ` }
              </div>
            </div>

            <p className="text-white text-[16px] font-semibold break-words w-full">
              {e.title}
            </p>
          </Link>
        ))}
      </ScrollContainer>
    </div>
  )
}

export default AnimeSection