import axiosClient from './movieDbClient';
import { GetResult, TitleCategory } from './types';

export const getTrendingMovies = async () => {
  try {
    const result = await axiosClient.get<GetResult>('/trending/movie/week');
    return result.data.results;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getPopularTitles = async (titleCategory: TitleCategory) => {
  const currentDate = new Date();
  const endDate = currentDate.toISOString().slice(0, 10);
  const startDate = `${currentDate.getUTCFullYear()}-01-01`;

  try {
    const result = await axiosClient.get<GetResult>(`/discover/${titleCategory}?primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}`);
    return result.data.results;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
