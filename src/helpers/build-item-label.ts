export const buildItemLabel = (
  pattern: string,
  title: string,
  index: number,
  count: number
) => {
  return pattern
    .replaceAll('{title}', title)
    .replaceAll('{index}', `${index}`)
    .replaceAll('{count}', `${count}`);
};
