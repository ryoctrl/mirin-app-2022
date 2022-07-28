import React, { createContext, ReactNode, useEffect, useReducer } from "react";

import { WorksActions, worksReducer } from "./reducer";
import { initialWorksState, WorksState } from "./state";

import { WorksStore } from "store/works-store/works-store.interface";
import { FirestoreWorksStore } from "store/works-store/firestore-works-store";

const worksStore: WorksStore = new FirestoreWorksStore();

interface WorksContextValue {
  worksState: WorksState;
  createWork: (work: Work) => void;
  addComment: (worksIndex: number, comment: WorksComment) => void;
}

export const WorksContext = createContext<WorksContextValue>({
  worksState: initialWorksState,
  createWork: () => {},
  addComment: () => {},
});

export const WorksContextProvider = ({ children }: { children: ReactNode }) => {
  const [worksState, dispatch] = useReducer(worksReducer, initialWorksState);

  const fetchWorks = async () => {
    dispatch({ type: WorksActions.LISTEN_WORKS });

    const works = await worksStore.findAll();
    dispatch({ type: WorksActions.WORKS_UPDATED, payload: { works } });
  };

  // TODO: add support for dispatching reducer methods
  const createWork = async (work: Work) => {
    await worksStore.create(work);
    await fetchWorks();
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  const addComment = (worksIndex: number, comment: WorksComment) => {
    // worksStore.addComment(worksIndex, comment);
  };

  return (
    <WorksContext.Provider value={{ worksState, createWork, addComment }}>
      {children}
    </WorksContext.Provider>
  );
};
