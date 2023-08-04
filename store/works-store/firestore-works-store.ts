import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { WorksStore } from "./works-store.interface";

import { firestore } from "libs/firebase/firebase";
import { CollectionKeys } from "libs/firebase/store-config";
import { WorksConverter } from "store/works-store/works-converter";
import { ArtistsStore, FirestoreArtistStore } from "store/artists-store";
import { CommentsConverter } from "store/works-store/comments-converter";

export class FirestoreWorksStore implements WorksStore {
  private appRef: DocumentReference<DocumentData>;
  private worksCollection: CollectionReference<Work>;
  private artistsStore: ArtistsStore;

  constructor() {
    this.appRef = doc(firestore, CollectionKeys.ROOT);
    this.worksCollection = collection(
      this.appRef,
      CollectionKeys.WORKS
    ).withConverter(WorksConverter);
    this.artistsStore = new FirestoreArtistStore();
  }

  private getExhibitionCollection(exhibition: Exhibition) {
    const col = collection(
      this.appRef,
      CollectionKeys.EXHIBITIONS,
      exhibition.id || "",
      CollectionKeys.WORKS
    ).withConverter(WorksConverter);

    return col;
  }
  async findAll(exhibition: Exhibition) {
    const col = this.getExhibitionCollection(exhibition);
    const snapshot = await getDocs(col);
    // FIXME: more elegant...
    const artists = await this.artistsStore.findAll();
    const works = snapshot.docs.map((doc) => doc.data());
    return works
      .filter((work) => !!work.artistId)
      .map((work) => {
        work.artist = artists.find((a) => a.id === work.artistId) || {
          name: "none",
          admittedAt: -1,
        };
        return work;
      });
  }

  async listen(exhibition: Exhibition, setWorks: (works: Work[]) => void) {
    let artists = await this.artistsStore.findAll();
    onSnapshot(this.getExhibitionCollection(exhibition), async (snapshot) => {
      const works = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const work = doc.data();
          const commentsSS = await getDocs(
            collection(doc.ref, "comments").withConverter(CommentsConverter)
          );
          work.comments = commentsSS.docs.map((c) => c.data());

          let artist = artists.find((a) => a.id === work.artistId) ?? null;
          if (!artist) {
            artist = await this.artistsStore.find(work.artistId ?? "");
          }

          work.artist = artist || {
            name: "none",
            admittedAt: -1,
          };
          return work;
        })
      );
      setWorks(works);
    });
  }

  async find(exhibition: Exhibition, id: string) {
    const workRef = doc(this.getExhibitionCollection(exhibition), id);
    const snapshot = await getDoc(workRef);
    const work = snapshot.data();
    if (!work) return null;
    const commentsSS = await getDocs(
      collection(workRef, "comments").withConverter(CommentsConverter)
    );
    work.comments = commentsSS.docs.map((c) => c.data());
    if (!work.artistId) {
      work.artist = {
        name: "none",
        admittedAt: -1,
      };
      return work;
    }

    work.artist = (await this.artistsStore.find(work.artistId)) || {
      name: "none",
      admittedAt: -1,
    };
    return work;
  }
  async create(exhibition: Exhibition, work: Work) {
    const col = this.getExhibitionCollection(exhibition);
    await addDoc(col, work);
  }

  async update(exhibition: Exhibition, work: Work) {
    await updateDoc(
      doc(this.getExhibitionCollection(exhibition), work.id),
      work
    );
  }

  async addComment(
    exhibition: Exhibition,
    workId: string,
    comment: WorksComment
  ) {
    const document = collection(
      this.getExhibitionCollection(exhibition),
      `${workId}/comments`
    ).withConverter(CommentsConverter);
    addDoc(document, comment);
  }

  async deleteComment(
    exhibition: Exhibition,
    workId: string,
    comment: WorksComment
  ) {
    const commentsCollection = collection(
      this.getExhibitionCollection(exhibition),
      `${workId}/comments`
    ).withConverter(CommentsConverter);

    await deleteDoc(doc(commentsCollection, comment.id));
  }

  async delete(exhibition: Exhibition, id: string): Promise<boolean> {
    await deleteDoc(doc(this.getExhibitionCollection(exhibition), id));
    return true;
  }
}

export const firestoreWorksStore = new FirestoreWorksStore();
