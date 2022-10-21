import { useMemo, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

import { useQuery } from '../../API/hooks';
import { FullMovie, MediaType, Query } from '../../API/types';
import GroupedSlider from '../../components/CustomSlider/GroupedSlider';
import { formatNumber, getCrewByJob, renderSimilarTitleItem } from './helpers';
import TrailerButton from '../../components/TrailerButton';
import { AlertContext } from '../../components/Alert/AlertContext';
import { renderCastItem } from './helpers';
import { CAST_ON_SCREEN_LIMIT } from './constants';
import Reviews from './Reviews';
import { getEnglishLanguageName, Field } from './helpers';

const Movie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const movieQueryParams = useMemo(
    () => ({ mediaType: MediaType.MOVIE, id: id as unknown as number }),
    [id]
  );

  const { setAlert } = useContext(AlertContext);

  const {
    data: movie,
    error: movieError,
    loading: movieLoading,
  } = useQuery<FullMovie>(Query.GET_FULL_TITLE, movieQueryParams);

  useEffect(() => {
    if (movieError) {
      setAlert('Error loading movie');
      navigate('/');
    }
  }, [movieError, setAlert, navigate]);

  if (movieLoading || !movie) {
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
            {movie.title}
            {movie.original_title !== movie.title &&
              ` (${movie.original_title})`}
            {movie.adult && ' (18+)'}
          </Typography>

          {movie.tagline && (
            <Typography variant="body2" fontStyle="italic">
              {movie.tagline}
            </Typography>
          )}

          <Typography paddingY={2} variant="body1">
            {movie.overview}
          </Typography>

          {movie.vote_average != null && (
            <Rating value={movie.vote_average} max={10} />
          )}
          {movie.vote_count != null && (
            <Field title={movie.vote_count} body="votes" />
          )}

          <TrailerButton id={movie.id} mediaType={MediaType.MOVIE} />

          {!!directors.length && (
            <Field title="Directed by:" body={directors.join(', ')} />
          )}

          {!!screenplay.length && (
            <Field title="Screenplay by:" body={screenplay.join(', ')} />
          )}

          {!!composers.length && (
            <Field title="Music by:" body={composers.join(', ')} />
          )}

          <Field title="Status:" body={movie.status} />

          <Field title="Release date:" body={movie.release_date || '_'} />

          <Field
            title="Genres:"
            body={movie.genres.map(({ name }) => name).join(', ')}
          />

          <Field title="Runtime:" body={movie.runtime + 'm'} />

          {movie.homepage && (
            <Field
              title="Homepage:"
              body={<a href={movie.homepage}>{movie.homepage}</a>}
            />
          )}

          {!!movie.budget && (
            <Field title="Budget:" body={formatNumber(movie.budget)} />
          )}

          {!!movie.revenue && (
            <Field title="Revenue:" body={formatNumber(movie.revenue)} />
          )}

          {!!movie.keywords.keywords.length && (
            <Field
              title="Keywords:"
              body={movie.keywords.keywords.map(({ name }) => name).join(', ')}
            />
          )}

          {!!movie.original_language && (
            <Field
              title="Original language:"
              body={getEnglishLanguageName(movie.original_language)}
            />
          )}

          {movie.spoken_languages.length && (
            <Field
              title="Spoken languages:"
              body={movie.spoken_languages
                .map(({ english_name }) => english_name)
                .join(', ')}
            />
          )}

          {!!movie.production_companies && (
            <Field
              title="Production:"
              body={movie.production_companies
                .map(({ name }) => name)
                .join(', ')}
            />
          )}

          {!!movie.production_countries && (
            <Field
              title="Production countries:"
              body={movie.production_countries
                .map(({ name }) => name)
                .join(', ')}
            />
          )}
        </Grid>
        <Grid xs item>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={`poster-${movie.poster_path}`}
          />
        </Grid>
      </Grid>

      <GroupedSlider
        items={movie.credits.cast}
        renderItem={renderCastItem}
        loading={movieLoading}
        title="Cast"
        onScreenLimit={CAST_ON_SCREEN_LIMIT}
      />

      <GroupedSlider
        items={movie.similar.results}
        renderItem={renderSimilarTitleItem}
        loading={movieLoading}
        title="Similar Movies"
        onScreenLimit={CAST_ON_SCREEN_LIMIT}
      />

      <Reviews id={movie.id} />
    </Box>
  );
};

export default Movie;
