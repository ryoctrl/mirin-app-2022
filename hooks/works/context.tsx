import React, { createContext, ReactNode, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { WorksActions, worksReducer } from "./reducer";
import { initialWorksState, WorksState } from "./state";

import { WorksStore } from "store/works-store/works-store.interface";
import { FirestoreWorksStore } from "store/works-store/firestore-works-store";

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

  const listenWorks = async () => {
    worksStore.listen((works) => {
      dispatch({ type: WorksActions.WORKS_UPDATED, payload: { works } });
    });
  };

  // TODO: add support for dispatching reducer methods
  const createWork = async (work: Work, options?: CreateWorkOptions) => {
    await worksStore.create(work);

    toast.success(`作品 ${work.title} を作成しました。`);
    if (options?.path) {
      router.push(options.path);
    }
  };

  const deleteWork = async (work: Work) => {
    if (!work.id) return;
    const result = await worksStore.delete(work.id);
    if (!result) {
      toast.error(`作品 ${work.title}(${work.id}) の削除に失敗しました。`);
      return;
    }
    toast.success(`作品 ${work.title}(${work.id}) を削除しました`);
  };

  const deleteComment = async (workId: string, comment: WorksComment) => {
    await worksStore.deleteComment(workId, comment);

    toast.success(`コメント ID:${comment.id} を削除しました。`);

    const work = worksState.works.find((w) => w.id);
    if (!work) {
      return;
    }

    await worksStore.update(work);
  };

  const updateWork = async (work: Work) => {
    await worksStore.update(work);
  };

  useEffect(() => {
    listenWorks();
  }, []);

  const addComment = async (workId: string, comment: WorksComment) => {
    await worksStore.addComment(workId, comment);
    const work = await worksStore.find(workId);
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
