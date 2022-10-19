import {
  createBrowserRouter
} from 'react-router-dom';

import Home from './pages/Home';
import Movie from './pages/FullTitle/Movie';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/movie/:id',
    element: <Movie />,
  },
]);

export default router;
