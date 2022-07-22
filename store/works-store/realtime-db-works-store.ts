import {
  child,
  DatabaseReference,
  onValue,
  push,
  ref,
  set,
} from "firebase/database";

import { WorksStore } from "./works-store.interface";

import { database } from "libs/firebase/firebase";

export class RealtimeDBWorksStore implements WorksStore {
  private ref: DatabaseReference;
  constructor() {
    this.ref = ref(database);
  }
  async fetchWorks(setWorks: (works: Work[]) => void) {
    onValue(child(this.ref, "opuses"), (snapshot) => {
      if (!snapshot) {
        console.log("snap shot is null");
        return [];
      }

      if (!snapshot.exists()) {
        console.error("No data available");
        return [];
      }
      setWorks(snapshot.val());
    });
  }

  addComment(worksIndex: number, comment: WorksComment) {
    const newCommentRef = push(
      child(this.ref, `opuses/${worksIndex}/comments`)
    );
    set(newCommentRef, comment);
    return;
  }
}
