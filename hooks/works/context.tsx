import React, { createContext, ReactNode, useEffect, useReducer } from "react";

import { WorksActions, worksReducer } from "./reducer";
import { initialWorksState, WorksState } from "./state";

import { RealtimeDBWorksStore } from "store/works-store/realtime-db-works-store";
import { WorksStore } from "store/works-store/works-store.interface";

const worksStore: WorksStore = new RealtimeDBWorksStore();

interface WorksContextValue {
  worksState: WorksState;
  addComment: (worksIndex: number, comment: WorksComment) => void;
}

export const WorksContext = createContext<WorksContextValue>({
  worksState: initialWorksState,
  addComment: () => {},
});

export const WorksContextProvider = ({ children }: { children: ReactNode }) => {
  const [worksState, dispatch] = useReducer(worksReducer, initialWorksState);

  useEffect(() => {
    dispatch({ type: WorksActions.LISTEN_WORKS });

    worksStore.fetchWorks((works) =>
      dispatch({ type: WorksActions.WORKS_UPDATED, payload: { works } })
    );
  }, []);

  const addComment = (worksIndex: number, comment: WorksComment) => {
    worksStore.addComment(worksIndex, comment);
  };

  return (
    <WorksContext.Provider value={{ worksState, addComment }}>
      {children}
    </WorksContext.Provider>
  );
};
