import React, { createContext, ReactNode, useEffect, useReducer } from "react";

import { ExhibitionsActions, exhibitionsReducer } from "./reducer";
import { ExhibitionsState, initialExhibitionsState } from "./state";

import {
  ExhibitionsStore,
  FirestoreExhibitionStore,
} from "store/exhibitions-store";
import { useUser } from "hooks/users/useUser";

const exhibitionsStore: ExhibitionsStore = new FirestoreExhibitionStore();

interface ExhibitionsContextValue {
  exhibitionsState: ExhibitionsState;
  updateExhibition: (exhibition: Exhibition) => void;
}

export const ExhibitionContext = createContext<ExhibitionsContextValue>({
  exhibitionsState: initialExhibitionsState,
  updateExhibition: () => {},
});

export const ExhibitionsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [exhibitionsState, dispatch] = useReducer(
    exhibitionsReducer,
    initialExhibitionsState
  );

  const { userState } = useUser();

  const fetchCurrentExhibition = async () => {
    dispatch({ type: ExhibitionsActions.FETCH_CURRENT_EXHIBITION });
    const exhibition = await exhibitionsStore
      .findCurrentExhibition()
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ExhibitionsActions.FETCH_CURRENT_EXHIBITION_FAILED,
          payload: { error: `Failed to fetch artists: ${err}` },
        });
        return null;
      });
    if (!exhibition) return;

    dispatch({
      type: ExhibitionsActions.FETCH_CURRENT_EXHIBITION_SUCCEEDED,
      payload: { currentExhibition: exhibition },
    });
  };

  const fetchExhibitions = async () => {
    dispatch({ type: ExhibitionsActions.FETCH_EXHIBITIONS });

    const exhibitions = await exhibitionsStore.findAll().catch((err) => {
      console.error(err);
      dispatch({
        type: ExhibitionsActions.FETCH_EXHIBITIONS_FAILED,
        payload: { error: `Failed to fetch artists: ${err}` },
      });
      return null;
    });
    if (!exhibitions) return;

    dispatch({
      type: ExhibitionsActions.FETCH_EXHIBITIONS_SUCCEEDED,
      payload: { exhibitions },
    });
  };

  const updateExhibition = async (exhibition: Exhibition) => {
    await exhibitionsStore.update(exhibition);
  };

  useEffect(() => {
    fetchCurrentExhibition();
    if (userState.userInitialized && userState.userInfo?.roles.admin) {
      fetchExhibitions();
    }
  }, [userState.userInitialized, userState.userInfo]);

  return (
    <ExhibitionContext.Provider
      value={{
        exhibitionsState,
        updateExhibition,
      }}
    >
      {children}
    </ExhibitionContext.Provider>
  );
};
