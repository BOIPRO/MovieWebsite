import AnimeSection from './AnimeSection'
import ListAnime from '@/components/common/ListAnime';
import HoverButton from '@/components/ui/HoverButton';
import { Anime } from '@/types/anime';
import Banner from '@/components/layout/Banner';
// ISR
export type BannerType = Pick<Anime,'_id' | 'anilistId'> & {
  anilistData : Pick<Anime['anilistData'],'seasonYear' | 'averageScore' | 'bannerImage' | 'trailer' | 'coverImage'>,
  title : string,
  slug : string,
  firstEpisode : string
} 
export type AnimeType = Pick<Anime,'_id' | 'anilistId' | 'slug'> & {
  anilistData : Pick<Anime['anilistData'],'seasonYear' | 'averageScore' | 'coverImage'|'season'|'trending'>
} & {
  mappings : Pick<Anime['mappings'][number],'title'>[]
}

interface ResponseType {
  banner : BannerType[],
  trending : AnimeType[],
  popularity : AnimeType[],
  animeOfTheYear : AnimeType[]

}
export const revalidate = 600
async function getAnimes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/home`);
  const data : ResponseType = await res.json()
  return (
    <div className='w-screen'>
     <Banner banners={data.banner} />
     <section className=' max-w-[1350px] mx-auto flex flex-col gap-8 z-30'>
         <AnimeSection text={"Anime nổi bật"} animes={data.trending} />
        <AnimeSection text = {"Anime phổ biến"} animes={data.popularity} showMore = {true} />
        <AnimeSection text = {"Anime năm 2026"} animes={data.animeOfTheYear} showMore = {true} />
      
    </section>
    </div>
   
  )
}
export default getAnimes