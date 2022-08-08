export interface ExhibitionsStore {
  findAll: () => Promise<Exhibition[]>;
  find: (id: string) => Promise<Exhibition | null>;
  findCurrentExhibition: () => Promise<Exhibition | null>;
  create: (exhibition: Exhibition) => Promise<Exhibition>;
  update: (exhibition: Exhibition) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
}
