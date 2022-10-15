import { useState, useCallback, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import { Movie, TVShow } from '../../../API/types';
import TitleItem from './TitleItem';

const SLIDER_SIZE = 6;

interface PropTypes {
  titles: Array<Movie> | Array<TVShow>;
  loading?: boolean;
  title?: string;
}

const MultipleTitleSlider: React.FC<PropTypes> = ({ titles, loading, title }) => {
  const [filteredTitles, setFilteredTitles] = useState(titles.slice(0, SLIDER_SIZE));

  const handleSliderChange = useCallback((value: number) => {
    if (titles.length) {
      setFilteredTitles(titles.slice(value, value + SLIDER_SIZE));
    }
  }, [titles]);

  useEffect(() => {
    handleSliderChange(0);
  }, [handleSliderChange]);

  const ItemSkeleton = () => <Skeleton sx={{ width: '100%' }} height={33} />;
  const skeletons = [...Array(5)].map((_, index) => <ItemSkeleton key={index} />);

  return (
    <>
      <Box sx={{ paddingX: 6, marginY: 8, textAlign: 'center' }}>
        {title && <h2>{title}</h2>}
        {loading
          ? <>
            {skeletons}
          </>
          : <>
            <Grid container>
              {filteredTitles.map((movie) => (
                <TitleItem title={movie} key={movie.id} />
              ))}
            </Grid>

            <Box sx={{ textAlign: 'center' }}>
              <Slider
                aria-label="Titles slider"
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

export default MultipleTitleSlider;
