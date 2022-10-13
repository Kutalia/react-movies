import axiosClient from './movieDbClient';
import { GetResult } from './types';

export const getTrendingMovies = async () => {
  try {
    const result = await axiosClient.get<GetResult>('/trending/movie/week');
    return result.data.results;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
