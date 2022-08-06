export interface UsersStore {
  findAll: () => Promise<User[]>;
  find: (id: string) => Promise<User | null>;
  create: (user: User) => Promise<void>;
  delete: (id: string) => Promise<boolean>;
  update: (user: User) => Promise<boolean>;
}
