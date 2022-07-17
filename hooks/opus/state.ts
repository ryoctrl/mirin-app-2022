export interface OpusState {
  opuses: Opus[];
  isLoading: boolean;
  error?: string;
}

export const initialOpusState: OpusState = {
  opuses: [],
  isLoading: false,
};
