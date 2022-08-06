import React, { createContext, ReactNode, useEffect, useReducer } from "react";

import { ArtistsActions, artistsReducer } from "./reducer";
import { ArtistsState, initialArtistsState } from "./state";

import { ArtistsStore } from "store/artists-store/artist-store.interface";
import { FirestoreArtistStore } from "store/artists-store/firestore-artist-store";

const artistsStore: ArtistsStore = new FirestoreArtistStore();

interface ArtistsContextValue {
  artistsState: ArtistsState;
  createArtist: (artist: Artist) => void;
  deleteArtist: (artistId: string) => void;
}

export const ArtistContext = createContext<ArtistsContextValue>({
  artistsState: initialArtistsState,
  createArtist: () => {},
  deleteArtist: () => {},
});

export const ArtistsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [artistsState, dispatch] = useReducer(
    artistsReducer,
    initialArtistsState
  );

  const fetchArtists = async () => {
    dispatch({ type: ArtistsActions.FETCH_ARTISTS });

    const artists = await artistsStore.findAll().catch((err) => {
      console.error(err);
      dispatch({
        type: ArtistsActions.FETCH_ARTISTS_FAILED,
        payload: { error: `Failed to fetch artists: ${err}` },
      });
      return null;
    });
    if (!artists) return;

    dispatch({
      type: ArtistsActions.FETCH_ARTISTS_SUCCEEDED,
      payload: { artists },
    });
  };

  // TODO: add support for dispatching reducer methods
  const createArtist = async (artist: Artist) => {
    await artistsStore.create(artist);

    await fetchArtists();
  };

  const deleteArtist = async (artistId: string) => {
    await artistsStore.delete(artistId);
    await fetchArtists();
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <ArtistContext.Provider
      value={{
        artistsState,
        createArtist,
        deleteArtist,
      }}
    >
      {children}
    </ArtistContext.Provider>
  );
};
