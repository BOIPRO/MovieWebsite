export interface AnimeResponeType {
    slug : string,
    anilistId : number,
    anilistData : {
        coverImage : {
            large : string
        }
    }
    currentEpisode : string,
   title : string
}
export interface AnimeDetailType {
    _id : string,
    slug : string,
    anilistData :{
        title : {
            romaji : string,
            english : string
        },
        coverImage : {
            large : string
        }
        seasonYear : number,
        genres : string[],
        averageScore : number,
    }
    anilistId : number,
   title : string,
   description : string
}