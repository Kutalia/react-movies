import axiosClient from './movieDbClient';
import { GenreResult, GetResult, MediaType, TrailerResult, TVShow, Movie, FullMovie, FullTVShow } from './types';

export const getTrendingMovies = async () => {
  try {
    const result = await axiosClient.get<GetResult<Movie>>('/trending/movie/week');
    return result.data.results.slice(0, 10);
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
    const result = await axiosClient.get<GetResult<Movie | TVShow>>(`/discover/${mediaType}?primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}`);
    return result.data.results.slice(0, 20);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getTrailer = async (id: number, mediaType: MediaType) => {
  try {
    const result = await axiosClient.get<TrailerResult>(`/${mediaType}/${id}/videos`);
    return result.data.results.find(({ type, site }) => type === 'Trailer' && site === 'YouTube');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getFullTitle = async (id: number, mediaType: MediaType) => {
  try {
    const result = await axiosClient.get<FullMovie | FullTVShow>(`/${mediaType}/${id}`);
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
      axiosClient.get<GetResult<Movie>>(`/search/movie/?query=${query}`),
      axiosClient.get<GetResult<TVShow>>(`/search/tv/?query=${query}`),
    ]);

    const searchedMovies = movieResult.data.results;
    const searchedTVShows = tvResult.data.results;

    return [...searchedMovies, ...searchedTVShows].slice(0, 20);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
