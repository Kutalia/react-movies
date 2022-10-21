import {
  createBrowserRouter
} from 'react-router-dom';

import Home from './pages/Home';
import Movie from './pages/FullTitle/Movie';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
