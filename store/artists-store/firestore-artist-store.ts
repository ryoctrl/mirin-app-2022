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
} from "firebase/firestore";

import { ArtistsStore } from "./artist-store.interface";

import { firestore } from "libs/firebase/firebase";
import { ArtistConverter } from "store/artists-store/artist-converter";
import { CollectionKeys } from "libs/firebase/store-config";

export class FirestoreArtistStore implements ArtistsStore {
  private appRef: DocumentReference<DocumentData>;
  private usersCollection: CollectionReference<Artist>;
  constructor() {
    this.appRef = doc(firestore, CollectionKeys.ROOT);
    this.usersCollection = collection(
      this.appRef,
      CollectionKeys.ARTISTS
    ).withConverter(ArtistConverter);
  }

  async findAll(): Promise<Artist[]> {
    const snapshot = await getDocs(this.usersCollection);
    return snapshot.docs.map((doc) => doc.data());
  }

  async find(id: string): Promise<Artist | null> {
    const snapshot = await getDoc(doc(this.usersCollection, id));
    return snapshot.data() || null;
  }

  async create(artist: Artist): Promise<Artist> {
    const newArtistRef = await addDoc(this.usersCollection, artist);
    const newArtist = await getDoc(newArtistRef).then((ss) => ss.data());
    if (!newArtist) {
      throw new Error("failed to create artist");
    }
    return newArtist;
  }

  async delete(id: string): Promise<boolean> {
    await deleteDoc(doc(this.usersCollection, id));
    return true;
  }
}
