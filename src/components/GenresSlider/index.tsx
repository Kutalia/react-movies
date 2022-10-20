import Typography from '@mui/material/Typography';

import GroupedSlider from '../CustomSlider/GroupedSlider';
import { Genre } from '../../API/types';
import { GENRES_ON_SCREEN } from './constants';

const renderItem = (item: Genre) => (
  <Typography variant="body1">
    {item.name}
  </Typography>
);

interface PropTypes {
  genres?: Array<Genre>;
  loading?: boolean;
  title?: string;
}

const GenresSlider: React.FC<PropTypes> = ({ genres = [], loading, title }) => {
  return (
    <GroupedSlider
      loading={loading}
      title={title}
      items={genres}
      onScreenLimit={GENRES_ON_SCREEN}
      renderItem={renderItem}
    />
  )
};

export default GenresSlider;
