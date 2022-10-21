import { useMemo, useContext, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

import { useQuery } from '../../API/hooks';
import { FullTVShow, MediaType, Query, TVShow } from '../../API/types';
import GroupedSlider from '../../components/CustomSlider/GroupedSlider';
import { getCrewByJob, renderSimilarTitleItem } from './helpers';
import TrailerButton from '../../components/TrailerButton';
import { AlertContext } from '../../components/Alert/AlertContext';
import { renderCastItem } from './helpers';
import { CAST_ON_SCREEN_LIMIT } from './constants';
import Reviews from './Reviews';
import { getEnglishLanguageName, Field } from './helpers';

const FullTVShowComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const tvShowQueryParams = useMemo(
    () => ({ mediaType: MediaType.TV, id: id as unknown as number }),
    [id]
  );

  const { setAlert } = useContext(AlertContext);

  const {
    data: tvShow,
    error: tvShowError,
    loading: tvShowLoading,
  } = useQuery<FullTVShow>(Query.GET_FULL_TITLE, tvShowQueryParams);

  const renderSimilar = useCallback(
    (tvShow: TVShow) => renderSimilarTitleItem(MediaType.TV)(tvShow),
    []
  );

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

          {tvShow.tagline && (
            <Typography variant="body2" fontStyle="italic">
              {tvShow.tagline}
            </Typography>
          )}

          <Typography paddingY={2} variant="body1">
            {tvShow.overview}
          </Typography>

          {tvShow.vote_average != null && (
            <Rating value={tvShow.vote_average} max={10} />
          )}
          {tvShow.vote_count != null && (
            <Field title={tvShow.vote_count} body="votes" />
          )}

          <TrailerButton id={tvShow.id} mediaType={MediaType.TV} />

          {tvShow.original_name && (
            <Field title="Original name:" body={tvShow.original_name} />
          )}

          {tvShow.type && <Field title="Type:" body={tvShow.type} />}

          {!!tvShow.created_by.length && (
            <Field
              title="Created by:"
              body={tvShow.created_by.map(({ name }) => name).join(', ')}
            />
          )}

          {!!directors.length && (
            <Field title="Directed by:" body={directors.join(', ')} />
          )}

          {!!screenplay.length && (
            <Field title="Screenplay by:" body={screenplay.join(', ')} />
          )}

          {!!composers.length && (
            <Field title="Music by:" body={composers.join(', ')} />
          )}

          <Field
            title="Status:"
            body={`${tvShow.status}${
              tvShow.in_production && ' (in production)'
            }`}
          />

          <Field title="First aired on:" body={tvShow.first_air_date || '_'} />

          <Field title="Last aired on:" body={tvShow.last_air_date || '_'} />

          {!!tvShow.number_of_seasons && (
            <Field title="Number of seasons:" body={tvShow.number_of_seasons} />
          )}

          {!!tvShow.number_of_episodes && (
            <Field
              title="Number of episodes:"
              body={tvShow.number_of_episodes}
            />
          )}

          {tvShow.last_episode_to_air && (
            <Field
              title="Last episode aired:"
              body={`"${tvShow.last_episode_to_air.name}" (season ${tvShow.last_episode_to_air.season_number}, episode ${tvShow.last_episode_to_air.episode_number})`}
            />
          )}

          {tvShow.next_episode_to_air && (
            <Field
              title="Next episode to air:"
              body={`"${tvShow.next_episode_to_air.name}" (season ${tvShow.next_episode_to_air.season_number}, episode ${tvShow.next_episode_to_air.episode_number})`}
            />
          )}

          <Field
            title="Genres:"
            body={tvShow.genres.map(({ name }) => name).join(', ')}
          />

          {!!tvShow.episode_run_time.length && (
            <Field
              title="Episode runtime:"
              body={tvShow.episode_run_time.join('m, ') + 'm'}
            />
          )}

          {!!tvShow.homepage?.length && (
            <Field
              title="Homepage:"
              body={<a href={tvShow.homepage}>{tvShow.homepage}</a>}
            />
          )}

          {!!tvShow.keywords.results.length && (
            <Field
              title="Keywords:"
              body={tvShow.keywords.results.map(({ name }) => name).join(', ')}
            />
          )}

          {!!tvShow.origin_country?.length && (
            <Field
              title="Origin country:"
              body={tvShow.origin_country.join(', ')}
            />
          )}

          {!!tvShow.languages.length && (
            <Field
              title="Languages:"
              body={tvShow.languages.map((language) =>
                getEnglishLanguageName(language)
              )}
            />
          )}

          {!!tvShow.original_language && (
            <Field
              title="Original language:"
              body={getEnglishLanguageName(tvShow.original_language)}
            />
          )}

          {!!tvShow.spoken_languages.length && (
            <Field
              title="Spoken languages:"
              body={tvShow.spoken_languages
                .map(({ english_name }) => english_name)
                .join(', ')}
            />
          )}

          {!!tvShow.production_companies && (
            <Field
              title="Production:"
              body={tvShow.production_companies
                .map(({ name }) => name)
                .join(', ')}
            />
          )}

          {!!tvShow.production_countries && (
            <Field
              title="Production countries:"
              body={tvShow.production_countries
                .map(({ name }) => name)
                .join(', ')}
            />
          )}
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
        renderItem={renderSimilar}
        loading={tvShowLoading}
        title="Similar TVShows"
        onScreenLimit={CAST_ON_SCREEN_LIMIT}
      />

      <Reviews id={tvShow.id} />
    </Box>
  );
};

export default FullTVShowComponent;
