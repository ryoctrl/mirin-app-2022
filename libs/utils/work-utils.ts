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
