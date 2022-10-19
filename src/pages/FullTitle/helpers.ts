export const formatNumber = (num: number) => {
  return num >= 1000000
    ? `$${Number((num / 1000000).toFixed(1)).toLocaleString('en-US')}m`
    : `$${num.toLocaleString('en-US')}`
};
