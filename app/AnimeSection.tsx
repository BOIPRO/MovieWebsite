"use client"
import Image from "next/image"
import Link from "next/link";
import ScrollContainer from 'react-indiana-drag-scroll';
import { AnimeResponeType } from "@/types/anime";
import HoverButtonInverted from "@/components/ui/HoverButton";
import { useRef } from "react";
interface TrendingProps {
  animes: AnimeResponeType[]
  text: string,
  showMore?: boolean
  href?: string
}
const AnimeSection = ({ showMore, animes, text, href }: TrendingProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;

    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (direction === "right") {
      if (container.scrollLeft >= maxScrollLeft - 10) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: 500,
          behavior: "smooth",
        });
      }
    }

    if (direction === "left") {
      if (container.scrollLeft <= 10) {
        container.scrollTo({
          left: maxScrollLeft,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: -500,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="pt-2 w-full">
      <div className="flex justify-between pb-2">
        <p className="text-[20px] py-3 font-semibold px-3 text-white">
          {text}
        </p>

        {showMore && <HoverButtonInverted href={href || "#"} />}
      </div>

      <div className="relative">
        {/**  Nut trai */}
        <button
          onClick={() => handleScroll("left")}
          className="
            flex
            absolute left-0 top-1/2 -translate-y-1/2
            z-20
           w-[40px] h-[40px]
            items-center justify-center
            
              bg-blue-600
            text-white
            transition
          text-[16px]
          "
        >
          &lt;
        </button>

        <ScrollContainer
          innerRef={scrollRef}
          className="
            gap-4 
            flex flex-row 
            items-start 
            overflow-x-auto 
            scrollbar-hide 
            pb-2
          "
        >
          {animes?.map((e: AnimeResponeType) => (
            <Link
              prefetch={false}
              href={`/info/${e.slug}-${e.anilistId}`}
              className="
                w-[150px] lg:w-[200px]
                min-w-[150px] lg:min-w-[200px]
                flex flex-col items-start gap-2
                flex-none cursor-pointer group
              "
              key={`${e.slug}-${e.anilistId}`}
            >
              <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
                <Image
                  src={e.anilistData.coverImage.large}
                  alt="Movie Cover"
                  fill
                  sizes="(max-width: 768px) 150px, 200px"
                  className="object-cover group-hover:brightness-75 transition-all duration-300"
                  unoptimized
                />

                <div className="absolute top-2 right-2 z-10 bg-blue-600 px-2 py-1 rounded text-white text-[12px] lg:text-[14px] font-bold">
                  {e.currentEpisode === "Full"
                    ? "Full"
                    : `Tập ${e.currentEpisode}`}
                </div>
              </div>

              <p className="text-white text-[14px] lg:text-[16px] font-semibold w-full line-clamp-2 group-hover:text-blue-400 transition-colors">
                {e.title}
              </p>
            </Link>
          ))}
        </ScrollContainer>
        {/**  Nut phai */}
        <button
          onClick={() => handleScroll("right")}
          className="
            flex
            absolute right-0 top-1/2 -translate-y-1/2
            z-20
           w-[40px] h-[40px]
            text-[16px]
            items-center justify-center
            bg-blue-600
            text-white
            transition
          "
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default AnimeSection;
