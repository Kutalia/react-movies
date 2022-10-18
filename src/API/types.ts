export enum Query {
  GET_TRENDING_MOVIES,
  GET_POPULAR_MOVIES,
  GET_POPULAR_SERIES,
  GET_TRAILER,
  GET_GENRES,
  SEARCH_TITLES,
  GET_FULL_TITLE,
}

export enum MediaType {
  MOVIE = 'movie',
  TV = 'tv',
}

export interface GetResult<T> {
  page: number;
  results: Array<T>;
  total_pages: number;
  total_results: 20000;
}

export interface GetTrailerParams {
  id: number;
  mediaType: MediaType;
}

export interface GetTitleParams {
  id: number;
  mediaType: MediaType;
}

export type SearchTitlesParams = string;

export type RawMovie = {
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
};

export type Movie = RawMovie & {
  media_type: MediaType; // custom property for telling apart movies and tv shows
};

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface FullMovie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    backdrop_path: string;
    id: number;
    name: string;
    poster_to_path: string;
  };
  budget: number;
  genres: Array<Genre>;
  homepage?: string;
  id: number;
  imdb_id?: string;
  original_language: string;
  original_title: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: Array<ProductionCompany>;
  production_countries?: Array<ProductionCountry>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<SpokenLanguage>;
  status?: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_countr: number;
}

export type RawTVShow = {
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
};

export type TVShow = RawTVShow & {
  media_type: MediaType; // custom property for telling apart movies and tv shows
};

export interface Credit {
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  profile_path: string;
}

export interface Episode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path?: string;
  vote_average: number;
  vote_count: number;
}

export interface Network {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface FullTVShow {
  adult: boolean;
  backdrop_path: string;
  created_by: Array<Credit>;
  episode_run_time: Array<number>;
  genres: Array<Genre>;
  homepage?: string;
  id: number;
  in_production: boolean;
  languages: Array<string>;
  last_air_date: string;
  last_episode_to_air: Episode;
  name: string;
  networks: Array<Network>;
  next_episode_to_air: null;
  number_of_episodes: number;
  number_of_seasons: 1;
  origin_country: Array<string>;
  original_language?: string;
  original_theme?: string;
  overview: string;
  popularity: number;
  poseter_path?: string;
  production_companies: Array<ProductionCompany>;
  production_countries: Array<ProductionCountry>;
  seasons: Array<Season>;
  spoken_languages: Array<SpokenLanguage>;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface Trailer {
  id: string;
  iso_639_1?: string;
  iso_3166_1?: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface TrailerResult {
  id: number;
  results: Array<Trailer>;
}

export interface GenreResult {
  genres: Array<Genre>;
}

export interface HookState<T> {
  data?: T;
  loading?: boolean;
  error?: string;
}
