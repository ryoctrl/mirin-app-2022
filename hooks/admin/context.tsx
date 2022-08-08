import React, { createContext, ReactNode, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

import { AdminActions, adminReducer } from "./reducer";
import { AdminState, initialAdminState } from "./state";

import { FirestoreUsersStore, UsersStore } from "store/users-store";
import { useUser } from "hooks/users/useUser";
import { auth } from "libs/firebase/firebase";
import { registerNewUser } from "libs/firebase/functions";

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
    if (!userState.userInfo?.roles.admin) {
      toast.error("ユーザを登録するための権限がありません。");
      return;
    }

    const result = await registerNewUser(user);
    if (result.data.user) {
      toast.success("ユーザ登録が完了しました。");
    } else {
      console.log(result.data);
      toast.error("ユーザ登録に失敗しました。");
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
