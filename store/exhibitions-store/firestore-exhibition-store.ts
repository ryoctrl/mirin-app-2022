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
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { ExhibitionsStore } from "./exhibition.interface";

import { firestore } from "libs/firebase/firebase";
import { CollectionKeys } from "libs/firebase/store-config";
import { ExhibitionConverter } from "store/exhibitions-store/exhibition-converter";

export class FirestoreExhibitionStore implements ExhibitionsStore {
  private appRef: DocumentReference<DocumentData>;
  private exhibitionsCollection: CollectionReference<Exhibition>;
  constructor() {
    this.appRef = doc(firestore, CollectionKeys.ROOT);
    this.exhibitionsCollection = collection(
      this.appRef,
      CollectionKeys.EXHIBITIONS
    ).withConverter(ExhibitionConverter);
  }

  async findAll(): Promise<Exhibition[]> {
    const snapshot = await getDocs(this.exhibitionsCollection);
    return snapshot.docs.map((doc) => doc.data());
  }

  async find(id: string): Promise<Exhibition | null> {
    const snapshot = await getDoc(doc(this.exhibitionsCollection, id));
    return snapshot.data() || null;
  }

  async findCurrentExhibition(): Promise<Exhibition | null> {
    const snapshot = await getDocs(
      query(this.exhibitionsCollection, where("isActive", "==", true))
    );
    if (snapshot.docs.length === 0) return null;
    return snapshot.docs[0].data();
    // return snapshot.data() || null;
  }

  async create(exhibition: Exhibition): Promise<Exhibition> {
    const newDocumentRef = await addDoc(this.exhibitionsCollection, exhibition);
    const newDocument = await getDoc(newDocumentRef).then((ss) => ss.data());
    if (!newDocument) {
      throw new Error("failed to create artist");
    }
    return newDocument;
  }

  async update(exhibition: Exhibition): Promise<boolean> {
    if (!exhibition.id) {
      throw new Error("The user id does not specified");
    }
    await updateDoc(doc(this.exhibitionsCollection, exhibition.id), exhibition);
    return true;
  }

  async delete(id: string): Promise<boolean> {
    await deleteDoc(doc(this.exhibitionsCollection, id));
    return true;
  }
}

export const firestoreExhibitionStore = new FirestoreExhibitionStore();
