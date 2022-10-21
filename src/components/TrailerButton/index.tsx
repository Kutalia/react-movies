import { useContext } from 'react';
import Button from '@mui/material/Button';

import { TrailerContext } from '../Trailer/TrailerContext';
import { MediaType } from '../../API/types';

interface PropTypes {
  mediaType: MediaType;
  id: number;
}

const TrailerButton: React.FC<PropTypes> = (props) => {
  const { setTrailerQuery } = useContext(TrailerContext);

  const handleTrailerOpen = () => {
    setTrailerQuery(props);
  };

  return <Button onClick={handleTrailerOpen}>Watch trailer</Button>;
};

export default TrailerButton;
