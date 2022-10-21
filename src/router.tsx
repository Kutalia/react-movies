import {
  createBrowserRouter
} from 'react-router-dom';

import Home from './pages/Home';
import Movie from './pages/FullTitle/Movie';
import SearchAppBar from './components/SearchAppBar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchAppBar />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/movie/:id',
        element: <Movie />,
      },
    ],
  },
]);

export default router;
