import InfoAnime from "@/compoments/InfoAnime";
import { Media } from "@/types/anilist";
import ListEpsiodes from "@/compoments/ListEpsiodes";
type Props = {
  params: {
    id: string
  }
}
const Page = async ({ params } : Props) => {
    const {id} = await params;
    const resInfo = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/info?id=${id}`);
    const infoAnime : Media[] = await resInfo.json();
  return (
    <div className="text-white max-w-[1200px] mx-auto ">
      <InfoAnime info = {infoAnime[0]} />
      <ListEpsiodes id = {id} />
    </div>
  )
}

export default Page