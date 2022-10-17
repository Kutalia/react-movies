import { useMemo } from 'react';
import Carousel from 'react-material-ui-carousel';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Genre } from '../../API/types';
import { GENRES_ON_SCREEN } from './constants';

interface PropTypes {
  genres?: Array<Genre>;
  loading?: boolean;
  title?: string;
}

const GenresSlider: React.FC<PropTypes> = ({ genres = [], loading, title }) => {
  const groupedGenres = useMemo(() => {
    const grouped: Array<Array<Genre>> = [];

    genres.forEach((genre, index) => {
      const groupIndex = Math.floor(index / GENRES_ON_SCREEN);

      if (!grouped[groupIndex]) {
        grouped[groupIndex] = [genre];
      } else {
        grouped[groupIndex].push(genre);
      }
    });

    return grouped;
  }, [genres]);

  return (
    <Box sx={{ textAlign: 'center', marginBottom: 6 }}>
      {
        loading || !genres.length
          ? <CircularProgress sx={{ margin: 'auto' }} />
          : <>
            <Typography variant="h4" marginBottom={2}>{title}</Typography>
            <Carousel autoPlay navButtonsAlwaysInvisible>
              {groupedGenres.map((group, index) => (
                <Grid container key={index}>
                  {group.map(({ id, name }) => (
                    <Grid xs key={id} sx={{ paddingRight: 4, minHeight: 80 }}>
                      <Typography variant="body1">
                        {name}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Carousel>
          </>
      }
    </Box>
  )
};

export default GenresSlider;
