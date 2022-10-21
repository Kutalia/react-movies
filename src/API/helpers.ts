import { MediaType, RawMovie, Movie, RawTVShow, TVShow } from './types';

export const normalizeTitle = (title: Movie | TVShow) => {
  return {
    ...title,
    title: (title as Movie).title || (title as TVShow).name,
    release_date:
      (title as Movie).release_date || (title as TVShow).first_air_date,
  };
};

export const concatMediaType = (
  titles: Array<RawMovie | RawTVShow>,
  mediaType: MediaType
): Array<Movie | TVShow> => {
  return titles.map((title) => ({ ...title, media_type: mediaType }));
};
