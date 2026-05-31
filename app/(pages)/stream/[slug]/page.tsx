import ListEpsiodes from '@/components/common/ListEpisodes';
import VideoPlayer from './VideoPlayer';
import { Suspense } from 'react';
import Loading from '@/app/loading';
type Props = {
  params: {
    slug: string
  }
}
interface StreamingResponse {
  url : string
}
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/stream?anilistId=${anilistId}&episodeSlug=${episodeSlug}`);
    const data : StreamingResponse = await res.json()
    const url = data.url
      return (
      <div className='max-w-[1200px] mx-auto'>
        <Suspense fallback={<Loading />}>
          <VideoPlayer url={url}/>
        </Suspense>
        <ListEpsiodes slug={`${slugAnime}-${anilistId}`} id = {anilistId} episodeNumber={episodeNumber} />
      </div>
    )
    }
    return (
      <div>Link bi loi</div>
    )
}

export default page