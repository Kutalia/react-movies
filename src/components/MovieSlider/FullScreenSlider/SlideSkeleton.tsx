import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const SlideSkeleton = () => {
  return (
    <Card variant="outlined">
      <Grid spacing={1} container>
        <Grid xs sx={{ padding: 4 }}>
          <Typography variant="h4">
            <Skeleton sx={{ marginRight: 8 }} />
          </Typography>
          <Box>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </Box>
          <Skeleton sx={{ margin: 3, marginLeft: 1 }} width={120} />
        </Grid>
        <Grid sx={{ padding: 0 }}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={420}
            width={280}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default SlideSkeleton;
