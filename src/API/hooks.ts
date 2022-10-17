import { useEffect, useState } from 'react';

import { getGenres, getPopularTitles, getTrailer, getTrendingMovies, searchTitles } from './queries';
import { Query, HookState, GetTrailerParams, MediaType, Trailer, SearchTitlesParams, Movie, TVShow } from './types';

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
          callApi = getTrailer((params as GetTrailerParams).id, (params as GetTrailerParams).mediaType);
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
