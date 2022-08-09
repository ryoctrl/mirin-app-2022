import React, { createContext, ReactNode, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

import { ArtistsActions, artistsReducer } from "./reducer";
import { ArtistsState, initialArtistsState } from "./state";

import { ArtistsStore } from "store/artists-store/artist-store.interface";
import { FirestoreArtistStore } from "store/artists-store/firestore-artist-store";

const artistsStore: ArtistsStore = new FirestoreArtistStore();

interface ArtistsContextValue {
  artistsState: ArtistsState;
  createArtist: (artist: Artist) => void;
  deleteArtist: (artistId: string) => void;
  setNewArtist: (artist: Partial<Artist>) => void;
}

export const ArtistContext = createContext<ArtistsContextValue>({
  artistsState: initialArtistsState,
  createArtist: () => {},
  deleteArtist: () => {},
  setNewArtist: () => {},
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

  const createArtist = async (artist: Artist) => {
    dispatch({ type: ArtistsActions.CREATE_ARTIST, payload: { artist } });
    const newArtist = await artistsStore.create(artist).catch((err) => {
      return err.message;
    });

    if (typeof newArtist === "string") {
      dispatch({
        type: ArtistsActions.CREATE_ARTIST_FAILED,
        payload: {
          error: newArtist,
        },
      });
      toast.error("アーティストの作成に失敗しました。");
      return;
    }

    toast.success("アーティストを作成しました。");

    dispatch({
      type: ArtistsActions.CREATE_ARTIST_SUCCEEDED,
      payload: {
        artist: newArtist,
      },
    });
    await fetchArtists();
  };

  const setNewArtist = (artist: Partial<Artist>) => {
    dispatch({
      type: ArtistsActions.SET_NEW_ARTIST,
      payload: {
        artist,
      },
    });
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
        setNewArtist,
      }}
    >
      {children}
    </ArtistContext.Provider>
  );
};
