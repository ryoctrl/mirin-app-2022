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

import { UsersStore } from "./user-store.interface";

import { firestore } from "libs/firebase/firebase";
import { CollectionKeys } from "libs/firebase/store-config";
import { UserConverter } from "store/users-store/user-converter";

export class FirestoreArtistStore implements UsersStore {
  private appRef: DocumentReference<DocumentData>;
  private usersCollection: CollectionReference<User>;
  constructor() {
    this.appRef = doc(firestore, CollectionKeys.ROOT);
    this.usersCollection = collection(
      this.appRef,
      CollectionKeys.USERS
    ).withConverter(UserConverter);
  }

  async findAll(): Promise<User[]> {
    const snapshot = await getDocs(this.usersCollection);
    return snapshot.docs.map((doc) => doc.data());
  }

  async find(id: string): Promise<User | null> {
    const snapshot = await getDoc(doc(this.usersCollection, id));
    return snapshot.data() || null;
  }

  async create(user: User): Promise<void> {
    await addDoc(this.usersCollection, user);
  }

  async delete(id: string): Promise<boolean> {
    await deleteDoc(doc(this.usersCollection, id));
    return true;
  }
}
