export interface AdminState {
  users: User[];
  isLoading: boolean;
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
  update: {
    users: [],
    isLoading: false,
  },
};
