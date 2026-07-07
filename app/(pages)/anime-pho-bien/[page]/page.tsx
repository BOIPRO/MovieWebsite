import ListAnime from "@/components/common/ListAnime"

type Props = {
  params: {
    page: string
  }
}
export const revalidate = 600
const Page = async ({ params }: Props) => {
  const { page } = await params;
  const pageNumber = parseInt(page.replace('trang-', ''), 10);
  const dataAnime = await fetch(`${process.env.API_URL}/movies/anime-pho-bien?page=${pageNumber}&limit=30`, { next: { revalidate: 600 } })
const data = await dataAnime.json()
  return (
    <div>
      <ListAnime
        media={data.media}
        totalPages={data.totalPages}
        page={pageNumber}
        route="/anime-pho-bien"
      />
      {/* Render danh sách phim */}
    </div>
  )
}

export default Page