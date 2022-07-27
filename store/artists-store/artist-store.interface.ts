export interface ArtistsStore {
  findAll: () => Promise<Artist[]>;
  find: (id: string) => Promise<Artist | null>;
  create: (artist: Artist) => Promise<void>;
}
