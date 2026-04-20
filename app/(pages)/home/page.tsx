import Trending from './Trending'
import { homeAnimes, Media} from "@/types/anilist"
import ListAnime from '@/compoments/ListAnime';
// ISR
async function getAnimes() {
  const getAmoutTrendingAnime = 10
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/home?trending=${getAmoutTrendingAnime}`);
  const data: homeAnimes = await res.json();
  const trendingnAnimes : Media[] = data.trending!;
  const listMedia: Media[] = data.data.media;
  const totalPages = data.data.totalPages;
  const typeUrl = `${process.env.NEXT_PUBLIC_API_URL}/movies/page?`;
  const limit = 30;
  return (
    <section className='max-w-[1200px] mx-auto '>
      <Trending animes={trendingnAnimes} />
        <p className=" mt-2 text-[20px] font-montserrat uppercase font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-red-500 to-red-600 border-b-[0.2px] border-red-500 pb-2 inline-block">Tất cả</p>
      <ListAnime listMedia={listMedia} totalPages={totalPages} typeURL= {typeUrl} limit={limit} />
    </section>
  )
}
export default getAnimes