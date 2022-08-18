export interface FileStore {
  findAll: () => Promise<StoredFile[]>;
  delete: (storedFile: StoredFile) => Promise<boolean>;
}
