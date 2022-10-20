import Typography from '@mui/material/Typography';

import { Genre } from '../../API/types';

export const renderItem = (item: Genre) => (
  <Typography variant="body1">
    {item.name}
  </Typography>
);
