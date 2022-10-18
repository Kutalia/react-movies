import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';

import { useQuery } from '../../API/hooks';
import { FullMovie, MediaType, Query } from '../../API/types';

const Movie = () => {
  const { id } = useParams();
  const queryParams = useMemo(() => ({ mediaType: MediaType.MOVIE, id: id as unknown as number }), [id]);

  const { data: movie, error, loading } = useQuery<FullMovie>(Query.GET_FULL_TITLE, queryParams);

  return (
    <Box>

    </Box>
  );
};

export default Movie;
