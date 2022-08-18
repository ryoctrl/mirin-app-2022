import React, { createContext, ReactNode, useEffect, useReducer } from "react";

import { StoredFileActions, storedFileReducer } from "./reducer";
import { initialStoredFileState, StoredFileState } from "./state";

import { FileStore, ImagesFileStore } from "store/file-store";

interface StoredFileContextValue {
  storedFileState: StoredFileState;
  deleteFile: (storedFile: StoredFile) => Promise<void>;
}

export const StoredFileContext = createContext<StoredFileContextValue>({
  storedFileState: initialStoredFileState,
  deleteFile: () => Promise.resolve(),
});

const storedFileStore: FileStore = new ImagesFileStore();

export const StoredFileContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [storedFileState, dispatch] = useReducer(
    storedFileReducer,
    initialStoredFileState
  );

  const fetchAll = async () => {
    dispatch({ type: StoredFileActions.FETCH_STORED_FILES });

    const storedFiles = await storedFileStore.findAll();
    dispatch({
      type: StoredFileActions.FETCH_STORED_FILES_SUCCEEDED,
      payload: {
        storedFiles,
      },
    });
  };
  useEffect(() => {
    fetchAll();
  }, []);

  const deleteFile = async (storedFile: StoredFile) => {
    await storedFileStore.delete(storedFile);
    await fetchAll();
  };

  return (
    <StoredFileContext.Provider value={{ storedFileState, deleteFile }}>
      {children}
    </StoredFileContext.Provider>
  );
};
