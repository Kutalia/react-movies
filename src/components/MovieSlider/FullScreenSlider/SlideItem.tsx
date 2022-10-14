import { Card, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import { css } from '@emotion/css';

import { Movie } from '../types';

const posterStyle = css`
  display: block;
  height: 100%;
`;

interface PropTypes {
  movie: Movie;
}

const MovieItem: React.FC<PropTypes> = ({ movie }) => {
  return (
    <Card variant="outlined">
      <Grid spacing={1} container sx={{ height: '420px' }}>
        <Grid xs sx={{ padding: 4 }}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>

          <Button className="CheckButton">
            Check it out!
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
