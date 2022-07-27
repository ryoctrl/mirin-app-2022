import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
} from "firebase/firestore";

import { WorksStore } from "./works-store.interface";

import { firestore } from "libs/firebase/firebase";
import { CollectionKeys } from "libs/firebase/store-config";
import { WorksConverter } from "store/works-store/works-converter";
import { ArtistsStore, FirestoreArtistStore } from "store/artists-store";

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
  async findAll() {
    const snapshot = await getDocs(this.worksCollection);
    // FIXME: more elegant...
    const artists = await this.artistsStore.findAll();
    const works = snapshot.docs.map((doc) => doc.data());
    return works
      .filter((work) => !!work.artistId)
      .map((work) => {
        work.artist = artists.find((a) => a.id === work.artistId) || {
          name: "none",
        };
        return work;
      });
  }
  async find(id: string) {
    const snapshot = await getDoc(doc(this.worksCollection, id));
    return snapshot.data() || null;
  }
  async create(work: Work) {
    await addDoc(this.worksCollection, work);
  }
}
