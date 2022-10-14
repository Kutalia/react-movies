import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

import MovieSlider from '../../components/MovieSlider/FullScreenSlider';
import { useTrendingMovies } from '../../API/hooks';
import Alert from '../../components/Alert';

const Home = () => {
  const [alert, setAlert] = useState<string | null>(null);
  const { data: trendingMovies, error: trendingMoviesError, loading: trendingMoviesLoading } = useTrendingMovies();

  useEffect(() => {
    if (trendingMoviesError) {
      setAlert('Error loading trending movies');
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
    </div>
  );
};

export default Home;
