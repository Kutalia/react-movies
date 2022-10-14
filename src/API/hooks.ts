import { useEffect, useState } from 'react';

import { getTrendingMovies } from './queries';
import { HookState } from './types';

const defaultState = {
  loading: false,
  data: [],
};

export const useTrendingMovies = () => {
  const [state, setState] = useState<HookState>(defaultState);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    getTrendingMovies().then((data) => {
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
  }, []);

  return state;
};
