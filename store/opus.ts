import {
  child,
  DatabaseReference,
  get,
  onValue,
  push,
  ref,
  set,
} from "firebase/database";

import { database } from "libs/firebase/firebase";
import { IOpusStore } from "store/opus.interface";

export class OpusStore implements IOpusStore {
  private ref: DatabaseReference;
  constructor() {
    this.ref = ref(database);
  }
  async fetchOpuses(setOpuses: (opuses: Opus[]) => void) {
    onValue(child(this.ref, "opuses"), (snapshot) => {
      if (!snapshot) {
        console.log("snap shot is null");
        return [];
      }

      if (!snapshot.exists()) {
        console.error("No data available");
        return [];
      }
      setOpuses(snapshot.val());
    });
  }

  addComment(opusIndex: number, comment: OpusComment) {
    const newCommentRef = push(child(this.ref, `opuses/${opusIndex}/comments`));
    set(newCommentRef, comment);
    return;
  }
}
