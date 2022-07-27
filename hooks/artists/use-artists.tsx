import { useContext } from "react";

import { ArtistContext } from "./context";

export const useArtists = () => {
  return useContext(ArtistContext);
};
