import Trending from './Trending'
import { Media, pageAnime } from "@/types/anilist"
import ListAnime from '@/compoments/ListAnime';
// ISR
export const revalidate = 300
async function getAnimes() {
  const amountTrendingAnime = 10
  const pageAnime = 1;
  const limit = 30;
  const [res1, res2] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/trending?amount=${amountTrendingAnime}`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/page?page=${pageAnime}&limit=${limit}`)
  ])
  const trendingAnimes: Media[] = await res1.json();
  const listAnime: pageAnime = await res2.json();
  const listMedia: Media[] = listAnime.media;
  const totalPages = listAnime.totalPages;
  const typeUrl = `${process.env.NEXT_PUBLIC_API_URL}/movies/page?`;
  return (
    <section className='max-w-[1200px] mx-auto '>
      <Trending animes={trendingAnimes} />
      <p className=" mt-2 text-[20px] font-montserrat uppercase font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-red-500 to-red-600 border-b-[0.2px] border-red-500 pb-2 inline-block">Tất cả</p>
      <ListAnime listMedia={listMedia} totalPages={totalPages} typeURL={typeUrl} limit={limit} page={pageAnime} />
    </section>
  )
}
export default getAnimes