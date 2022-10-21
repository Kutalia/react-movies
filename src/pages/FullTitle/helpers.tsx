import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Cast, FullMovie, FullTVShow, Movie, TVShow } from '../../API/types';
import { normalizeTitle } from '../../API/helpers';

export const formatNumber = (num: number) => {
  return num >= 1000000
    ? `$${Number((num / 1000000).toFixed(1)).toLocaleString('en-US')}m`
    : `$${num.toLocaleString('en-US')}`;
};

export const getCrewByJob = (
  title: FullMovie | FullTVShow,
  jobType: string
) => {
  return title.credits.crew
    .filter(({ job }) => job === jobType)
    .map(({ name }) => name);
};

export const renderCastItem = (actor: Cast) => {
  return (
    <Card>
      <CardMedia
        draggable={false}
        component="img"
        image={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
            : `${process.env.PUBLIC_URL}/poster-not-found.png`
        }
        alt={`actor-poster-${actor.name}`}
      />
      <CardContent>
        <Typography variant="body1" minHeight={70}>
          {actor.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export const renderSimilarTitleItem = (title: Movie | TVShow) => {
  const normalizedTitle = normalizeTitle(title);

  return (
    <Card>
      <CardMedia
        draggable={false}
        component="img"
        image={
          normalizedTitle.poster_path
            ? `https://image.tmdb.org/t/p/w500/${normalizedTitle.poster_path}`
            : `${process.env.PUBLIC_URL}/poster-not-found.png`
        }
        alt={`similar-normalizedTitle-poster-${normalizedTitle.title}`}
      />
      <CardContent>
        <Typography variant="body1" minHeight={70}>
          {normalizedTitle.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export const FieldTitle = styled('span')(() => ({
  fontWeight: 'bold',
}));
