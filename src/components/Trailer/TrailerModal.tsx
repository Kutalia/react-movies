import { useContext, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import Youtube from 'react-youtube';
import Box from '@mui/material/Box';

import { AlertContext } from '../Alert/AlertContext';
import { useQuery } from '../../API/hooks';
import { GetTrailerParams, Query, Trailer } from '../../API/types';
import { TrailerContext } from './TrailerContext';

const TrailerModal = () => {
  const { trailerQuery, setTrailerQuery } = useContext(TrailerContext);
  const { setAlert } = useContext(AlertContext);
  const { data, error, loading } = useQuery<Trailer>(Query.GET_TRAILER, trailerQuery as GetTrailerParams);

  const youtubeId = data?.key;

  const handleClose = () => {
    setTrailerQuery(null);
  };

  useEffect(() => {
    if (error) {
      setAlert('Failed to load trailer');
    }
  }, [error, setAlert]);

  return (
    <>
      <Modal
        open={!!youtubeId || !!loading}
        onClose={handleClose}
        aria-labelledby="trailer"
        aria-describedby="trailer modal"
      >
        <Box sx={{ textAlign: 'center', marginTop: 20 }} onClick={handleClose}>
          {
            loading
              ? <CircularProgress />
              : <Youtube videoId={youtubeId} />
          }
        </Box>
      </Modal>
    </>
  );
};

export default TrailerModal;
