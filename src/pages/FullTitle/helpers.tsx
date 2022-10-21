import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import {
  Cast,
  FullMovie,
  FullTVShow,
  MediaType,
  Movie,
  TVShow,
} from '../../API/types';
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

export const renderSimilarTitleItem =
  (mediaType: MediaType) => (title: Movie | TVShow) => {
    const normalizedTitle = normalizeTitle(title);

    return (
      <Link to={`/${mediaType}/${title.id}`}>
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
      </Link>
    );
  };

export const FieldTitle = styled('span')(() => ({
  fontWeight: 'bold',
}));

export interface FieldTypes {
  title: React.ReactNode;
  body: React.ReactNode;
}

export const Field: React.FC<FieldTypes> = ({ title, body }) => (
  <Typography variant="body2">
    <FieldTitle>{title}</FieldTitle>&nbsp;
    {body}
  </Typography>
);

export const getEnglishLanguageName = (language: string) => {
  return new Intl.DisplayNames('en-US', { type: 'language' }).of(language);
};
