export interface WorksStore {
  findAll: (exhibition: Exhibition) => Promise<Work[]>;
  find: (exhibition: Exhibition, id: string) => Promise<Work | null>;
  listen: (
    exhibition: Exhibition,
    setWorks: (works: Work[]) => void
  ) => Promise<void>;
  create: (exhibition: Exhibition, work: Work) => Promise<void>;
  update: (exhibition: Exhibition, work: Work) => Promise<void>;
  addComment: (
    exhibition: Exhibition,
    workId: string,
    comment: WorksComment
  ) => Promise<void>;
  deleteComment: (
    exhibition: Exhibition,
    workId: string,
    comment: WorksComment
  ) => Promise<void>;
  delete: (exhibition: Exhibition, id: string) => Promise<boolean>;
}
