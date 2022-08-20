import { httpsCallable } from "firebase/functions";

import { functions } from "libs/firebase/firebase";

type RegisterNewUserResponse = {
  user: User;
  message?: string;
};

const registerNewUserFunc = httpsCallable<User, RegisterNewUserResponse>(
  functions,
  "registerNewUser"
);

export const registerNewUser = (user: User) => {
  return registerNewUserFunc(user);
};
