import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useQuery } from '../../API/hooks';
import { FullMovie, MediaType, Query } from '../../API/types';

const Movie = () => {
  const { id } = useParams();
  const queryParams = useMemo(() => ({ mediaType: MediaType.MOVIE, id: id as unknown as number }), [id]);

  const { data: movie, error, loading } = useQuery<FullMovie>(Query.GET_FULL_TITLE, queryParams);

  if (loading || !movie) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Grid spacing={2} container>
        <Grid xs item>
          <Typography variant="h4">
            {movie.title}{movie.original_title !== movie.title && ` (${movie.original_title})`}
          </Typography>
          <Typography paddingY={2} variant="body1">
            {movie.overview}
          </Typography>
          <Typography variant="body2">
            Genres: {movie.genres.map(({ name }) => name).join(', ')}
          </Typography>
          {
            !!movie.budget &&
            <Typography variant="body2">
              Budget: {movie.budget >= 1000000
                ? `$${Number((movie.budget / 1000000).toFixed(1)).toLocaleString('en-US')}m`
                : `$${movie.budget.toLocaleString('en-US')}`
              }
            </Typography>
          }
          {
            !!movie.original_language &&
            <Typography variant="body2">
              Language: {
                (new Intl.DisplayNames('en-US', { type: 'language' })).of(movie.original_language)
              }
            </Typography>
          }
        </Grid>
        <Grid xs item>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={`poster-${movie.poster_path}`}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Movie;
