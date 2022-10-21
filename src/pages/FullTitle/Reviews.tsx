import { useEffect, useMemo, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'

import { API_PAGE_SIZE } from './constants';
import { useQuery } from '../../API/hooks';
import { AlertContext } from '../../components/Alert/AlertContext';
import { Query, Review, MediaType, GetResult } from '../../API/types';

interface PropTypes {
  id: number;
}

const Reviews: React.FC<PropTypes> = ({ id }) => {
  const { setAlert } = useContext(AlertContext);
  const [page, setPage] = useState(1);
  const [requestPage, setRequestPage] = useState(1);
  const [allReviews, setAllReviews] = useState<Array<Array<Review>>>([]);

  const reviewsParams = useMemo(() => ({ mediaType: MediaType.MOVIE, id: id as unknown as number, page: requestPage }), [id, requestPage]);

  const { data: reviewsData, error, loading } = useQuery<GetResult<Review>>(Query.GET_REVIEWS, reviewsParams);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (error) {
      if (error) {
        setAlert('Error loading reviews');
      }
    }
  }, [error, setAlert]);

  // which api page is associated with the current front end page
  const rowIndex = Math.floor((page - 1) / API_PAGE_SIZE);
  // review index in the api page
  const columnIndex = ((page - 1) % API_PAGE_SIZE);

  useEffect(() => {
    // request new page
    if (!allReviews[rowIndex]) {
      setRequestPage(rowIndex + 1);
    }
  }, [allReviews, rowIndex]);

  useEffect(() => {
    if (reviewsData) {
      setAllReviews((prevState) => {
        const newReviews = [...prevState];
        if (reviewsData.results.length) {
          newReviews[reviewsData.page - 1] = reviewsData.results;
        }

        return newReviews;
      });
    }
  }, [reviewsData]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error || !reviewsData || !allReviews.length || !allReviews[rowIndex]) {
    return null;
  }

  const review = allReviews[rowIndex][columnIndex];

  return (
    <Box>
      <Typography paddingY={2} variant="h5">
        Reviews&nbsp;({reviewsData.total_results})
      </Typography>

      <Box>
        <Typography paddingY={1} variant="h6">
          {review.author}
        </Typography>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {review.content}
        </ReactMarkdown>
      </Box>

      <Pagination
        sx={{ paddingY: 1 }}
        page={page}
        count={reviewsData.total_results}
        onChange={handleChange}
      />
    </Box>
  )
};

export default Reviews;
