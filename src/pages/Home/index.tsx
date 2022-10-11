import { useEffect, useState } from 'react';

import API from '../../API';
import MovieSlider from '../../components/MovieSlider';
import { Movie } from '../../components/MovieSlider/types';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState<Array<Movie>>([]);

  useEffect(() => {
    API.trending({ media_type: 'movie', time_window: 'week' })
      .then((response) => {
        if (response.results) {
          setTrendingMovies((response.results as Array<Movie>).slice(0, 10));
        }
      }).catch((err) => {
        console.error(err);
      })
  }, []);

  return (
    <div>
      <MovieSlider movies={trendingMovies} />
    </div>
  );
};

export default Home;
