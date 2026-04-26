import InfoAnime from "@/compoments/InfoAnime";
import { Epsiode, Media } from "@/types/anilist";
import ListEpsiodes from "./ListEpsiodes";
type Props = {
  params: {
    id: string
  }
}
const Page = async ({ params } : Props) => {
    const {id} = await params;
    const [resInfo,resEpsiode] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/info?id=${id}`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/epsiode?id=${id}`)
    ]) 
    const infoAnime : Media[] = await resInfo.json();
    const listEpsiode : Epsiode[] = await resEpsiode.json();
  return (
    <div className="text-white max-w-[1200px] mx-auto ">
      <InfoAnime info = {infoAnime[0]} />
      <ListEpsiodes listEpsiode = {listEpsiode} />
    </div>
  )
}

export default Page