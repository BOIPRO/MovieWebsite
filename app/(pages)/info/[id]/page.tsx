type Props = {
  params: {
    id: string
  }
}
const InfoAnime = async ({ params } : Props) => {
    const {id} = await params;
  return (
    <div className="text-white max-w-[1200px] mx-auto ">{id}</div>
  )
}

export default InfoAnime