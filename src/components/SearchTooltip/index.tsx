import { useEffect, useContext } from 'react';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box'

import { useQuery } from '../../API/hooks';
import { Query, Movie, TVShow } from '../../API/types';
import MultipleTitleSlider from '../MovieSlider/MultipleTitleSlider';
import { AlertContext } from '../Alert/AlertContext';

interface PropTypes {
  open: boolean;
  onClose: () => void;
  anchorEl?: null | Element | ((element: Element) => Element);
  query: string;
}

const SearchTooltip: React.FC<PropTypes> = ({ open, anchorEl, onClose, query }) => {
  const { setAlert  } = useContext(AlertContext);
  const { data, loading, error } = useQuery<Array<Movie | TVShow>>(Query.SEARCH_TITLES, query);
  
  useEffect(() => {
    if (error) {
      setAlert('Error searching movies');
    }
  }, [error]);

  return (
    <Popover
      open={open}
      aria-labelledby="search popover"
      aria-describedby="search results popover"
      anchorEl={anchorEl}
      onClose={onClose}
      disableAutoFocus
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Box sx={{ width: '50vw' }}>
        <MultipleTitleSlider titles={data} loading={loading} />
      </Box>
    </Popover>
  );
};

export default SearchTooltip;
