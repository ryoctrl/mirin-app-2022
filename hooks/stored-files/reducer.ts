import { Reducer } from "react";

import { StoredFileState } from "./state";

export enum StoredFileActions {
  FETCH_STORED_FILES = "StoredFileActions:FETCH_STORED_FILES",
  FETCH_STORED_FILES_SUCCEEDED = "StoredFileActions:FETCH_STORED_FILES_SUCCEEDED",
  FETCH_STORED_FILES_FAILED = "StoredFileActions:FETCH_STORED_FILES_FAILED",
  DELETE_STORED_FILE = "StoredFileActions:DELETE_STORED_FILE",
}

export type StoredFileAction =
  | {
      type: StoredFileActions.FETCH_STORED_FILES;
    }
  | {
      type: StoredFileActions.FETCH_STORED_FILES_SUCCEEDED;
      payload: {
        storedFiles: StoredFile[];
      };
    }
  | {
      type: StoredFileActions.FETCH_STORED_FILES_FAILED;
    }
  | {
      type: StoredFileActions.DELETE_STORED_FILE;
      payload: {
        storedFile: StoredFile;
      };
    };

export const storedFileReducer: Reducer<StoredFileState, StoredFileAction> = (
  state,
  action
) => {
  switch (action.type) {
    case StoredFileActions.FETCH_STORED_FILES:
      return {
        ...state,
        isLoading: true,
      };
    case StoredFileActions.FETCH_STORED_FILES_SUCCEEDED:
      return {
        ...state,
        storedFiles: action.payload.storedFiles,
        isLoading: false,
      };
    case StoredFileActions.FETCH_STORED_FILES_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case StoredFileActions.DELETE_STORED_FILE:
      return {
        ...state,
      };
  }
};
