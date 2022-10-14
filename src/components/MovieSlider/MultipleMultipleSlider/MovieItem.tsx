import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { css } from '@emotion/css';

import { Movie } from '../types';

const stylesWrapper = css`
  img {
    width: 100%;
  }

  :hover img {
    filter: brightness(0.2);
  }

  .description-wrapper {
    cursor: pointer;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;

    .description {
      display: none;
      color: #fff;
    }
    
    :hover {
      .description {
        display: block;
      }
    }
  }
`;

interface PropTypes {
  movie: Movie;
}

const MovieItem: React.FC<PropTypes> = ({ movie }) => {
  return (
    <Grid xs={2} position="relative" className={stylesWrapper}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={`poster-${movie.title}`}
      />
      <Box className="description-wrapper">
        <Box className="description">
          <h3 className="title">
            {movie.title}
          </h3>
          <p className="release-date">
            {movie.release_date?.slice(0, 4)}
          </p>
        </Box>
      </Box>
    </Grid>
  )
};

export default MovieItem;
