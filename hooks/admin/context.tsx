import React, { createContext, ReactNode, useEffect, useReducer } from "react";

import { AdminActions, adminReducer } from "./reducer";
import { AdminState, initialAdminState } from "./state";

import { FirestoreUsersStore, UsersStore } from "store/users-store";

const usersStore: UsersStore = new FirestoreUsersStore();

interface AdminContextValue {
  adminState: AdminState;
  modifyUser: (user: User) => void;
  saveModifiedUsers: () => void;
}

export const AdminContext = createContext<AdminContextValue>({
  adminState: initialAdminState,
  modifyUser: () => {},
  saveModifiedUsers: () => {},
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

  return (
    <AdminContext.Provider
      value={{
        adminState,
        modifyUser,
        saveModifiedUsers,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
