import { User } from "firebase/auth";

export interface UserState {
  user: User | null;
}

export const initialUserState: UserState = {
  user: null,
};
