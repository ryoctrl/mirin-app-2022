import dayjs from "dayjs";
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
      startAt: exhibition.startAt,
      endAt: exhibition.endAt,
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
    const now = dayjs();
    const startAt = dayjs(data.startAt?.toDate());
    const endAt = dayjs(data.endAt?.toDate());

    const inPeriod =
      process.env.NEXT_PUBLIC_DEV_MODE === "true" ||
      !startAt.isValid() ||
      !endAt.isValid() ||
      (now.isAfter(startAt) && now.isBefore(endAt));

    return {
      id: snapshot.id,
      title: data.title,
      isActive: data.isActive,
      heroImage: data.heroImage,
      startAt: data.startAt?.toDate(),
      endAt: data.endAt?.toDate(),
      inPeriod,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    };
  },
};
