import ListAnime from "@/compoments/ListAnime";
import { pageAnime } from "@/types/anilist";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ s?: string }>;
}) {
  const params = await searchParams;
  const s = params.s;
  const limit = 30;
  const pageAnime = 1;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/search?s=${s}&page=${pageAnime}&limit=${limit}`,{
    cache : "no-store"
  });
  const data : pageAnime = await res.json();
  const listMedia = data.media;
  const totalPages = data.totalPages;
   const typeUrl = `${process.env.NEXT_PUBLIC_API_URL}/movies/search?s=${s}&`;
  
  return (
    <section className={`max-w-[1200px] mx-auto `}>
        <p className=" mt-2 text-[20px] font-montserrat uppercase font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-red-500 to-red-600 border-b-[0.2px] border-red-500 pb-2 inline-block">Kết quả tìm kiếm cho : {s} </p>
        {totalPages > 0 ?  <ListAnime key={s} listMedia={listMedia} totalPages={totalPages} typeURL={typeUrl} limit={limit} page={pageAnime}  /> : <div className="w-full text-center text-white text-lg">Page Not Foud</div> }
    </section>
  );
}