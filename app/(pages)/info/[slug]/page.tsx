import type { Metadata } from "next";
import InfoAnime from "@/app/(pages)/info/[slug]/InfoAnime";
import { Episode } from "@/types/episode";
import ListEpsiodes from "@/components/common/ListEpisodes";
import { AnimeDetailType } from "@/types/anime";

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 300;

async function getAnime(id: string): Promise<AnimeDetailType> {
  const res = await fetch(
    `${process.env.API_URL}/movies/info?id=${id}`,
    {
      next: {
        revalidate: 300,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch anime");
  }

  return res.json();
}


// SEO dynamic
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const { slug } = await params;
  const id = String(slug.split("-").pop());

  const infoAnime = await getAnime(id);

  return {
    title: `${infoAnime.title} - BMovie`,
    description: infoAnime.description || `Xem anime ${infoAnime.title} tại BMovie`,

    openGraph: {
      title: `${infoAnime.title} - BMovie`,
      description:
        infoAnime.description || `Xem anime ${infoAnime.title}`,
      images: [
        {
          url: infoAnime.anilistData.coverImage.large,
          width: 600,
          height: 900,
          alt: infoAnime.title,
        },
      ],
      type: "video.movie",
    },

    twitter: {
      card: "summary_large_image",
      title: `${infoAnime.title} - BMovie`,
      description:
        infoAnime.description || `Xem anime ${infoAnime.title}`,
      images: [infoAnime.anilistData.coverImage.large],
    },
  };
}


const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const id = String(slug.split("-").pop());

  const [resInfo, resEpisode] = await Promise.all([
    fetch(`${process.env.API_URL}/movies/info?id=${id}`, {
      next: {
        revalidate: 300,
      },
    }),

    fetch(`${process.env.API_URL}/movies/episodes?id=${id}`, {
      next: {
        revalidate: 100,
        tags: [`anime-episode-${id}`],
      },
    }),
  ]);

  const infoAnime: AnimeDetailType = await resInfo.json();
  const listEpisode: Episode[] = await resEpisode.json();

  return (
    <div className="text-white max-w-[1350px] mx-auto">
      <InfoAnime info={infoAnime} />
      <ListEpsiodes slug={slug} listEpisode={listEpisode} />
    </div>
  );
};

export default Page;