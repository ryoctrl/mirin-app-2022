export const convertWorksToSortableWorks = (works: Work[]): SortableWork[] => {
  const orderedWorks = works.filter(
    (work): work is Work & Required<Pick<Work, "order">> => !!work.order
  );
  const nonOrderedWorks = works.filter((work) => !work.order);

  const newSortableWork = orderedWorks.map<SortableWork>((work) => ({
    id: work.order,
    work,
  }));

  nonOrderedWorks.forEach((work) => {
    newSortableWork.push({
      id: newSortableWork.length + 1,
      work,
    });
  });
  return newSortableWork.sort((a, b) => a.id - b.id);
};

type WorkValidateResult = {
  result: boolean;
  title?: string;
  workedAt?: string;
  artistId?: string;
};

export const validateWork = (
  partialedWork: Partial<Work>
): WorkValidateResult => {
  const result: WorkValidateResult = {
    result: true,
  };
  if (!partialedWork.title) {
    result.title = "タイトルが設定されていません";
    result.result = false;
  }

  const numberedWorkedAt = Number(partialedWork.workedAt);

  if (isNaN(numberedWorkedAt)) {
    result.workedAt = "制作年は数値で入力してください";
    result.result = false;
  } else if (numberedWorkedAt < 2000 || 2030 < numberedWorkedAt) {
    result.workedAt = "制作年は 2000 ~ 2030 までの値で入力してください";
    result.result = false;
  }

  if (!partialedWork.artistId) {
    result.artistId = "アーティスト・作者が設定されていません";
    result.result = false;
  }
  return result;
};
