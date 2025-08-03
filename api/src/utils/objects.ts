export const mergeObjects = (
  target: Record<string, any>,
  source: Record<string, any>,
  fieldsToIgnore?: string[],
) => {
  const partsToPreserve =
    fieldsToIgnore?.reduce(
      (sum, v) => ({
        ...sum,
        [v]: target[v],
      }),
      {},
    ) || {};

  Object.assign(target, source, partsToPreserve);
};

export const bulkMergeObjects = (targets: any, source: Record<string, any>) => {
  if (source) {
    targets.forEach((pe) => {
      mergeObjects(pe, source);
    });
  }

  return targets;
};
