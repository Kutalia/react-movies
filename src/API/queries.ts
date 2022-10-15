import axiosClient from './movieDbClient';
import { GetResult, MediaType, TrailerResult } from './types';

export const getTrendingMovies = async () => {
  try {
    const result = await axiosClient.get<GetResult>('/trending/movie/week');
    return result.data.results;
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
    const result = await axiosClient.get<GetResult>(`/discover/${mediaType}?primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}`);
    return result.data.results;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getTrailer = async (id: number, mediaType: MediaType) => {
  try {
    const result = await axiosClient.get<TrailerResult>(`/${mediaType}/${id}?append_to_response=videos`);
    return result.data.videos.results.find(({ type, site }) => type === 'Trailer' && site === 'YouTube');
  } catch (err) {
    console.error(err);
    throw err;
  }
};
