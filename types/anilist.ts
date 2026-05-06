export interface Media {
  _id : string,
  anilistId : number,
  idMal : number,
  coverImage : string,
  description : string,
  titleEnglish : string,
  titleRomaji : string,
  averageScore : number,
  genres : string[],
  slug : string,
}
export interface pageAnime {
  media : Media[],
  totalPages : number,
}