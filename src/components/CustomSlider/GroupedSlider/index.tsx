import { useMemo } from 'react';
import Carousel from 'react-material-ui-carousel';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { groupItems } from './helpers';

interface PropTypes<T> {
  loading?: boolean;
  title?: string;
  items: Array<T>;
  onScreenLimit: number;
  renderItem: (item: T) => JSX.Element;
}

const GroupedSlider = <T extends unknown>({ loading, title, items, onScreenLimit, renderItem }: PropTypes<T>) => {
  const groupedItems = useMemo(() => {
    return groupItems(items, onScreenLimit)
  }, [items, onScreenLimit]);

  return (
    <Box sx={{ textAlign: 'center', marginBottom: 6 }}>
      {
        loading || !groupedItems.length
          ? <CircularProgress sx={{ margin: 'auto' }} />
          : <>
            {title && <Typography sx={{ paddingY: 2 }} variant="h4" marginBottom={2}>{title}</Typography>}
            <Carousel autoPlay navButtonsAlwaysInvisible>
              {groupedItems.map((group, index) => (
                <Grid container key={index}>
                  {group.map((item, index) => (
                    <Grid key={index} sx={{ paddingRight: 4, minHeight: 80, width: `${(1 / onScreenLimit) * 100}%` }}>
                      {renderItem(item)}
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Carousel>
          </>
      }
    </Box>
  );
};

export default GroupedSlider;

