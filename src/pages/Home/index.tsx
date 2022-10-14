import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

import MovieSlider from '../../components/MovieSlider/FullScreenSlider';
import MultipleMovieSlider from '../../components/MovieSlider/MultipleMultipleSlider';
import { useQuery } from '../../API/hooks';
import { Query } from '../../API/types';
import Alert from '../../components/Alert';

const Home = () => {
  const [alert, setAlert] = useState<string | null>(null);
  const { data: trendingMovies, error: trendingMoviesError, loading: trendingMoviesLoading } = useQuery(Query.GET_TRENDING_MOVIES);
  const { data: popularMovies, error: popularMoviesError, loading: popularMoviesLoading } = useQuery(Query.GET_POPULAR_MOVIES);

  useEffect(() => {
    if (trendingMoviesError) {
      setAlert('Error loading trending movies of the week');
    }
    else if (popularMoviesError) {
      setAlert('Error loading popular movies of the year');
    }
  }, [trendingMoviesError])

  const handleAlertClose = () => {
    setAlert(null);
  };

  return (
    <div>
      <MovieSlider movies={trendingMovies} loading={trendingMoviesLoading} />
      
      <Snackbar open={!!alert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
          {alert}
        </Alert>
      </Snackbar>

      <MultipleMovieSlider movies={popularMovies} loading={popularMoviesLoading} />
    </div>
  );
};

export default Home;
