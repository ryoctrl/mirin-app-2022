import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

import { artistsReducer } from "hooks/artists/reducer";

export const ArtistConverter: FirestoreDataConverter<Artist> = {
  toFirestore: function (artist: WithFieldValue<Artist>): DocumentData {
    const gradOfArtist: Pick<Artist, "graduatedAt"> = {};
    if (artist.graduatedAt) {
      gradOfArtist.graduatedAt = Number(artist.graduatedAt);
    }
    return {
      name: artist.name,
      ...gradOfArtist,
      social: artist.social,
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
      social: data.social,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    };
  },
};
