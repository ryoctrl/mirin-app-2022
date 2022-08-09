import { Reducer } from "react";
import { toast } from "react-toastify";

import { AdminState } from "./state";

import { generateModifiedUserList } from "libs/utils/user-utils";
import { UserActions } from "hooks/users/reducer";

export enum AdminActions {
  FETCH_USERS = "AdminActions:FETCH_USERS",
  FETCH_USERS_SUCCEEDED = "AdminActions:FETCH_USERS_SUCCEEDED",
  FETCH_USERS_FAILED = "AdminActions:FETCH_USERS_FAILED",

  MODIFY_UPDATE_USER = "AdminActions:MODIFY_UPDATE_USER",
  SAVE_UPDATE_USER = "AdminActions:SAVE_UPDATE_USER",
  SAVE_UPDATE_USER_SUCCEEDED = "AdminActions:SAVE_UPDATE_USER_SUCCEEDED",
  SAVE_UPDATE_USER_FAILED = "AdminActions:SAVE_UPDATE_USER_FAILED",

  CREATE_USER = "AdminActions:CREATE_USER",
  CREATE_USER_SUCCEEDED = "AdminActions:CREATE_USER_SUCCEEDED",
  CREATE_USER_FAILED = "AdminActions:CREATE_USER_FAILED",
}

export type AdminAction =
  | {
      type: AdminActions.FETCH_USERS;
    }
  | {
      type: AdminActions.FETCH_USERS_SUCCEEDED;
      payload: {
        users: User[];
      };
    }
  | {
      type: AdminActions.FETCH_USERS_FAILED;
      payload: {
        message: string;
      };
    }
  | {
      type: AdminActions.MODIFY_UPDATE_USER;
      payload: {
        user: User;
      };
    }
  | {
      type: AdminActions.SAVE_UPDATE_USER;
    }
  | {
      type: AdminActions.SAVE_UPDATE_USER_SUCCEEDED;
    }
  | {
      type: AdminActions.SAVE_UPDATE_USER_FAILED;
      payload: {
        message: string;
      };
    }
  | {
      type: typeof AdminActions.CREATE_USER;
    }
  | {
      type: typeof AdminActions.CREATE_USER_SUCCEEDED;
    }
  | {
      type: typeof AdminActions.CREATE_USER_FAILED;
    };

export const adminReducer: Reducer<AdminState, AdminAction> = (
  state,
  action
) => {
  switch (action.type) {
    case AdminActions.FETCH_USERS:
      return {
        ...state,
        isLoading: true,
      };
    case AdminActions.FETCH_USERS_SUCCEEDED:
      return {
        ...state,
        users: action.payload.users,
        isLoading: false,
      };
    case AdminActions.FETCH_USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
      };
    case AdminActions.MODIFY_UPDATE_USER:
      return {
        ...state,
        update: {
          ...state.update,
          users: generateModifiedUserList(
            action.payload.user,
            state.update.users,
            state.users
          ),
        },
      };

    case AdminActions.SAVE_UPDATE_USER:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: true,
        },
      };
    case AdminActions.SAVE_UPDATE_USER_SUCCEEDED:
      toast.success("ユーザ情報を更新しました。", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
      return {
        ...state,
        update: {
          ...state.update,
          users: [],
          isLoading: false,
          message: "",
        },
      };
    case AdminActions.SAVE_UPDATE_USER_FAILED:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          message: action.payload.message,
        },
      };
    case AdminActions.CREATE_USER:
      return {
        ...state,
        isCreating: true,
      };
    case AdminActions.CREATE_USER_SUCCEEDED:
    case AdminActions.CREATE_USER_FAILED:
      return {
        ...state,
        isCreating: false,
      };

    default:
      return {
        ...state,
      };
  }
};
