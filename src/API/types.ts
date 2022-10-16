export enum Query {
  GET_TRENDING_MOVIES,
  GET_POPULAR_MOVIES,
  GET_POPULAR_SERIES,
  GET_TRAILER,
  GET_GENRES,
}

export enum MediaType {
  MOVIE = 'movie',
  TV = 'tv',
}

export interface GetTrailerParams {
  id: number;
  mediaType: MediaType;
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

export interface Trailer {
  id: string;
  key: string;
  name: string;
  published_at: string;
  official: boolean;
  site: string;
  type: string;
}

export interface TrailerResult {
  [k: string]: any;
  videos: {
    results: Array<Trailer>;
  }
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreResult {
  genres: Array<Genre>;
}

export interface HookState<T> {
  data?: T;
  loading?: boolean;
  error?: string;
}
