import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

export const ExhibitionConverter: FirestoreDataConverter<Exhibition> = {
  toFirestore: function (exhibition: WithFieldValue<Exhibition>): DocumentData {
    return {
      heroImage: exhibition.heroImage,
      title: exhibition.title,
      isActive: exhibition.isActive,
      createdAt: exhibition.createdAt ?? serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
  },

  fromFirestore: function (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions | undefined
  ): Exhibition {
    const data = snapshot.data({
      ...options,
    });
    return {
      id: snapshot.id,
      title: data.title,
      isActive: data.isActive,
      heroImage: data.heroImage,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    };
  },
};
