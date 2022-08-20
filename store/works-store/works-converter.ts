import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

export const WorksConverter: FirestoreDataConverter<Work> = {
  toFirestore: function (work: WithFieldValue<Work>): DocumentData {
    return {
      title: work.title,
      artistId: (work.artist as WithFieldValue<Artist>).id,
      workedAt: work.workedAt,
      thumb: work.thumb,
      image: work.image,
      description: work.description,
      comments: work.comments,
      order: work.order,
      createdAt: work.createdAt ?? serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
  },

  fromFirestore: function (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions | undefined
  ): Work {
    const data = snapshot.data({
      ...options,
    });
    return {
      id: snapshot.id,
      title: data.title,
      artistId: data.artistId,
      artist: {
        name: "",
        admittedAt: -1,
      },
      workedAt: data.workedAt,
      thumb: data.thumb,
      image: data.image,
      description: data.description,
      comments: data.comments,
      order: data.order,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    };
  },
};
