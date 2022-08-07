import { IdTokenResult, User } from "firebase/auth";
import { Reducer } from "react";

import { UserState } from "./state";

export enum UserActions {
  UPDATE_AUTH_STATE = "UserActions:UPDATE_AUTH_STATE",
}

export type UserAction = {
  type: UserActions.UPDATE_AUTH_STATE;
  payload: {
    user: User | null;
    idTokenResult?: IdTokenResult;
  };
};

export const userReducer: Reducer<UserState, UserAction> = (state, action) => {
  switch (action.type) {
    case UserActions.UPDATE_AUTH_STATE:
      return {
        user: action.payload.user,
        userInitialized: true,
        userInfo: {
          roles: {
            admin: (action.payload.idTokenResult?.claims.admin ??
              false) as boolean,
          },
        },
      };
  }
};
