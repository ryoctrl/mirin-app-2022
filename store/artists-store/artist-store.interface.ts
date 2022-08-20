export interface ArtistsStore {
  findAll: () => Promise<Artist[]>;
  find: (id: string) => Promise<Artist | null>;
  create: (artist: Artist) => Promise<Artist>;
  delete: (id: string) => Promise<boolean>;
  update: (artist: Artist) => Promise<boolean>;
}
