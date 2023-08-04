import { Reducer } from "react";

import { ExhibitionsState } from "./state";

export enum ExhibitionsActions {
  FETCH_CURRENT_EXHIBITION = "ExhibitionsActions:FETCH_CURRENT_EXHIBITION",
  FETCH_CURRENT_EXHIBITION_SUCCEEDED = "ExhibitionsActions:FETCH_CURRENT_EXHIBITION_SUCCEEDED",
  FETCH_CURRENT_EXHIBITION_FAILED = "ExhibitionsActions:FETCH_CURRENT_EXHIBITION_FAILED",

  FETCH_EXHIBITIONS = "ExhibitionsActions:FETCH_EXHIBITIONS",
  FETCH_EXHIBITIONS_SUCCEEDED = "ExhibitionsActions:FETCH_EXHIBITIONS_SUCCEEDED",
  FETCH_EXHIBITIONS_FAILED = "ExhibitionsActions:FETCH_EXHIBITIONS_FAILED",

  UPDATE_EXHIBITION = "ExhibitionsActions:UPDATE_EXHIBITION",
  UPDATE_EXHIBITION_SUCCEEDED = "ExhibitionsActions:UPDATE_EXHIBITION_SUCCEEDED",
  UDPATE_EXHIBITION_FAILED = "ExhibitionsActions:UPDATE_EXHIBITION_FAILED",

  CREATE_EXHIBITION = "ExhibitionsActions:CREATE_EXHIBITION",
  CREATE_EXHIBITION_SUCCEEDED = "ExhibitionsActions:CREATE_EXHIBITION_SUCCEEDED",
  CREATE_EXHIBITION_FAILED = "ExhibitionsActions:CREATE_EXHIBITION_FAILED",
}
export type ExhibitionsAction =
  | {
      type: typeof ExhibitionsActions.FETCH_CURRENT_EXHIBITION;
    }
  | {
      type: typeof ExhibitionsActions.FETCH_CURRENT_EXHIBITION_SUCCEEDED;
      payload: {
        currentExhibition: Exhibition;
      };
    }
  | {
      type: typeof ExhibitionsActions.FETCH_CURRENT_EXHIBITION_FAILED;
      payload: {
        error: string;
      };
    }
  | {
      type: typeof ExhibitionsActions.FETCH_EXHIBITIONS;
    }
  | {
      type: typeof ExhibitionsActions.FETCH_EXHIBITIONS_SUCCEEDED;
      payload: {
        exhibitions: Exhibition[];
      };
    }
  | {
      type: typeof ExhibitionsActions.FETCH_EXHIBITIONS_FAILED;
      payload: {
        error: string;
      };
    }
  | {
      type: typeof ExhibitionsActions.UPDATE_EXHIBITION;
      payload: {
        exhibition: Exhibition;
      };
    }
  | {
      type: typeof ExhibitionsActions.UPDATE_EXHIBITION_SUCCEEDED;
      payload: {
        exhibition: Exhibition;
      };
    }
  | {
      type: typeof ExhibitionsActions.UDPATE_EXHIBITION_FAILED;
      payload: {
        error: string;
      };
    }
  | {
      type: typeof ExhibitionsActions.CREATE_EXHIBITION;
      payload: {
        exhibition: Exhibition;
      };
    }
  | {
      type: typeof ExhibitionsActions.CREATE_EXHIBITION_SUCCEEDED;
      payload: {
        exhibition: Exhibition;
      };
    }
  | {
      type: typeof ExhibitionsActions.CREATE_EXHIBITION_FAILED;
      payload: {
        error: string;
      };
    };

export const exhibitionsReducer: Reducer<
  ExhibitionsState,
  ExhibitionsAction
> = (state, action) => {
  switch (action.type) {
    case ExhibitionsActions.FETCH_CURRENT_EXHIBITION:
      return {
        ...state,
        isCurrentExhibitionLoading: true,
      };
    case ExhibitionsActions.FETCH_EXHIBITIONS:
      return {
        ...state,
        isExhibitionsLoading: true,
      };
    case ExhibitionsActions.FETCH_CURRENT_EXHIBITION_SUCCEEDED:
    case ExhibitionsActions.FETCH_CURRENT_EXHIBITION_FAILED:
      return {
        ...state,
        ...action.payload,
        isCurrentExhibitionLoading: false,
      };
    case ExhibitionsActions.FETCH_EXHIBITIONS_SUCCEEDED:
    case ExhibitionsActions.FETCH_EXHIBITIONS_FAILED:
      return {
        ...state,
        ...action.payload,
        isExhibitionsLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
