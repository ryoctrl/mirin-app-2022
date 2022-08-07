export interface ArtistsState {
  artists: Artist[];
  isLoading: boolean;
  error?: string;

  create: {
    artist: Partial<Artist>;
    isCreating: boolean;
    error?: string;
  };
}

export const initialArtistsState: ArtistsState = {
  artists: [],
  isLoading: false,
  create: {
    artist: {},
    isCreating: false,
  },
};
