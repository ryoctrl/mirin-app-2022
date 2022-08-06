export interface WorksState {
  works: Work[];
  isLoading: boolean;
  error?: string;
}

export const initialWorksState: WorksState = {
  works: [],
  isLoading: false,
};
