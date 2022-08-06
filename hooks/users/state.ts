import { User } from "firebase/auth";

export type UserInfo = {
  roles: {
    admin: boolean;
  };
};

export interface UserState {
  user: User | null;
  userInfo?: UserInfo;
}

export const initialUserState: UserState = {
  user: null,
};
