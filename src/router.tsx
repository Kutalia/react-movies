import {
  createBrowserRouter
} from 'react-router-dom';

import Home from './pages/Home';
import PopularMovies from './pages/PopularMovies';
import PopularTVShows from './pages/PopularTVShows';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'popular-movies',
        element: <PopularMovies />,
      },
      {
        path: 'popular-tv-shows',
        element: <PopularTVShows />,
      },
    ]
  }
]);

export default router;
