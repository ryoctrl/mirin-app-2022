import React, { createContext, ReactNode, useEffect, useReducer } from "react";

import { OpusActions, opusReducer } from "hooks/opus/reducer";
import { initialOpusState, OpusState } from "hooks/opus/state";
import { OpusStore } from "store/opus";
import { IOpusStore } from "store/opus.interface";

const opusStore: IOpusStore = new OpusStore();

interface OpusContextValue {
  opusState: OpusState;
  addComment: (opusIndex: number, comment: OpusComment) => void;
}

export const OpusContext = createContext<OpusContextValue>({
  opusState: initialOpusState,
  addComment: () => {},
});

export const OpusContextProvider = ({ children }: { children: ReactNode }) => {
  const [opusState, dispatch] = useReducer(opusReducer, initialOpusState);

  useEffect(() => {
    dispatch({ type: OpusActions.LISTEN_OPUS });

    opusStore.fetchOpuses((opuses) =>
      dispatch({ type: OpusActions.OPUS_UPDATED, payload: { opuses } })
    );
  }, []);

  const addComment = (opusIndex: number, comment: OpusComment) => {
    opusStore.addComment(opusIndex, comment);
  };

  return (
    <OpusContext.Provider value={{ opusState, addComment }}>
      {children}
    </OpusContext.Provider>
  );
};
