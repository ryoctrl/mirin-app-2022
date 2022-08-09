export interface AdminState {
  users: User[];
  isLoading: boolean;
  isCreating: boolean;
  message?: string;
  update: {
    users: User[];
    isLoading: boolean;
    message?: string;
  };
}

export const initialAdminState: AdminState = {
  users: [],
  isLoading: false,
  isCreating: false,
  update: {
    users: [],
    isLoading: false,
  },
};
