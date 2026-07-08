import { AnimeType } from "@/app/page";
import ListAnime from "@/components/common/ListAnime";
type Props = {
  params: {
    query: string,
    page: string
  }
}
export default async function Page({ params }: Props) {
  const { query,page } = await params;
  const limit = 30;
 const pageNumber = parseInt(page.replace('trang-', ''), 10);
  const res = await fetch(`${process.env.API_URL}/movies/search?s=${query}&page=${pageNumber}&limit=${limit}`,{
    cache : "no-store"
  });
  const data = await res.json();
  const listMedia : AnimeType[] = data.media;
  const totalPages = data.totalPages;
  return (
    <section className={`max-w-[1350px] mx-auto `}>
        <p className="text-[20px] text-white">Kết quả tìm kiếm cho : {decodeURIComponent(query)} </p>
        <ListAnime
          media={listMedia}
          totalPages={totalPages}
          page={pageNumber}
          route={`/search/${query}`}
        />
    </section>
  );
}