import { useEffect, useState } from 'react';

import { getTrendingMovies } from './queries';
import { HookState } from './types';

const defaultState = {
  loading: false,
  data: [],
};

export enum Query {
  GET_TRENDING_MOVIES,
  GET_POPULAR_MOVIES,
  GET_POPULAR_SERIES
}

type QueryParam = { [k: string]: string | number | null | undefined | boolean };

export const useQuery = (query: Query, params?: QueryParam) => {
  const [state, setState] = useState<HookState>(defaultState);

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
