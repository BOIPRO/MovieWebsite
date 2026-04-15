import Trending from './Trending'
import { Animes, Media,pageInfo } from "@/types/anilist"
import ListAnime from './ListAnime';
// ISR
async function getAnimes() {
  const query = `
    query {
      list: Page(page: 1, perPage: 30) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
    }
    media(sort: POPULARITY_DESC) {
      id
      title {
        romaji
      }
      coverImage {
        large
      }
      description
    }
  }

      trending: Page(page: 1, perPage: 10) {
        media(sort: TRENDING_DESC) { id title { romaji } coverImage { large } }
      }
    }
  `;
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 }
  });
  const json: Animes<Media> = await res.json();
  const data = json.data;
  const trendingnAnimes: Media[] = data.trending!.media;
  const popularAnimes: Media[] = data.list.media;
  const pageInfo : pageInfo = data.list.pageInfo!;
  return (
    <section className='max-w-[1200px] mx-auto '>
      <Trending animes={trendingnAnimes} />
      <ListAnime popularAnimes={popularAnimes} pageInfo={pageInfo} />
    </section>
  )
}
export default getAnimes