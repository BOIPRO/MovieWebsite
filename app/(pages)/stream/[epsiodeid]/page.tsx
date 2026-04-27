import ListEpsiodes from '@/compoments/ListEpsiodes';
import VideoPlayer from './VideoPlayer';
type Props = {
  params: {
    epsiodeid: string
  }
}
const page = async ({params} : Props) => {
    const {epsiodeid} = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/stream?epsisodeId=${epsiodeid}`)
    const linkPlayList = await res.json();
    const url = `/api/proxy?url=${linkPlayList[0]}`
    return (
      <div className='max-w-[1200px] mx-auto'>
        <VideoPlayer url={url}/>
      </div>
    )
}

export default page