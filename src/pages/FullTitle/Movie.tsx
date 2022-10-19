import { useMemo, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

import { useQuery } from '../../API/hooks';
import { FullMovie, Review, MediaType, Query } from '../../API/types';
import { formatNumber, getCrewByJob } from './helpers';
import TrailerButton from '../../components/TrailerButton';
import { AlertContext } from '../../components/Alert/AlertContext';

const FieldTitle = styled('span')(() => ({
  fontWeight: 'bold',
}));

const Movie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryParams = useMemo(() => ({ mediaType: MediaType.MOVIE, id: id as unknown as number }), [id]);

  const { setAlert } = useContext(AlertContext);

  const { data: movie, error: movieError, loading: movieLoading } = useQuery<FullMovie>(Query.GET_FULL_TITLE, queryParams);
  const { data: reviews, error: reviewsError, loading: reviewsLoading } = useQuery<Array<Review>>(Query.GET_FULL_TITLE, queryParams);

  useEffect(() => {
    if (movieError || reviewsError) {
      if (movieError) {
        setAlert('error loading movie');
      }
  
      if (reviewsError) {
        setAlert('error loading reviews');
      }

      navigate('/');
    }
  }, [movieError, reviewsError, setAlert, navigate])

  if (movieLoading || !movie || reviewsLoading || !reviews) {
    return <CircularProgress />;
  }

  const directors = getCrewByJob(movie, 'Director');
  const screenplay = getCrewByJob(movie, 'Screenplay');
  const composers = getCrewByJob(movie, 'Original Music Composer');

  return (
    <Box>
      <Grid spacing={2} container>
        <Grid xs item>
          <Typography variant="h4">
            {movie.title}{movie.original_title !== movie.title && ` (${movie.original_title})`}
            {movie.adult && ' (18+)'}
          </Typography>

          {
            movie.tagline &&
            <Typography variant="body2" fontStyle="italic">
              {movie.tagline}
            </Typography>
          }

          <Typography paddingY={2} variant="body1">
            {movie.overview}
          </Typography>

          {movie.vote_average != null && <Rating value={movie.vote_average} max={10} />}
          {movie.vote_count != null &&
            <Typography variant="body2">
              <FieldTitle>{movie.vote_count}</FieldTitle>
              &nbsp;votes
            </Typography>
          }

          <TrailerButton id={movie.id} mediaType={MediaType.MOVIE} />

          {
            !!directors.length &&
            <Typography variant="body2">
              <FieldTitle>Directed by:</FieldTitle>&nbsp;
              {directors.join(', ')}
            </Typography>
          }

          {
            !!screenplay.length &&
            <Typography variant="body2">
              <FieldTitle>Screenplay by:</FieldTitle>&nbsp;
              {screenplay.join(', ')}
            </Typography>
          }

          {
            !!composers.length &&
            <Typography variant="body2">
              <FieldTitle>Music by:</FieldTitle>&nbsp;
              {composers.join(', ')}
            </Typography>
          }

          <Typography variant="body2">
            <FieldTitle>Status:</FieldTitle>&nbsp;
            {movie.status}
          </Typography>

          <Typography variant="body2">
            <FieldTitle>Release date:</FieldTitle>&nbsp;
            {movie.release_date || '_'}
          </Typography>

          <Typography variant="body2">
            <FieldTitle>Genres:</FieldTitle>&nbsp;
            {movie.genres.map(({ name }) => name).join(', ')}
          </Typography>

          <Typography variant="body2">
            <FieldTitle>Runtime:</FieldTitle>&nbsp;
            {movie.runtime + 'm'}
          </Typography>

          {
            movie.homepage &&
            <Typography variant="body2">
              <FieldTitle>Homepage:</FieldTitle>&nbsp;
              <a href={movie.homepage}>{movie.homepage}</a>
            </Typography>
          }

          {
            !!movie.budget &&
            <Typography variant="body2">
              <FieldTitle>Budget:</FieldTitle>&nbsp;
              {formatNumber(movie.budget)}
            </Typography>
          }

          {
            !!movie.revenue &&
            <Typography variant="body2">
              <FieldTitle>Revenue:</FieldTitle>&nbsp;
              {formatNumber(movie.revenue)}
            </Typography>
          }

          {
            !!movie.keywords.keywords.length &&
            <Typography variant="body2">
              <FieldTitle>Keywords:</FieldTitle>&nbsp;
              {movie.keywords.keywords.map(({ name }) => name).join(', ')}
            </Typography>
          }

          {
            !!movie.original_language &&
            <Typography variant="body2">
              <FieldTitle>Original language:</FieldTitle>&nbsp;
              {
                (new Intl.DisplayNames('en-US', { type: 'language' })).of(movie.original_language)
              }
            </Typography>
          }

          {
            movie.spoken_languages.length &&
            <Typography variant="body2">
              <FieldTitle>Spoken languages:</FieldTitle>&nbsp;
              {
                movie.spoken_languages.map(({ english_name }) => english_name).join(', ')
              }
            </Typography>
          }

          {
            !!movie.production_companies &&
            <Typography variant="body2">
              <FieldTitle>Production:</FieldTitle>&nbsp;
              {
                movie.production_companies.map(({ name }) => name).join(', ')
              }
            </Typography>
          }

          {
            !!movie.production_countries &&
            <Typography variant="body2">
              <FieldTitle>Directed in:</FieldTitle>&nbsp;
              {
                movie.production_countries.map(({ name }) => name).join(', ')
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