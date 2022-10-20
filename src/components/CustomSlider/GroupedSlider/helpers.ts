export const groupItems = (items: Array<any>, onScreenLimit: number) => {
  const grouped: Array<typeof items> = [];

  items.forEach((item, index) => {
    const groupIndex = Math.floor(index / onScreenLimit);

    if (!grouped[groupIndex]) {
      grouped[groupIndex] = [item];
    } else {
      grouped[groupIndex].push(item);
    }
  });

  return grouped;
};
