import { useEffect, useState } from 'react';

import MovieSlider from '../../components/MovieSlider/FullScreenSlider';
import { Movie } from '../../components/MovieSlider/types';
import { getTrendingMovies } from '../../API/queries';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState<Array<Movie>>([]);

  useEffect(() => {
    getTrendingMovies().then((data) => {
      if (data) {
        setTrendingMovies(data);
      }
    });
  }, []);

  return (
    <div>
      <MovieSlider movies={trendingMovies} />
    </div>
  );
};

export default Home;
