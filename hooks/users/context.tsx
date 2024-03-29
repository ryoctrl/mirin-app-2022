import { onAuthStateChanged } from "firebase/auth";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
} from "react";

import { UserActions, userReducer } from "./reducer";
import { initialUserState, UserState } from "./state";

import { auth } from "libs/firebase/firebase";

interface UserContextValue {
  userState: UserState;
  isLoggedIn: () => boolean;
}

export const UserContext = createContext<UserContextValue>({
  userState: initialUserState,
  isLoggedIn: () => false,
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userState, dispatch] = useReducer(userReducer, initialUserState);

  useEffect(() => {
    const unSubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      async (user) => {
        const idTokenResult = await user?.getIdTokenResult(true);

        dispatch({
          type: UserActions.UPDATE_AUTH_STATE,
          payload: { user, idTokenResult },
        });
      }
    );

    return () => {
      unSubscribeAuthStateChanged();
    };
  }, []);

  const isLoggedIn = useCallback(() => {
    return !!userState.user;
  }, [userState]);

  return (
    <UserContext.Provider value={{ userState, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
