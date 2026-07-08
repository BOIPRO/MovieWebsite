import VideoPlayer from './VideoPlayernew';
import { Episode } from '@/types/episode';
import ListEpsiodes from "@/components/common/ListEpisodes";
type Props = {
  params: {
    slug: string
  }
}
interface StreamingResponse {
  url : string
}
const headers = {
  'x-api-key': process.env.INTERNAL_API_KEY as string,
};
const page = async ({params} : Props) => {
    const {slug} = await params
    const regex = /(.*)-(\d+)-(tap-.*)$/; 
    const match = slug.match(regex)
    if (match) {
    const slugAnime = match[1]
    const anilistId = match[2];     
    const episodeSlug = match[3];
    const match2 = slug.match(/tap-(.*)/);
    const episodeNumber = match2 ? match2[1] : null!;
    const [resdata,resEpisode] = await Promise.all([
      fetch(`${process.env.API_URL}/movies/stream?anilistId=${anilistId}&episodeSlug=${episodeSlug}&provider=animevietsub&server=DU`,{cache : 'no-store'},),
      fetch(`${process.env.API_URL}/movies/episodes?id=${anilistId}`,{ next: { revalidate: 300 } })
    ])
    const listEpisode : Episode[] = await resEpisode.json()
    const data = await resdata.text()
      return (  
      <div className='max-w-[1350px]  mx-auto '>
        <div className='gap-2  xl:flex xl:h-[500px]'>
          {data === '' ? 
          <div className='flex-1 mx-auto text-center '>
            <p>Chưa có phim thông cảm nhé hihi</p>
          </div>
           :  <VideoPlayer m3u8= {data} /> }
            <ListEpsiodes slug={`${slugAnime}-${anilistId}`} listEpisode={listEpisode} episodeNumber={episodeNumber} />
        </div>
          
      </div>
    )
    }
    return (
      <div>Link bi loi</div>
    )
}

export default page