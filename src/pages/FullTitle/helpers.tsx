import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Cast, FullMovie } from '../../API/types';

export const formatNumber = (num: number) => {
  return num >= 1000000
    ? `$${Number((num / 1000000).toFixed(1)).toLocaleString('en-US')}m`
    : `$${num.toLocaleString('en-US')}`
};

export const getCrewByJob = (title: FullMovie, jobType: string) => {
  return title.credits.crew.filter(({ job }) => job === jobType).map(({ name }) => name);
}

export const renderItem = (actor: Cast) => {
  return (
    <Card>
      <CardMedia
        draggable={false}
        component="img"
        image={actor.profile_path
          ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
          : `${process.env.PUBLIC_URL}/poster-not-found.png`}
        alt="green"
      />
      <CardContent>
        <Typography variant="h6" minHeight={70}>
          {actor.name}
        </Typography>
      </CardContent>
    </Card>
  )
}