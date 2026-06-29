export interface Media {
  _id : string,
  anilistId : number,
  anilistData : {
    coverImage : {
      large : string
    },
    title : {
      romaji : string,
      english : string
    }
    trending : number,
    seasonYear :number,
    season : string,
    genres : string[],
    averageScore : string,
    trailer : {
      id : string,
      site : string,
      thumbnail : string
    }

  },
  coverImage : string,
  description : string,
  mappings : [
    {
      title : string,
      description : string
    }
  ]
  slug : string,
}
export interface pageAnime {
  media : Media[],
  totalPages : number,
}