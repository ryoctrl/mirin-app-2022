export interface ArtistsState {
  artists: Artist[];
  isLoading: boolean;
  error?: string;
}

export const initialArtistsState: ArtistsState = {
  artists: [],
  isLoading: false,
};
