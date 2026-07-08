export interface MappingsAnimeVietSub {
    provider : string,
    mediaId  : string,
    title : string,
    sourceurl : string,
    description : string,
}
export interface Anime {
    _id : string,
    slug : string,
    currentEpisode : string,
    anilistData : {
        title : {
            romaji : string,
            english : string,
            native : string,
        },
        coverImage : {
            large : string
        },
        episodes : number,
        seasonYear : number,
        season : string,
        status : string,
        genres : string[],
        description : string,
        trending : number,
        popularity : number,
        averageScore : number,
        bannerImage : string,
         trailer : {
      id : string,
      site : string,
      thumbnail : string
    }
    }
    anilistId : number,
    mappings : [MappingsAnimeVietSub]
}