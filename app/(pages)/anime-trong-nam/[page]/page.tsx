import ListAnime from "@/components/common/ListAnime"
import { notFound } from "next/navigation";


type Props = {
  params: Promise<{
    page?: string; 
  }>;
};

const Page = async ({ params }: Props) => {
  const resolvedParams = await params;
  const page = resolvedParams?.page;

  if (!page || !page.startsWith('trang-')) {
    notFound(); 
  }

  const pageNumber = parseInt(page.replace('trang-', ''), 10);

  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  const dataAnime = await fetch(
    `${process.env.API_URL}/movies/anime-trong-nam?page=${pageNumber}&limit=30`, 
    { next: { revalidate: 600 } }
  );
  
  const data = await dataAnime.json();

  return (
    <div>
      <ListAnime
        media={data.media}
        totalPages={data.totalPages}
        page={pageNumber}
        route="/anime-trong-nam"
      />
    </div>
  );
};

export default Page;