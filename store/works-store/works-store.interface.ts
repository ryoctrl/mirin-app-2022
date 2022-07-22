export interface WorksStore {
  fetchWorks: (updateWorks: (works: Work[]) => void) => void;
  addComment: (worksIndex: number, comment: WorksComment) => void;
}
