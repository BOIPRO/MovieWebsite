import InfoAnime from "@/compoments/InfoAnime";
import { Media } from "@/types/anilist";
type Props = {
  params: {
    id: string
  }
}
const Page = async ({ params } : Props) => {
    const {id} = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/info?id=${id}`);
    const data : Media[] = await res.json();
  return (
    <div className="text-white max-w-[1200px] mx-auto ">
      <InfoAnime info = {data[0]} />
      Danh sach tap
    </div>
  )
}

export default Page