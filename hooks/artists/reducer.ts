import { Reducer } from "react";

import { ArtistsState } from "./state";

export enum ArtistsActions {
  FETCH_ARTISTS = "ArtistsActions:FETCH_ARTISTS",
  FETCH_ARTISTS_SUCCEEDED = "ArtistsActions:FETCH_ARTISTS_SUCCEEDED",
  FETCH_ARTISTS_FAILED = "ArtistsActions:FETCH_ARTISTS_FAILED",

  CREATE_ARTIST = "ArtistsActions:CREATE_ARTIST",
  CREATE_ARTIST_SUCCEEDED = "ArtistsActions:CREATE_ARTIST_SUCCEEDED",
  CREATE_ARTIST_FAILED = "ArtistsActions:CREATE_ARTIST_FAILED",
}
export type ArtistsAction =
  | { type: typeof ArtistsActions.FETCH_ARTISTS }
  | {
      type: typeof ArtistsActions.FETCH_ARTISTS_SUCCEEDED;
      payload: {
        artists: Artist[];
      };
    }
  | {
      type: typeof ArtistsActions.FETCH_ARTISTS_FAILED;
      payload: {
        error: string;
      };
    }
  | {
      type: typeof ArtistsActions.CREATE_ARTIST;
      payload: {
        artist: Artist;
      };
    }
  | {
      type: typeof ArtistsActions.CREATE_ARTIST_SUCCEEDED;
      payload: {
        artist: Artist;
      };
    }
  | {
      type: typeof ArtistsActions.CREATE_ARTIST_FAILED;
      payload: {
        error: string;
      };
    };

export const artistsReducer: Reducer<ArtistsState, ArtistsAction> = (
  state,
  action
) => {
  switch (action.type) {
    case ArtistsActions.FETCH_ARTISTS:
      return {
        ...state,
        isLoading: true,
      };
    case ArtistsActions.FETCH_ARTISTS_SUCCEEDED:
      return {
        ...state,
        artists: action.payload.artists,
        isLoading: false,
      };
    case ArtistsActions.FETCH_ARTISTS_FAILED:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case ArtistsActions.CREATE_ARTIST:
      return {
        ...state,
      };
    case ArtistsActions.CREATE_ARTIST_SUCCEEDED:
      return {
        ...state,
      };
    case ArtistsActions.CREATE_ARTIST_FAILED:
      return {
        ...state,
      };
  }
};
