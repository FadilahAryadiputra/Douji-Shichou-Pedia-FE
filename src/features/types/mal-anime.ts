export interface MalAnimePicture {
  medium: string;
  large: string;
}

export interface MalAnimeGenre {
  id: number;
  name: string;
}

export interface MalAnimeStudio {
  id: number;
  name: string;
}

export interface MalAnimeAlternativeTitles {
  synonyms?: string[];
  en?: string;
  ja?: string;
}

export interface MalAnimeStartSeason {
  year: number;
  season: string;
}

export interface MalAnime {
  mal_id: number;
  title: string;
  main_picture?: MalAnimePicture;
  alternative_titles?: MalAnimeAlternativeTitles;
  start_date?: string;
  end_date?: string;
  synopsis?: string;
  mean?: number;
  
  genres?: MalAnimeGenre[];

  media_type?: string;
  status?: string;
  num_episodes?: number;
  start_season?: MalAnimeStartSeason;

  studios?: MalAnimeStudio[];

  is_imported: boolean;
}

export interface MalAnimeSearchResponse {
  data: MalAnime[];

  pagination: {
    page: number;
    take: number;
    total: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface MalAnimeDetailResponse {
  message: string;
  data: MalAnime;
}