import { MetadataRoute } from "next";
const baseurl = process.env.NEXT_PUBLIC_CLIENT_URL
interface ResponseApi  {
    slug : string,
    anilistId : number
}
// cache sitemap
export const revalidate = 3600;
export default async function siteMap() : Promise<MetadataRoute.Sitemap> {
    const res  = await fetch(`${process.env.API_URL}/movies/sitemap`)
    const animes : ResponseApi[] = await res.json()
    const InfoAnimepages = animes.map((anime : ResponseApi)=> (
        {
            url : `${baseurl}/info/${anime.slug}-${anime.anilistId}`,
            priority : 0.8
        }
    ) )
    return [
        {
            url : `${baseurl}`,
            changeFrequency :"daily",
            priority : 1
        },
        ...InfoAnimepages
    ]
}