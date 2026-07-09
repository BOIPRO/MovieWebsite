export interface BannerType {
    _id : string,
    slug : string
    anilistData :{
        coverImage : {
            large : string
        }
        seasonYear :number,
        averageScore : number,
        bannerImage : string,
         trailer : {
        id : string,
        site : string,
        thumbnail : string
    }
    }
    anilistId : number,
    title : string,
    firstEpisode : string
}