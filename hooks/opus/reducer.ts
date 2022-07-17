import { Reducer } from "react";

import { OpusState } from "hooks/opus/state";

export enum OpusActions {
  LISTEN_OPUS = "LISTEN_OPUS",
  OPUS_UPDATED = "OPUS_UPDATED",
}

export type OpusAction =
  | { type: typeof OpusActions.LISTEN_OPUS }
  | {
      type: typeof OpusActions.OPUS_UPDATED;
      payload: {
        opuses: Opus[];
      };
    };

export const opusReducer: Reducer<OpusState, OpusAction> = (state, action) => {
  switch (action.type) {
    case OpusActions.LISTEN_OPUS:
      return {
        ...state,
        isLoading: true,
      };
    case OpusActions.OPUS_UPDATED:
      return {
        ...state,
        opuses: action.payload.opuses,
        isLoading: false,
      };
  }
  return state;
};
