import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

export const UserConverter: FirestoreDataConverter<User> = {
  toFirestore: function (user: WithFieldValue<User>): DocumentData {
    return {
      admin: user.admin,
      email: user.email,
      createdAt: user.createdAt ?? serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
  },

  fromFirestore: function (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions | undefined
  ): User {
    const data = snapshot.data({
      ...options,
    });
    return {
      id: snapshot.id,
      email: data.email,
      admin: data.admin || false,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    };
  },
};
