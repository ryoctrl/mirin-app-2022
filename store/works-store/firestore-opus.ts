import {
  doc,
  DocumentData,
  DocumentReference,
  getDocs,
} from "firebase/firestore";

import { WorksStore } from "./works-store.interface";

import { firestore } from "libs/firebase/firebase";

export class FirestoreWorksStore implements WorksStore {
  private appRef: DocumentReference<DocumentData>;
  constructor() {
    this.appRef = doc(firestore, "app/v1");
  }

  async fetchWorks(updateWorks: (works: Work[]) => void) {}

  addComment(worksIndex: number, comment: WorksComment) {
    return;
  }
}
