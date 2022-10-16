import { useState, useContext, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import Youtube from 'react-youtube';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';

import { useQuery } from '../../API/hooks';
import { GetTrailerParams, Query, Trailer } from '../../API/types';
import { TrailerContext } from './TrailerContext';
import Alert from '../Alert/Alert';

const TrailerModal = () => {
  const [alert, setAlert] = useState<string | null>(null);
  const { trailerQuery, setTrailerQuery } = useContext(TrailerContext);
  const { data, error, loading } = useQuery<Trailer>(Query.GET_TRAILER, trailerQuery as GetTrailerParams);

  const youtubeId = data?.key;

  const handleClose = () => {
    setTrailerQuery(null);
  };

  useEffect(() => {
    if (error) {
      setAlert('Failed to load trailer');
    }
  }, [error]);

  const handleAlertClose = () => {
    setAlert(null);
    handleClose();
  };

  return (
    <>
      <Snackbar open={!!alert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
          {alert}
        </Alert>
      </Snackbar>
      <Modal
        open={!!youtubeId}
        onClose={handleClose}
        aria-labelledby="trailer"
        aria-describedby="trailer modal"
      >
        <Box sx={{ textAlign: 'center', marginTop: 20 }} onClick={handleClose}>
          {
            loading || error || !youtubeId
              ? <CircularProgress />
              : <Youtube videoId={youtubeId} />
          }
        </Box>
      </Modal>
    </>
  );
};

export default TrailerModal;
