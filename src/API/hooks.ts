import { useEffect, useState } from 'react';

import { getPopularTitles, getTrailer, getTrendingMovies } from './queries';
import { Query, HookState, GetTrailerParams, MediaType, Trailer } from './types';

const defaultState = {};

export const useQuery = <T>(query: Query, ...queryParams: (T extends Trailer ? [GetTrailerParams] : [])) => {
  const [state, setState] = useState<HookState<T>>(defaultState);

  const params = queryParams[0];

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    let callApi: Promise<any>;

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
          callApi = getTrailer(params.id, params.mediaType);
        } else {
          callApi = Promise.reject('Invalid parameters for getting trailer');
        }
        break;
      default:
        callApi = Promise.reject('Invalid query');
    }

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
  }, [query]);

  return state;
};
