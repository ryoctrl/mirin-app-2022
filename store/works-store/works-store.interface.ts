export interface WorksStore {
  findAll: () => Promise<Work[]>;
  find: (id: string) => Promise<Work | null>;
  create: (work: Work) => Promise<void>;
  // fetchWorks: (updateWorks: (works: Work[]) => void) => void;
  // addComment: (worksIndex: number, comment: WorksComment) => void;
}
