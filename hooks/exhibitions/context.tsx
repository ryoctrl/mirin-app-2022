import React, { createContext, ReactNode, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

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
  createExhibition: (exhibition: Exhibition) => Promise<Exhibition>;
}

export const ExhibitionContext = createContext<ExhibitionsContextValue>({
  exhibitionsState: initialExhibitionsState,
  updateExhibition: () => {},
  createExhibition: (e) => Promise.resolve(e),
});

export const ExhibitionsContextProvider = ({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: ExhibitionsState;
}) => {
  const [exhibitionsState, dispatch] = useReducer(exhibitionsReducer, {
    ...initialExhibitionsState,
    ...initialState,
  });

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

  const disActivateAnotherExhibition = async (
    newActiveExhibition: Exhibition
  ) => {
    if (!newActiveExhibition.isActive) return;
    const exhibitions = await exhibitionsStore.findAll();
    exhibitions
      .filter(
        (exhibition) =>
          exhibition.isActive && exhibition.id !== newActiveExhibition.id
      )
      .map(async (exhibition) => {
        exhibition.isActive = false;
        await exhibitionsStore.update(exhibition);
      });
  };

  const updateExhibition = async (exhibition: Exhibition) => {
    await exhibitionsStore.update(exhibition);
    await disActivateAnotherExhibition(exhibition);

    toast.success(`展示会${exhibition.title}を更新しました。`);

    fetchCurrentExhibition();
    fetchExhibitions();

    return exhibition;
  };

  const createExhibition = async (exhibition: Exhibition) => {
    const newExhibition = await exhibitionsStore.create(exhibition);
    await disActivateAnotherExhibition(newExhibition);
    toast.success(`展示会${newExhibition.title}を作成しました。`);

    fetchCurrentExhibition();
    fetchExhibitions();

    return newExhibition;
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
        createExhibition,
      }}
    >
      {children}
    </ExhibitionContext.Provider>
  );
};
