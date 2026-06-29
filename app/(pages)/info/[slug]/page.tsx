import InfoAnime from "@/app/(pages)/info/[slug]/InfoAnime";
import { Episode } from "@/types/episode";
import ListEpsiodes from "@/components/common/ListEpisodes";
import WatchNow from "./WatchNow";
import { Anime } from "@/types/anime";
type Props = {
  params: {
    slug: string
  }
}
const Page = async ({ params } : Props) => {
    const {slug} = await params;
   const id = String(slug.split('-').pop());
    const [resInfo,resEpisode] = await Promise.all([
       fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/info?id=${id}`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/episodes?id=${id}`),
    ])
   
    const infoAnime : Anime[] = await resInfo.json();
     const listEpisode : Episode[] = await resEpisode.json();
  return (
    <div className="text-white max-w-[1350px] mx-auto ">
      <InfoAnime info = {infoAnime[0]} />
      <ListEpsiodes slug={slug} listEpisode = {listEpisode}/>
    </div>
  )
}

export default Page