export interface StoredFileState {
  storedFiles: StoredFile[];
  isLoading: boolean;
}

export const initialStoredFileState: StoredFileState = {
  storedFiles: [],
  isLoading: false,
};
