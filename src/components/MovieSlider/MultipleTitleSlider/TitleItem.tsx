import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { css } from '@emotion/css';

import { normalizeTitle } from '../../../API/helpers';

const stylesWrapper = css`
  img {
    width: 100%;
  }

  :hover img {
    filter: brightness(0.2);
  }

  .description-wrapper {
    cursor: pointer;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;

    .description {
      display: none;
      color: #fff;
    }

    :hover {
      .description {
        display: block;
      }
    }
  }
`;

interface PropTypes {
  title: ReturnType<typeof normalizeTitle>;
  onClick?: () => any;
}

const TitleItem: React.FC<PropTypes> = ({ title, onClick }) => {
  return (
    <Grid xs={2} position="relative" className={stylesWrapper}>
      <img
        src={
          title.poster_path
            ? `https://image.tmdb.org/t/p/w500/${title.poster_path}`
            : `${process.env.PUBLIC_URL}/poster-not-found.png`
        }
        alt={`poster-${title.title}`}
      />
      <Box className="description-wrapper">
        <Link to={`${title.media_type}/${title.id}`} onClick={onClick}>
          <Box className="description">
            <Typography variant="h6" padding={0.5}>
              {title.title}
            </Typography>
            <Typography variant="body1">
              {title.release_date.slice(0, 4)}
            </Typography>
          </Box>
        </Link>
      </Box>
    </Grid>
  );
};

export default TitleItem;
