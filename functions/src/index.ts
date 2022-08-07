import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { EventContext } from "firebase-functions";
import { UserRecord } from "firebase-functions/v1/auth";

admin.initializeApp();

const builder = functions.region("asia-northeast1");
const usersDocs = builder.firestore.document("/app/v1/users/{userId}");
const users = builder.auth.user();

const handleUser = async (user: UserRecord, context: EventContext) => {
  if (context.eventType === "google.firebase.auth.user.delete") {
    await admin.firestore().doc(`/app/v1/users/${user.uid}`).delete();
    return;
  }
  await admin.firestore().doc(`/app/v1/users/${user.uid}`).set({
    email: user.email,
    name: user.displayName,
    admin: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
};

const handleSnapshot = async (
  snapshot: QueryDocumentSnapshot,
  context: EventContext
) => {
  if (context.eventType === "google.firestore.document.delete") {
    await deleteUser(snapshot.id);
    return;
  }
  const user = snapshot.data();

  await setCustomClaim(snapshot.id, {
    admin: user.admin ?? false,
  });
};

const setCustomClaim = async (userId: string, customClaims: object | null) => {
  await admin.auth().setCustomUserClaims(userId, customClaims);
};

const deleteUser = async (userId: string) => {
  await admin.auth().deleteUser(userId);
};

/**
 * entry point for each user events.
 */
export const onUpdateAdminRecord = usersDocs.onUpdate((change, c) =>
  handleSnapshot(change.after, c)
);
export const onDeleteAdminRecord = usersDocs.onDelete(handleSnapshot);
export const onCreateUser = users.onCreate(handleUser);
export const onDeleteUser = users.onDelete(handleUser);
export * from "./user";
