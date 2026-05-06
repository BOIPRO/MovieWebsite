import ListEpsiodes from '@/compoments/ListEpisodes';
import VideoPlayer from './VideoPlayer';
type Props = {
  params: {
    slug: string
  }
}
interface StreamingResponse {
  _id : string,
  url : string

}
const page = async ({params} : Props) => {
    const {slug} = await params
    const regex = /(\d+)-(tap-.*)$/; 
    const match = slug.match(regex)
    if (match) {
    const anilistId = match[1];     
    const episodeSlug = match[2];
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/stream?anilistId=${anilistId}&episodeSlug=${episodeSlug}`);
    const data : StreamingResponse = await res.json()
    const url = data.url
      return (
      <div className='max-w-[1200px] mx-auto'>
        <VideoPlayer url={url}/>
      </div>
    )
    }
    return (
      <div>Link bi loi</div>
    )
}

export default page