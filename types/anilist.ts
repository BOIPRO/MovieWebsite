export interface Media {
  _id : string,
  anilistId : number,
  idMal : number,
  coverImage : string,
  description : string,
  titleEnglish : string,
  titleRomaji : string,
  averageScore : number,
  genres : string[]
}
export interface Epsiode {
  number : number,
  id : string,
  image : string,
  imageHash : string
}
export interface pageAnime {
  media : Media[],
  totalPages : number,
}