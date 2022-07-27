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
      graduatedAt: artist.graduatedAt,
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
      graduatedAt: data.graduatedAt,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    };
  },
};
