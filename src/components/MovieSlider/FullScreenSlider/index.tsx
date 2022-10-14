import Carousel from 'react-material-ui-carousel';

import { Movie } from '../types';
import MovieItem from './SlideItem';
import SlideSkeleton from './SlideSkeleton';

interface PropTypes {
  movies: Array<Movie>;
  loading?: boolean;
}

const MovieSlider: React.FC<PropTypes> = ({ movies, loading }) => {
  return (
    <>
      {loading && <SlideSkeleton />}
      <Carousel autoPlay={false} swipe={false}>
        {
          movies.map((item) => <MovieItem key={item.id} movie={item} />)
        }
      </Carousel>
    </>
  );
};

export default MovieSlider;
