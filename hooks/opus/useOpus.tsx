import { useContext } from "react";

import { OpusContext } from "hooks/opus/context";

export const useOpus = () => {
  return useContext(OpusContext);
};
