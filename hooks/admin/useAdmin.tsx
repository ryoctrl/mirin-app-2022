import { useContext } from "react";

import { AdminContext } from "./context";

export const useAdmin = () => {
  return useContext(AdminContext);
};
