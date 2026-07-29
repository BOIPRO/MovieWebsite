import { MetadataRoute } from "next";
const baseurl = process.env.NEXT_PUBLIC_CLIENT_URL
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow : ["/stream"]
    },
    sitemap:
      `${baseurl}/sitemap.xml`,
  };
}