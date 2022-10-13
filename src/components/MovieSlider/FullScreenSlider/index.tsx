import Carousel from 'react-material-ui-carousel';

import { Movie } from '../types';
import MovieItem from './MovieItem';

interface PropTypes {
  movies: Array<Movie>
}

const MovieSlider: React.FC<PropTypes> = ({ movies }) => {
  return (
    <Carousel autoPlay={false}>
      {
        movies.map((item) => <MovieItem key={item.id} movie={item} />)
      }
    </Carousel>
  );
};

export default MovieSlider;
