export enum Query {
  GET_TRENDING_MOVIES,
  GET_POPULAR_MOVIES,
  GET_POPULAR_SERIES
}

export type QueryParam = { [k: string]: string | number | null | undefined | boolean };

export enum TitleCategory {
  MOVIE = 'movie',
  TV = 'tv',
}

export interface Movie {
  poster_path?: string;
  adult?: boolean;
  overview?: string;
  release_date: string;
  genre_ids?: Array<number>;
  id: number;
  original_title?: string;
  original_language?: string;
  title?: string;
  backdrop_path?: string;
  popularity: number;
  vote_count: number;
  video?: boolean;
  vote_average: number;
}

export interface TVShow {
  backdrop_path?: string;
  first_air_date: string;
  id: number;
  name: string;
  origin_country: Array<string>;
  original_language: string;
  original_name?: string;
  overview?: string;
  popularity: number;
  vote_count: number;
  poster_path?: string;
  vote_average: number;
}

export interface GetResult {
  page: number;
  results: Array<Movie>;
  total_pages: number;
  total_results: 20000;
}

export interface HookState {
  data: Array<Movie>;
  loading: boolean;
  error?: string;
}
