import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const registerNewUser = functions.https.onCall(async (data, context) => {
  if (!context.auth?.token.admin) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "To reigster new user you must have admin permission."
    );
  }

  const newUser = await admin.auth().createUser({
    email: data.email,
  });

  return {
    user: {
      email: newUser.email,
    },
    message: "registered new user",
  };
});
