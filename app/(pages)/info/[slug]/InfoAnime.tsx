import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { AnimeDetailType } from "@/types/anime";

interface Prop {
  info: AnimeDetailType;
}

const InfoAnime = ({ info }: Prop) => {
  return (
    <div className=" flex flex-col px-2  items-center md:items-start md:flex-row gap-6 bg-[#0b1317]/50 rounded-2xl border border-white/5">
      
      {/* Container ảnh: 
        Mobile: Chiếm 70% chiều rộng màn hình, tỉ lệ 3/4
        Desktop: Cố định 280px
      */}
      <div className="relative w-[40%] md:w-[280px] aspect-[3/4] overflow-hidden rounded-xl shadow-2xl">
        <Image
          src={info.anilistData.coverImage.large}
          alt={info.title}
          fill
          // Tối ưu cho cả Mobile (độ phân giải cao) và Desktop
          sizes="(max-width: 768px) 70vw, 280px"
          priority
          className="object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col gap-4 text-center md:text-left ">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight">
            {info.title}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {info.anilistData.title.romaji} • {info.anilistData.title.english}
          </p>
        </div>

        <div className="flex flex-col gap-3 items-center md:items-start">
          <div className="flex items-center gap-2 text-lg">
            <span className="text-gray-300">Score:</span>
            <div className="flex items-center gap-1.5 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
              <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
              <span className="font-bold text-yellow-400">{info.anilistData.averageScore? info.anilistData.averageScore: "?" }%</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {info.anilistData.genres.map((genre: string) => (
              <span 
                className="px-3 py-1 text-xs font-medium rounded-md bg-blue-900/30 border border-blue-800/50 text-blue-200" 
                key={genre}
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        <div 
          className="text-gray-300/80 leading-relaxed text-sm md:text-base px-2 md:px-0 line-clamp-6 text-left"
          dangerouslySetInnerHTML={{ __html: info.description }} 
        />
      </div>
    </div>
  );
};

export default InfoAnime;