import { useEffect, useContext } from 'react';
import Box from '@mui/material/Box';

import MovieSlider from '../../components/MovieSlider/FullScreenSlider';
import MultipleTitleSlider from '../../components/MovieSlider/MultipleTitleSlider';
import GenresSlider from '../../components/GenresSlider';
import { useQuery } from '../../API/hooks';
import { Query } from '../../API/types';
import { Movie, TVShow, Genre } from '../../API/types';
import { AlertContext } from '../../components/Alert/AlertContext';

const Home = () => {
  const { setAlert } = useContext(AlertContext);

  const { data: trendingMovies, error: trendingMoviesError, loading: trendingMoviesLoading } = useQuery<Array<Movie>>(Query.GET_TRENDING_MOVIES);
  const { data: popularMovies, error: popularMoviesError, loading: popularMoviesLoading } = useQuery<Array<Movie>>(Query.GET_POPULAR_MOVIES);
  const { data: popularSeries, error: popularSeriesError, loading: popularSeriesLoading } = useQuery<Array<TVShow>>(Query.GET_POPULAR_SERIES);
  const { data: genres, error: genresError, loading: genresLoading } = useQuery<Array<Genre>>(Query.GET_GENRES);

  useEffect(() => {
    if (trendingMoviesError) {
      setAlert('Error loading trending movies of the week');
    }
    if (popularMoviesError) {
      setAlert('Error loading popular movies of the year');
    }
    if (popularSeriesError) {
      setAlert('Error loading popular series of the year');
    }
    if (genresError) {
      setAlert('Error loading genres');
    }
  }, [trendingMoviesError, popularMoviesError, popularSeriesError, genresError, setAlert]);

  return (
    <Box>
      <MovieSlider movies={trendingMovies} loading={trendingMoviesLoading} />

      <MultipleTitleSlider titles={popularMovies} loading={popularMoviesLoading} title="Popular Movies This Year" />
      <MultipleTitleSlider titles={popularSeries} loading={popularSeriesLoading} title="Popular TV Shows This Year" />

      <GenresSlider genres={genres} loading={genresLoading} title="Movie and TV Show Genres" />
    </Box>
  );
};

export default Home;
