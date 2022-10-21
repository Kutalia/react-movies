import GroupedSlider from '../CustomSlider/GroupedSlider';
import { Genre } from '../../API/types';
import { GENRES_ON_SCREEN } from './constants';
import { renderItem } from './helpers';

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
  );
};

export default GenresSlider;
