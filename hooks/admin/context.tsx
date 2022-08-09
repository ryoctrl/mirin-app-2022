import React, { createContext, ReactNode, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

import { AdminActions, adminReducer } from "./reducer";
import { AdminState, initialAdminState } from "./state";

import { FirestoreUsersStore, UsersStore } from "store/users-store";
import { useUser } from "hooks/users/useUser";
import { auth } from "libs/firebase/firebase";
import { registerNewUser } from "libs/firebase/functions";
import { SystemMessages } from "libs/messages/system";

const usersStore: UsersStore = new FirestoreUsersStore();

interface AdminContextValue {
  adminState: AdminState;
  modifyUser: (user: User) => void;
  saveModifiedUsers: () => void;
  registerUser: (user: User) => void;
}

export const AdminContext = createContext<AdminContextValue>({
  adminState: initialAdminState,
  modifyUser: () => {},
  saveModifiedUsers: () => {},
  registerUser: () => {},
});

export const AdminContextProvider = ({ children }: { children: ReactNode }) => {
  const [adminState, dispatch] = useReducer(adminReducer, initialAdminState);

  const fetchAllUsers = async () => {
    dispatch({ type: AdminActions.FETCH_USERS });
    const users = await usersStore.findAll();
    dispatch({
      type: AdminActions.FETCH_USERS_SUCCEEDED,
      payload: { users },
    });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const modifyUser = (user: User) => {
    dispatch({
      type: AdminActions.MODIFY_UPDATE_USER,
      payload: {
        user,
      },
    });
  };

  const saveModifiedUsers = () => {
    dispatch({
      type: AdminActions.SAVE_UPDATE_USER,
    });

    Promise.all(adminState.update.users.map((user) => usersStore.update(user)))
      .then(async () => {
        dispatch({
          type: AdminActions.SAVE_UPDATE_USER_SUCCEEDED,
        });
        await fetchAllUsers();
      })
      .catch((err: Error) => {
        dispatch({
          type: AdminActions.SAVE_UPDATE_USER_FAILED,
          payload: {
            message: err.message,
          },
        });
      });
  };

  const { userState } = useUser();

  const registerUser = async (user: User) => {
    dispatch({ type: AdminActions.CREATE_USER });
    if (!userState.userInfo?.roles.admin) {
      toast.error("ユーザを登録するための権限がありません。");
      dispatch({ type: AdminActions.CREATE_USER_FAILED });
      return;
    }

    const result = await registerNewUser(user).catch((err) => err);

    if (result instanceof Error) {
      toast.error(
        SystemMessages[result.message as keyof typeof SystemMessages] ??
          result.message
      );
      dispatch({ type: AdminActions.CREATE_USER_FAILED });
      return;
    }

    if (result.data.user) {
      toast.success("ユーザ登録が完了しました。");
      dispatch({ type: AdminActions.CREATE_USER_SUCCEEDED });
    } else {
      toast.error("ユーザ登録に失敗しました。");
      dispatch({ type: AdminActions.CREATE_USER_FAILED });
    }
  };

  return (
    <AdminContext.Provider
      value={{
        adminState,
        modifyUser,
        saveModifiedUsers,
        registerUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
