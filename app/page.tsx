import AnimeSection from './AnimeSection'
import { AnimeResponeType } from '@/types/anime';
import { BannerType } from "@/types/banner"
import Banner from '@/components/layout/Banner';
// ISR

interface ResponseType {
  banner: BannerType[],
  trending: AnimeResponeType[],
  popularity: AnimeResponeType[],
  animeOfTheYear: AnimeResponeType[]
  animeReleasing: AnimeResponeType[]

}
export const revalidate = 600
const res = await fetch(`${process.env.API_URL}/movies/home`);
const data: ResponseType = await res.json()
async function getAnimes() {
  return (
    <div>

      <Banner banners={data.banner} />

      <section className=' max-w-[1350px] mx-auto flex flex-col  gap-8 z-30'>
        <AnimeSection text={"Anime nổi bật"} animes={data.trending} />
        <AnimeSection text={"Anime đang chiếu"} animes={data.animeReleasing} />
        <AnimeSection text={"Anime phổ biến"} href='/anime-pho-bien/trang-1' animes={data.popularity} showMore={true} />
        <AnimeSection text={"Anime năm 2026"} href='/anime-trong-nam/trang-1' animes={data.animeOfTheYear} showMore={true} />
      </section>
    </div>

  )
}
export default getAnimes