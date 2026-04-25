"use client"
import { Media } from "@/types/anilist"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
interface Prop {
  info: Media
}
const InfoAnime = ({ info }: Prop) => {
  return (
    <div className="w-full flex flex-col md:flex-row  px-2 py-2  gap-5">
      <Image
        src={info.coverImage}
        alt="Movie Cover"
        width={300}
        height={400}
        style={{ height: "auto" }}
        loading="eager"
        className="rounded-lg mx-auto lg:mx-0 object-cover aspect-3/4 xl:flex-2"
      />
      <div className="md:text-left text-center flex-4 flex flex-col gap-5 ">
        <h1 className="text-white  text-[24px] font-semibold tracking-tight ">{info.titleRomaji}</h1>
        <h1 className="text-[20px]">{info.titleEnglish}</h1>
        <div className="flex gap-2 items-center justify-center md:justify-normal text-[1em]">
          <p>Score: </p>
          <FontAwesomeIcon className="text-yellow-300" icon={faStar} />
          {info.averageScore}
          </div>
        <div className="flex gap-2 items-center justify-center md:justify-normal">
          {info.genres.map((e:string) => (
            <p key = {e}>{e}</p> 
          ))}
        </div>
        <div className="line-clamp-3 px-5 md:px-0 max-w-full" dangerouslySetInnerHTML={{ __html: info.description }}></div>
      </div>
    </div>
  )
}

export default InfoAnime