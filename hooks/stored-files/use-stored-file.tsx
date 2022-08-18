import { useContext } from "react";

import { StoredFileContext } from "./context";

export const useStoredFile = () => {
  return useContext(StoredFileContext);
};
