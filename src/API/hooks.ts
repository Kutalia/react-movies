import { useEffect, useState } from 'react';

import { getFullTitle, getGenres, getPopularTitles, getReviews, getTrailer, getTrendingMovies, searchTitles } from './queries';
import {
  Query,
  HookState,
  GetTrailerParams,
  MediaType,
  Trailer,
  SearchTitlesParams,
  Movie,
  TVShow,
  FullMovie,
  GetTitleParams,
  FullTVShow,
  GetResult,
  GetReviewsParams,
  Review
} from './types';

const defaultState = {};

export const useQuery = <T>(
  query: Query,
  ...queryParams: (
    T extends Trailer
    ? [GetTrailerParams]
    : T extends Array<Movie> | Array<TVShow>
    ? []
    : T extends Array<Movie | TVShow>
    ? [SearchTitlesParams]
    : T extends FullMovie | FullTVShow
    ? [GetTitleParams]
    : T extends GetResult<Review>
    ? [GetReviewsParams]
    : [])
) => {
  const [state, setState] = useState<HookState<T>>(defaultState);

  const params = queryParams[0];

  useEffect(() => {
    let callApi: Promise<any> | null = null;

    switch (query) {
      case Query.GET_TRENDING_MOVIES:
        callApi = getTrendingMovies();
        break;
      case Query.GET_POPULAR_MOVIES:
        callApi = getPopularTitles(MediaType.MOVIE);
        break;
      case Query.GET_POPULAR_SERIES:
        callApi = getPopularTitles(MediaType.TV);
        break;
      case Query.GET_TRAILER:
        if (params) {
          callApi = getTrailer(params as GetTitleParams);
        } else {
          callApi = Promise.reject('Invalid parameters for getting trailer');
        }
        break;
      case Query.GET_GENRES:
        callApi = getGenres();
        break;
      case Query.SEARCH_TITLES:
        if (params) {
          callApi = searchTitles(params as SearchTitlesParams);
        } else if (params == null) {
          callApi = Promise.reject('Invalid parameters for searching titles');
        }
        break;
      case Query.GET_FULL_TITLE:
        if (params) {
          callApi = getFullTitle(params as GetTitleParams);
        } else {
          callApi = Promise.reject('Invalid parameters for getting full title');
        }
        break;
      case Query.GET_REVIEWS:
        if (params) {
          callApi = getReviews(params as GetReviewsParams);
        } else {
          callApi = Promise.reject('Invalid parameters for getting title reviews');
        }
        break;
      default:
        callApi = Promise.reject('Invalid query');
    }

    if (callApi) {
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      callApi.then((data) => {
        if (data) {
          setState((prevState) => ({
            ...prevState,
            data
          }));
        }
      }).catch((error) => {
        setState((prevState) => ({
          ...prevState,
          error,
        }));
      }).finally(() => {
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      });
    }
  }, [query, params]);

  return state;
};
