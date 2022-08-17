import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

export const ArtistConverter: FirestoreDataConverter<Artist> = {
  toFirestore: function (artist: WithFieldValue<Artist>): DocumentData {
    return {
      name: artist.name,
      admittedAt: artist.admittedAt,
      createdAt: artist.createdAt ?? serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
  },

  fromFirestore: function (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions | undefined
  ): Artist {
    const data = snapshot.data({
      ...options,
    });
    return {
      id: snapshot.id,
      name: data.name,
      admittedAt: data.admittedAt,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    };
  },
};
