import { Movie, TVShow } from "./types";

export const normalizeTitle = (title: Movie | TVShow) => {
  return {
    ...title,
    title: (title as Movie).title || (title as TVShow).name,
    release_date: (title as Movie).release_date || (title as TVShow).first_air_date,
  };
};
