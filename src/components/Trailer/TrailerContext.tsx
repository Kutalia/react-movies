import { useState, SetStateAction, createContext } from 'react';

import TrailerModal from './TrailerModal';
import { GetTrailerParams, MediaType } from '../../API/types';

interface PropTypes {
  children: React.ReactNode;
}

export const defaultValue = {
  trailerQuery: null,
  setTrailerQuery: () => {},
};

export const TrailerContext = createContext<{
  trailerQuery: { id: number; mediaType: MediaType } | null;
  setTrailerQuery: React.Dispatch<SetStateAction<GetTrailerParams | null>>;
}>(defaultValue);

export const TrailerProvider: React.FC<PropTypes> = ({ children }) => {
  const [trailerQuery, setTrailerQuery] = useState<GetTrailerParams | null>(
    null
  );

  return (
    <TrailerContext.Provider value={{ trailerQuery, setTrailerQuery }}>
      {trailerQuery && <TrailerModal />}
      {children}
    </TrailerContext.Provider>
  );
};
