import { useContext } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { css } from '@emotion/css';

import { MediaType, Movie } from '../../../API/types';
import { TrailerContext } from '../../Trailer/TrailerContext';

const posterStyle = css`
  display: block;
  height: 100%;
`;

interface PropTypes {
  movie: Movie;
}

const MovieItem: React.FC<PropTypes> = ({ movie }) => {
  const { setTrailerQuery } = useContext(TrailerContext);

  const handleTrailerOpen = () => {
    setTrailerQuery({
      id: movie.id,
      mediaType: MediaType.MOVIE,
    });
  };

  return (
    <Card variant="outlined">
      <Grid spacing={1} container sx={{ height: '420px' }}>
        <Grid xs sx={{ padding: 4 }}>
          <Typography variant="h4">{movie.title}</Typography>
          <Typography variant="body1" paddingTop={4}>{movie.overview}</Typography>

          <Button className="CheckButton" onClick={handleTrailerOpen}>
            Watch trailer
          </Button>
        </Grid>
        <Grid sx={{ padding: 0, height: '100%' }}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={`poster-${movie.title}`}
            className={posterStyle}
          />
        </Grid>
      </Grid>
    </Card>
  )
};

export default MovieItem;
