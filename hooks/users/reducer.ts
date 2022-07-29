import { User } from "firebase/auth";
import { Reducer } from "react";

import { UserState } from "./state";

export enum UserActions {
  UPDATE_AUTH_STATE = "UserActions:UPDATE_AUTH_STATE",
}

export type UserAction = {
  type: UserActions.UPDATE_AUTH_STATE;
  payload: {
    user: User | null;
  };
};

export const userReducer: Reducer<UserState, UserAction> = (state, action) => {
  switch (action.type) {
    case UserActions.UPDATE_AUTH_STATE:
      return {
        user: action.payload.user,
      };
  }
};
