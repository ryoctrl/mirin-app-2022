import { useContext } from "react";

import { ExhibitionContext } from "./context";

export const useExhibitions = () => {
  return useContext(ExhibitionContext);
};
