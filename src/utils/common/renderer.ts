import _ from 'lodash';

export const getCodeIndex = (codes: Record<string, string>, index: number) => {
  const obj = _.reduce(
    codes,
    (prev, code, index) => {
      prev.push({
        code,
        index: Number(index),
      });

      return prev;
    },
    [] as { code: string; index: number }[]
  );

  const idx = Object.values(obj).findIndex(({ index: idx }) => idx === index);

  if (idx === -1) return index;

  return idx + 1;
};
