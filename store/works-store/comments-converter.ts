import { serverTimestamp } from "firebase/firestore";
import {
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

export const CommentsConverter: FirestoreDataConverter<WorksComment> = {
  toFirestore: function (comment: WithFieldValue<WorksComment>): DocumentData {
    return {
      name: comment.name,
      text: comment.text,
      createdAt: comment.createdAt ?? serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
  },

  fromFirestore: function (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions | undefined
  ): WorksComment {
    const data = snapshot.data({
      ...options,
    });
    return {
      id: snapshot.id,
      name: data.name,
      text: data.text,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    };
  },
};
