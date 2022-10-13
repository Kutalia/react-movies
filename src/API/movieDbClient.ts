import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Authorization': `Bearer ${process.env.REACT_APP_MOVIE_DB_API_READ_ACCESS_KEY}`
  }
});

export default axiosClient;
