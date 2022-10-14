import { useState, useCallback, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import { Movie } from '../types';
import MovieItem from './MovieItem';

const SLIDER_SIZE = 6;

interface PropTypes {
  movies: Array<Movie>;
  loading?: boolean;
}

const MultipleMovieSlider: React.FC<PropTypes> = ({ movies, loading }) => {
  const [filteredMovies, setFilteredMovies] = useState(movies.slice(0, SLIDER_SIZE));

  const handleSliderChange = useCallback((value: number) => {
    if (movies.length) {
      setFilteredMovies(movies.slice(value, value + SLIDER_SIZE));
    }
  }, [movies]);

  useEffect(() => {
    handleSliderChange(0);
  }, [handleSliderChange]);

  const ItemSkeleton = () => <Skeleton sx={{ width: '100%' }} height={33} />;
  const skeletons = [...Array(5)].map((_, index) => <ItemSkeleton key={index} />);

  return (
    <>
      <Box sx={{ paddingX: 6, marginY: 8, textAlign: 'center' }}>
        <h2>Popular movies of the year</h2>
        {loading
          ? <>
            {skeletons}
          </>
          : <>
            <Grid container>
              {filteredMovies.map((movie) => (
                <MovieItem movie={movie} key={movie.id} />
              ))}
            </Grid>

            <Box sx={{ textAlign: 'center' }}>
              <Slider
                aria-label="Movies slider"
                defaultValue={0}
                step={1}
                onChange={(_, value) => handleSliderChange(value as number)}
                min={0}
                max={14}
                sx={{ width: '50%' }}
                color="secondary"
              />
            </Box>
          </>
        }
      </Box>
    </>
  );
};

export default MultipleMovieSlider;
