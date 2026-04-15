export interface Media {
  id: number;
  title: {
    romaji: string;
  };
  coverImage: {
    large: string
  };
  description : string;
}
export interface pageInfo {
    total : number,
    currentPage : number,
    lastPage : number,
    hasNextPage : boolean
}
export interface Animes<T> {
  data: {
    list : {
      pageInfo? : pageInfo
      media : T[];
    }
    trending?: {
      media: T[];
    }
  }
}