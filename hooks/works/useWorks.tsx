import { useContext } from "react";

import { WorksContext } from "./context";

export const useWorks = () => {
  return useContext(WorksContext);
};
