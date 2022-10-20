import axiosClient from './movieDbClient';
import {
  GenreResult,
  GetResult,
  MediaType,
  TrailerResult,
  RawTVShow,
  RawMovie,
  FullMovie,
  FullTVShow,
  Review,
  GetReviewsParams,
  GetTrailerParams,
  GetFullTitleParams,
} from './types';
import { concatMediaType } from './helpers';

export const getTrendingMovies = async () => {
  try {
    const result = await axiosClient.get<GetResult<RawMovie>>('/trending/movie/week');
    return concatMediaType(result.data.results.slice(0, 10), MediaType.MOVIE);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getPopularTitles = async (mediaType: MediaType) => {
  const currentDate = new Date();
  const endDate = currentDate.toISOString().slice(0, 10);
  const startDate = `${currentDate.getUTCFullYear()}-01-01`;

  try {
    const result = await axiosClient.get<GetResult<RawMovie | RawTVShow>>(`/discover/${mediaType}?primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}`);
    return concatMediaType(result.data.results.slice(0, 20), mediaType);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getTrailer = async ({ id, mediaType }: GetTrailerParams) => {
  try {
    const result = await axiosClient.get<TrailerResult>(`/${mediaType}/${id}/videos`);
    return result.data.results.find(({ type, site }) => type === 'Trailer' && site === 'YouTube');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getFullTitle = async ({ id, mediaType }: GetFullTitleParams) => {
  try {
    const result = await axiosClient.get<FullMovie | FullTVShow>(`/${mediaType}/${id}?append_to_response=keywords,credits,similar`);
    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getReviews = async ({ id, mediaType, page }: GetReviewsParams) => {
  try {
    const result = await axiosClient.get<GetResult<Review>>(`/${mediaType}/${id}/reviews?page=${page}`);
    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getGenres = async () => {
  try {
    const [movieResult, tvResult] = await Promise.all([
      axiosClient.get<GenreResult>('/genre/movie/list'),
      axiosClient.get<GenreResult>('/genre/tv/list'),
    ]);

    const movieGenres = movieResult.data.genres;
    const tvGenres = tvResult.data.genres;

    return Array.from(new Set([...movieGenres, ...tvGenres]));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const searchTitles = async (query: string) => {
  try {
    const [movieResult, tvResult] = await Promise.all([
      axiosClient.get<GetResult<RawMovie>>(`/search/movie/?query=${query}`),
      axiosClient.get<GetResult<RawTVShow>>(`/search/tv/?query=${query}`),
    ]);

    const searchedMovies = movieResult.data.results;
    const searchedTVShows = tvResult.data.results;

    return [
      ...concatMediaType((searchedMovies.map((movie) => ({ ...movie, media_type: MediaType.MOVIE }))), MediaType.MOVIE),
      ...concatMediaType(searchedTVShows.map((tvShow) => ({ ...tvShow, media_type: MediaType.TV })), MediaType.TV),
    ].slice(0, 20);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
