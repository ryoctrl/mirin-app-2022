import React, { createContext, ReactNode, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { WorksActions, worksReducer } from "./reducer";
import { initialWorksState, WorksState } from "./state";

import { WorksStore } from "store/works-store/works-store.interface";
import { FirestoreWorksStore } from "store/works-store/firestore-works-store";
import { useExhibitions } from "hooks/exhibitions/use-exhibitions";

const worksStore: WorksStore = new FirestoreWorksStore();

type CreateWorkOptions = {
  path?: string;
};

interface WorksContextValue {
  worksState: WorksState;
  createWork: (work: Work, options?: CreateWorkOptions) => void;
  addComment: (workId: string, comment: WorksComment) => void;
  deleteComment: (workId: string, comment: WorksComment) => void;
  deleteWork: (work: Work) => void;
  updateWork: (work: Work) => Promise<void>;
}

export const WorksContext = createContext<WorksContextValue>({
  worksState: initialWorksState,
  createWork: () => {},
  addComment: () => {},
  deleteComment: () => {},
  deleteWork: () => {},
  updateWork: () => Promise.resolve(),
});

export const WorksContextProvider = ({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: WorksState;
}) => {
  const [worksState, dispatch] = useReducer(worksReducer, {
    ...initialWorksState,
    ...initialState,
  });
  const router = useRouter();
  const {
    exhibitionsState: { currentExhibition },
  } = useExhibitions();

  const listenWorks = async () => {
    if (!currentExhibition) return;
    worksStore.listen(currentExhibition, (works) => {
      dispatch({ type: WorksActions.WORKS_UPDATED, payload: { works } });
    });
  };

  // TODO: add support for dispatching reducer methods
  const createWork = async (work: Work, options?: CreateWorkOptions) => {
    if (!currentExhibition) return;
    await worksStore.create(currentExhibition, work);

    toast.success(`作品 ${work.title} を作成しました。`);
    if (options?.path) {
      router.push(options.path);
    }
  };

  const deleteWork = async (work: Work) => {
    if (!currentExhibition) return;
    if (!work.id) return;
    const result = await worksStore.delete(currentExhibition, work.id);
    if (!result) {
      toast.error(`作品 ${work.title}(${work.id}) の削除に失敗しました。`);
      return;
    }
    toast.success(`作品 ${work.title}(${work.id}) を削除しました`);
  };

  const deleteComment = async (workId: string, comment: WorksComment) => {
    if (!currentExhibition) return;
    await worksStore.deleteComment(currentExhibition, workId, comment);

    toast.success(`コメント ID:${comment.id} を削除しました。`);

    const work = worksState.works.find((w) => w.id);
    if (!work) {
      return;
    }

    await worksStore.update(currentExhibition, work);
  };

  const updateWork = async (work: Work) => {
    if (!currentExhibition) return;
    await worksStore.update(currentExhibition, work);
  };

  useEffect(() => {
    listenWorks();
  }, [currentExhibition]);

  const addComment = async (workId: string, comment: WorksComment) => {
    if (!currentExhibition) return;
    await worksStore.addComment(currentExhibition, workId, comment);
    const work = await worksStore.find(currentExhibition, workId);
    if (!work) return;
    dispatch({
      type: WorksActions.WORK_UPDATED,
      payload: { work },
    });
  };

  return (
    <WorksContext.Provider
      value={{
        worksState,
        createWork,
        addComment,
        deleteWork,
        deleteComment,
        updateWork,
      }}
    >
      {children}
    </WorksContext.Provider>
  );
};
