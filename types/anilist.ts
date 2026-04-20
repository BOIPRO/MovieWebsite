export interface Media {
  _id : string,
  anilistId : number,
  coverImage : string,
  description : string,
  titleEnglish : string,
  titleRomaji : string,

}
export interface pageAnime {
  media : [
    Media
  ],
  totalPages : number,
}
export interface homeAnimes {
  trending : [
    Media 
  ],
  data : pageAnime
}