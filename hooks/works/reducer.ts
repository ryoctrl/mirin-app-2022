import { Reducer } from "react";

import { WorksState } from "./state";

export enum WorksActions {
  LISTEN_WORKS = "LISTEN_WORKS",
  WORKS_UPDATED = "WORKS_UPDATED",
  WORK_UPDATED = "WORK_UPDATED",
}

export type WorksAction =
  | { type: typeof WorksActions.LISTEN_WORKS }
  | {
      type: typeof WorksActions.WORKS_UPDATED;
      payload: {
        works: Work[];
      };
    }
  | {
      type: typeof WorksActions.WORK_UPDATED;
      payload: {
        work: Work;
      };
    };

export const worksReducer: Reducer<WorksState, WorksAction> = (
  state,
  action
) => {
  switch (action.type) {
    case WorksActions.LISTEN_WORKS:
      return {
        ...state,
        isLoading: true,
      };
    case WorksActions.WORKS_UPDATED:
      return {
        ...state,
        works: action.payload.works,
        isLoading: false,
      };
    case WorksActions.WORK_UPDATED:
      return {
        ...state,
        works: state.works.map((w) =>
          w.id === action.payload.work.id ? action.payload.work : w
        ),
        isLoading: false,
      };
  }
};
