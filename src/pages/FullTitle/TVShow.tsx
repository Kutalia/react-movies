import { useMemo, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

import { useQuery } from '../../API/hooks';
import { FullTVShow, MediaType, Query } from '../../API/types';
import GroupedSlider from '../../components/CustomSlider/GroupedSlider';
import { getCrewByJob, renderSimilarTitleItem } from './helpers';
import TrailerButton from '../../components/TrailerButton';
import { AlertContext } from '../../components/Alert/AlertContext';
import { renderCastItem } from './helpers';
import { CAST_ON_SCREEN_LIMIT } from './constants';
import Reviews from './Reviews';
import { FieldTitle } from './helpers';

const TVShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const tvShowQueryParams = useMemo(() => ({ mediaType: MediaType.TV, id: id as unknown as number }), [id]);

  const { setAlert } = useContext(AlertContext);

  const { data: tvShow, error: tvShowError, loading: tvShowLoading } = useQuery<FullTVShow>(Query.GET_FULL_TITLE, tvShowQueryParams);

  useEffect(() => {
    if (tvShowError) {
      setAlert('Error loading tvShow');
      navigate('/');
    }
  }, [tvShowError, setAlert, navigate]);

  if (tvShowLoading || !tvShow) {
    return <CircularProgress />;
  }

  const directors = getCrewByJob(tvShow, 'Director');
  const screenplay = getCrewByJob(tvShow, 'Screenplay');
  const composers = getCrewByJob(tvShow, 'Original Music Composer');

  return (
    <Box>
      <Grid spacing={2} container>
        <Grid xs item>
          <Typography variant="h4">
            {tvShow.name}
            {tvShow.adult && ' (18+)'}
          </Typography>

          {
            tvShow.tagline &&
            <Typography variant="body2" fontStyle="italic">
              {tvShow.tagline}
            </Typography>
          }

          <Typography paddingY={2} variant="body1">
            {tvShow.overview}
          </Typography>

          {tvShow.vote_average != null && <Rating value={tvShow.vote_average} max={10} />}
          {tvShow.vote_count != null &&
            <Typography variant="body2">
              <FieldTitle>{tvShow.vote_count}</FieldTitle>
              &nbsp;votes
            </Typography>
          }

          <TrailerButton id={tvShow.id} mediaType={MediaType.TV} />

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
            {tvShow.status}
          </Typography>

          <Typography variant="body2">
            <FieldTitle>First aired on:</FieldTitle>&nbsp;
            {tvShow.first_air_date || '_'}
          </Typography>

          <Typography variant="body2">
            <FieldTitle>Genres:</FieldTitle>&nbsp;
            {tvShow.genres.map(({ name }) => name).join(', ')}
          </Typography>

          {!!tvShow.episode_run_time.length &&
            <Typography variant="body2">
              <FieldTitle>Episode runtime:</FieldTitle>&nbsp;
              {tvShow.episode_run_time.join('m, ') + 'm'}
            </Typography>
          }

          {
            !!tvShow.homepage?.length &&
            <Typography variant="body2">
              <FieldTitle>Homepage:</FieldTitle>&nbsp;
              <a href={tvShow.homepage}>{tvShow.homepage}</a>
            </Typography>
          }

          {
            !!tvShow.keywords.results.length &&
            <Typography variant="body2">
              <FieldTitle>Keywords:</FieldTitle>&nbsp;
              {tvShow.keywords.results.map(({ name }) => name).join(', ')}
            </Typography>
          }

          {
            !!tvShow.original_language &&
            <Typography variant="body2">
              <FieldTitle>Original language:</FieldTitle>&nbsp;
              {
                (new Intl.DisplayNames('en-US', { type: 'language' })).of(tvShow.original_language)
              }
            </Typography>
          }

          {
            tvShow.spoken_languages.length &&
            <Typography variant="body2">
              <FieldTitle>Spoken languages:</FieldTitle>&nbsp;
              {
                tvShow.spoken_languages.map(({ english_name }) => english_name).join(', ')
              }
            </Typography>
          }

          {
            !!tvShow.production_companies &&
            <Typography variant="body2">
              <FieldTitle>Production:</FieldTitle>&nbsp;
              {
                tvShow.production_companies.map(({ name }) => name).join(', ')
              }
            </Typography>
          }

          {
            !!tvShow.production_countries &&
            <Typography variant="body2">
              <FieldTitle>Directed in:</FieldTitle>&nbsp;
              {
                tvShow.production_countries.map(({ name }) => name).join(', ')
              }
            </Typography>
          }
        </Grid>
        
        <Grid xs item>
          <img
            src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
            alt={`poster-${tvShow.poster_path}`}
          />
        </Grid>
      </Grid>

      <GroupedSlider
        items={tvShow.credits.cast}
        renderItem={renderCastItem}
        loading={tvShowLoading}
        title="Cast"
        onScreenLimit={CAST_ON_SCREEN_LIMIT}
      />

      <GroupedSlider
        items={tvShow.similar.results}
        renderItem={renderSimilarTitleItem}
        loading={tvShowLoading}
        title="Similar TVShows"
        onScreenLimit={CAST_ON_SCREEN_LIMIT}
      />

      <Reviews id={tvShow.id} />
    </Box>
  );
};

export default TVShow;
