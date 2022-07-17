export interface IOpusStore {
  fetchOpuses: (updateOpus: (opuses: Opus[]) => void) => void;
  addComment: (opusIndex: number, comment: OpusComment) => void;
}
