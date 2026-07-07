import InfoAnime from "@/app/(pages)/info/[slug]/InfoAnime";
import { Episode } from "@/types/episode";
import ListEpsiodes from "@/components/common/ListEpisodes";
import { Anime } from "@/types/anime";
type Props = {
  params: {
    slug: string
  }
}
export const revalidate = 300
const Page = async ({ params } : Props) => {
    const {slug} = await params;
   const id = String(slug.split('-').pop());
    const [resInfo,resEpisode] = await Promise.all([
       fetch(`${process.env.API_URL}/movies/info?id=${id}`,{
        next: { revalidate: 300, tags: [`anime-info-${id}`] }
       }),
      fetch(`${process.env.API_URL}/movies/episodes?id=${id}`,{
        next: { revalidate: 300, tags: [`anime-info-${id}`] }
      }),
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