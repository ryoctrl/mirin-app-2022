export interface WorksStore {
  findAll: () => Promise<Work[]>;
  find: (id: string) => Promise<Work | null>;
  listen: (setWorks: (works: Work[]) => void) => Promise<void>;
  create: (work: Work) => Promise<void>;
  update: (work: Work) => Promise<void>;
  addComment: (workId: string, comment: WorksComment) => Promise<void>;
  deleteComment: (workId: string, comment: WorksComment) => Promise<void>;
  delete: (id: string) => Promise<boolean>;
}
