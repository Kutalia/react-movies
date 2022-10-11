import { MovieDb } from 'moviedb-promise';

const API = new MovieDb(process.env.REACT_APP_API_KEY as string);

export default API;
