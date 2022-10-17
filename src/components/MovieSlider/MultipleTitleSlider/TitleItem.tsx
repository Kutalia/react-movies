import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { css } from '@emotion/css';

import { Movie, TVShow } from '../../../API/types';
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
}

const TitleItem: React.FC<PropTypes> = ({ title }) => {
  return (
    <Grid xs={2} position="relative" className={stylesWrapper}>
      <img
        src={title.poster_path
          ? `https://image.tmdb.org/t/p/w500/${title.poster_path}`
          : `${process.env.PUBLIC_URL}/poster-not-found.png`}
        alt={`poster-${title.title}`}
      />
      <Box className="description-wrapper">
        <Box className="description">
          <h3 className="title">
            {title.title}
          </h3>
          <p className="release-date">
            {title.release_date.slice(0, 4)}
          </p>
        </Box>
      </Box>
    </Grid>
  )
};

export default TitleItem;
