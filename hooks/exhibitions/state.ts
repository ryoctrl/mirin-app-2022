export interface ExhibitionsState {
  exhibitions: Exhibition[];
  currentExhibition?: Exhibition;
  isCurrentExhibitionLoading: boolean;
  isExhibitionsLoading: boolean;
  error?: string;

  create: {
    exhibition: Partial<Exhibition>;
    isCreating: boolean;
    error?: string;
  };
}

export const initialExhibitionsState: ExhibitionsState = {
  exhibitions: [],
  isCurrentExhibitionLoading: true,
  isExhibitionsLoading: true,
  create: {
    exhibition: {},
    isCreating: false,
  },
};
